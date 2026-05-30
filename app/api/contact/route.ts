import { getCloudflareContext } from '@opennextjs/cloudflare';
import { createMimeMessage } from 'mimetext';

/**
 * Contact form endpoint.
 * Receives the form data and sends it to the company inbox using
 * Cloudflare's native email sending (the `CONTACT_EMAIL` send_email
 * binding declared in wrangler.jsonc). No third-party form service.
 *
 * Requirements on the Cloudflare side (done once in the dashboard):
 *  - Email Routing enabled on the aerocampo.es zone
 *  - The destination (aerocampoiberia@gmail.com) verified as a
 *    destination address
 */

const FROM = 'formulario@aerocampo.es';      // any address @ your verified zone
const TO   = 'aerocampoiberia@gmail.com';    // matches destination_address in wrangler

interface SendEmailBinding {
  send(message: unknown): Promise<void>;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const form = await req.formData();

    // Honeypot: bots fill hidden fields. Pretend success, send nothing.
    if (String(form.get('_gotcha') ?? '').length > 0) {
      return Response.json({ ok: true });
    }

    const nombre   = String(form.get('nombre')   ?? '').trim();
    const telefono = String(form.get('telefono') ?? '').trim();
    const email    = String(form.get('email')    ?? '').trim();
    const parcela  = String(form.get('parcela')  ?? '').trim();
    const mensaje  = String(form.get('mensaje')  ?? '').trim();

    if (!nombre || !email || !mensaje || !email.includes('@')) {
      return Response.json(
        { ok: false, error: 'Campos obligatorios incompletos.' },
        { status: 400 },
      );
    }

    // Build the email body
    const msg = createMimeMessage();
    msg.setSender({ name: 'Web AeroCampo', addr: FROM });
    msg.setRecipient(TO);
    msg.setHeader('Reply-To', email);   // reply goes straight to the lead
    msg.setSubject('Nueva solicitud de presupuesto · AeroCampo Iberia');
    msg.addMessage({
      contentType: 'text/plain',
      data: [
        'Nueva solicitud desde la web:',
        '',
        `Nombre:   ${nombre}`,
        `Teléfono: ${telefono || '—'}`,
        `Email:    ${email}`,
        `Parcela:  ${parcela || '—'}`,
        '',
        'Mensaje:',
        mensaje,
      ].join('\n'),
    });

    // Cloudflare email runtime module — dynamic import so `next build`
    // doesn't try to resolve it in Node during the build step.
    const { EmailMessage } = await import('cloudflare:email');
    const env = getCloudflareContext().env as unknown as { CONTACT_EMAIL: SendEmailBinding };

    const message = new EmailMessage(FROM, TO, msg.asRaw());
    await env.CONTACT_EMAIL.send(message);

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[/api/contact] send failed:', err);
    return Response.json({ ok: false, error: 'No se pudo enviar.' }, { status: 500 });
  }
}
