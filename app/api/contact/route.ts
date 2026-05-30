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

const FROM = 'contacto@aerocampo.es';         // verified custom address on the zone
const TO   = 'aerocampoiberia@gmail.com';     // matches destination_address in wrangler

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

    // `cloudflare:email` is a workerd runtime built-in. Bundlers (Turbopack
    // and OpenNext's esbuild) must NOT try to resolve it at build time, or
    // the Cloudflare build fails with "Could not resolve cloudflare:email".
    // Decoding the specifier with atob() at runtime defeats their static
    // analysis (a plain join()/array is constant-folded back to a literal),
    // so it stays a dynamic import that workerd resolves natively.
    const emailModule = atob('Y2xvdWRmbGFyZTplbWFpbA=='); // -> "cloudflare:email"
    const { EmailMessage } = (await import(
      /* webpackIgnore: true */ /* turbopackIgnore: true */ emailModule
    )) as typeof import('cloudflare:email');

    const env = getCloudflareContext().env as unknown as { CONTACT_EMAIL: SendEmailBinding };

    const message = new EmailMessage(FROM, TO, msg.asRaw());
    await env.CONTACT_EMAIL.send(message);

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[/api/contact] send failed:', err);
    // TEMP debug: surface the real error to the client so we can diagnose
    // without the Cloudflare log UI. Remove once email is confirmed working.
    return Response.json(
      { ok: false, error: 'No se pudo enviar.', detail: err instanceof Error ? `${err.name}: ${err.message}` : String(err) },
      { status: 500 },
    );
  }
}
