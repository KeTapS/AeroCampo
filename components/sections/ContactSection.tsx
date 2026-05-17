'use client';

import { ReactNode, useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';

const PHONE        = '+34 600 000 000';
const TEL          = 'tel:+34600000000';
const WA           = 'https://wa.me/34600000000?text=Hola%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20vuestros%20servicios.';
const FORMSPREE_ID = 'TU_FORM_ID_AQUI';

const CONTACTS = [
  { icon: 'phone', label: 'Teléfono', value: PHONE,                href: TEL },
  { icon: 'chat',  label: 'WhatsApp', value: '+34 600 000 000',    href: WA },
  { icon: 'pin',   label: 'Base',     value: 'Segovia · Castilla y León', href: '#cobertura' },
] as const;

const FIELDS = [
  { key: 'nombre',   label: 'Nombre',            type: 'text',  ph: 'Tu nombre',                     autoComplete: 'name'        },
  { key: 'telefono', label: 'Teléfono',          type: 'tel',   ph: '+34 ___',                        autoComplete: 'tel',     inputMode: 'tel'   as const },
  { key: 'email',    label: 'Email',             type: 'email', ph: 'tu@email.com',                  autoComplete: 'email',   inputMode: 'email' as const },
  { key: 'parcela',  label: 'Parcela / Cultivo', type: 'text',  ph: 'Ej: 25 ha de cereal en Cuéllar', autoComplete: 'off'         },
] as const;

const ICON_PATH: Record<string, React.ReactNode> = {
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />,
  chat:  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />,
  pin:   <><path d="M20 10c0 7-8 13-8 13S4 17 4 10a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></>,
  arrow: <path d="M5 12h14M13 5l7 7-7 7" />,
  check: <path d="M20 6L9 17l-5-5" />,
};

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {ICON_PATH[name]}
    </svg>
  );
}

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (FORMSPREE_ID === 'TU_FORM_ID_AQUI') { setSent(true); return; }
    const form = e.currentTarget;
    const data = new FormData(form);
    const res  = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST', body: data, headers: { Accept: 'application/json' },
    });
    if (res.ok) setSent(true);
  }

  return (
    <section
      id="contacto"
      className="section-pad"
      style={{
        background: 'var(--bg-alt)',
        minHeight: 'calc(100svh - 185px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}
    >
      <div className="grid-bg" style={{ opacity: 0.3 }} />
      <div className="wrap" style={{ position: 'relative' }}>
        <div className="con-grid">

          {/* LEFT — pitch + contact channels */}
          <FadeIn>
            <span className="eyebrow"><span className="num">06</span> CONTACTO</span>
            <h2 className="h-section" style={{ marginTop: 18 }}>
              Pide tu<br /><em>presupuesto sin compromiso</em>
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Cuéntanos tu parcela, el tipo de cultivo y el tratamiento que necesitas.
              Respondemos en menos de 24h con un presupuesto cerrado por hectárea.
            </p>

            <div className="con-channels">
              {CONTACTS.map((c) => (
                <a key={c.label} href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="con-channel">
                  <div className="con-channel__icon">
                    <Icon name={c.icon} size={18} />
                  </div>
                  <div>
                    <div className="mono con-channel__label">{c.label.toUpperCase()}</div>
                    <div className="con-channel__value">{c.value}</div>
                  </div>
                  <Icon name="arrow" size={16} />
                </a>
              ))}
            </div>
          </FadeIn>

          {/* RIGHT — form */}
          <FadeIn delay={120}>
            <form onSubmit={handleSubmit} className="con-form">
              {sent ? (
                <div className="con-success">
                  <div className="con-success__icon">
                    <Icon name="check" size={28} />
                  </div>
                  <h3 className="con-success__title">Mensaje enviado</h3>
                  <p className="con-success__sub">
                    Te responderemos en menos de 24h con tu presupuesto.
                  </p>
                </div>
              ) : (
                <>
                  <div className="con-form__body">
                    {FIELDS.map((f) => (
                      <Field
                        key={f.key}
                        label={f.label}
                        name={f.key}
                        type={f.type}
                        placeholder={f.ph}
                        autoComplete={f.autoComplete}
                        inputMode={'inputMode' in f ? f.inputMode : undefined}
                      />
                    ))}
                    <FieldGroup label="Mensaje">
                      <textarea
                        required
                        name="mensaje"
                        rows={3}
                        placeholder="¿Qué servicio necesitas y cuándo?"
                        className="con-field con-field--area"
                        autoComplete="off"
                      />
                    </FieldGroup>
                  </div>

                  <div className="con-form__foot">
                    <button type="submit" className="btn btn-primary con-submit">
                      Enviar solicitud <Icon name="arrow" size={14} />
                    </button>
                  </div>
                </>
              )}
            </form>
          </FadeIn>
        </div>
      </div>

      <style>{`
        .con-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.1fr;
          gap: 64px;
          align-items: start;
        }
        @media (max-width: 980px) {
          .con-grid { grid-template-columns: 1fr; gap: 40px; }
        }

        /* ─── Contact channels ───────────────────────────── */
        .con-channels {
          margin-top: 28px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .con-channel {
          display: grid; grid-template-columns: 44px 1fr auto;
          gap: 14px; align-items: center;
          padding: 14px 16px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--bg-card);
          color: var(--text-mut);
          transition: border-color 0.25s, color 0.25s, background 0.25s;
          min-height: 56px;
          touch-action: manipulation;
        }
        @media (hover: hover) and (pointer: fine) {
          .con-channel:hover {
            border-color: color-mix(in oklch, var(--accent) 40%, transparent);
            background: var(--bg-card-2);
            color: var(--text);
          }
        }
        .con-channel__icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: color-mix(in oklch, var(--accent) 14%, transparent);
          color: var(--accent);
          display: flex; align-items: center; justify-content: center;
        }
        .con-channel__label {
          font-size: 10.5px; color: var(--text-mut);
          letter-spacing: 0.14em;
        }
        .con-channel__value {
          font-family: var(--font-display);
          font-weight: 600; font-size: 15px;
          color: var(--text); margin-top: 3px;
        }

        /* ─── Form chrome ─────────────────────────────────── */
        .con-form {
          border-radius: 16px;
          border: 1px solid var(--border-2);
          background:
            radial-gradient(120% 80% at 100% 0%, color-mix(in oklch, var(--accent) 5%, transparent) 0%, transparent 60%),
            var(--bg-card);
          backdrop-filter: blur(14px) saturate(120%);
          -webkit-backdrop-filter: blur(14px) saturate(120%);
          overflow: hidden;
        }
        .con-form__body {
          padding: 22px;
          display: flex; flex-direction: column; gap: 14px;
        }

        /* ─── Field ───────────────────────────────────────── */
        .con-fieldgroup {
          display: flex; flex-direction: column; gap: 7px;
        }
        .con-field-label {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: var(--text-mut);
          letter-spacing: 0.10em;
          text-transform: uppercase;
        }
        .con-field {
          width: 100%;
          background: var(--bg);
          color: var(--text);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 13px 14px;
          font-size: 16px;            /* prevents iOS focus-zoom */
          font-family: var(--font-display);
          letter-spacing: -0.005em;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          min-height: 48px;           /* tap target */
        }
        .con-field::placeholder { color: var(--text-dim); }
        @media (hover: hover) and (pointer: fine) {
          .con-field:hover { border-color: var(--border-2); }
        }
        .con-field:focus,
        .con-field:focus-visible {
          border-color: var(--accent);
          background: color-mix(in oklch, var(--accent) 3%, var(--bg));
          box-shadow: 0 0 0 3px color-mix(in oklch, var(--accent) 14%, transparent);
          outline: none;
        }
        .con-field--area {
          resize: vertical;
          min-height: 90px;
        }

        /* ─── Submit ──────────────────────────────────────── */
        .con-form__foot {
          padding: 18px 22px 22px;
          background: color-mix(in oklch, var(--bg) 35%, transparent);
          border-top: 1px solid var(--border);
        }
        .con-submit {
          width: 100%;
          justify-content: center;
          padding-top: 14px; padding-bottom: 14px;
        }

        /* ─── Success state ───────────────────────────────── */
        .con-success {
          padding: 56px 26px;
          text-align: center;
        }
        .con-success__icon {
          width: 64px; height: 64px;
          margin: 0 auto 20px;
          border-radius: 50%;
          background: color-mix(in oklch, var(--accent) 16%, transparent);
          border: 1px solid var(--accent);
          display: flex; align-items: center; justify-content: center;
          color: var(--accent);
        }
        .con-success__title {
          font-size: 22px; font-weight: 700;
          color: var(--text);
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }
        .con-success__sub { color: var(--text-mut); }

        /* ── Phone (≤ 640px) — tighter, larger tap, no big blur ── */
        @media (max-width: 640px) {
          .con-form__body { padding: 18px; gap: 12px; }
          .con-form__foot { padding: 14px 18px 18px; }
          .con-channel { padding: 12px 14px; gap: 10px; }
          .con-channel__value { font-size: 14.5px; }
          .con-success { padding: 40px 20px; }
          .con-success__icon { width: 56px; height: 56px; }
          .con-success__title { font-size: 20px; }
        }

        /* Reduce backdrop-filter on small screens — perf on mid-range Android */
        @media (max-width: 480px) {
          .con-form { backdrop-filter: none; -webkit-backdrop-filter: none; }
        }
      `}</style>
    </section>
  );
}

/* ── Field helpers ───────────────────────────────────────────── */
function Field({ label, name, type, placeholder, autoComplete, inputMode, required = true }: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
  inputMode?: 'text' | 'tel' | 'email' | 'numeric' | 'decimal' | 'search' | 'url' | 'none';
  required?: boolean;
}) {
  return (
    <FieldGroup label={label}>
      <input
        className="con-field"
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
      />
    </FieldGroup>
  );
}

function FieldGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="con-fieldgroup">
      <span className="con-field-label">{label}</span>
      {children}
    </div>
  );
}
