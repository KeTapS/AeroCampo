'use client';

import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';

const PHONE   = '+34 600 000 000';
const TEL     = 'tel:+34600000000';
const WA      = 'https://wa.me/34600000000?text=Hola%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20vuestros%20servicios.';
const FORMSPREE_ID = 'TU_FORM_ID_AQUI';

const CONTACTS = [
  { icon: 'phone', label: 'Teléfono', value: PHONE,                href: TEL },
  { icon: 'chat',  label: 'WhatsApp', value: '+34 600 000 000',    href: WA },
  { icon: 'pin',   label: 'Base',     value: 'Segovia · Castilla y León', href: '#cobertura' },
] as const;

const FIELDS = [
  { key: 'nombre',   label: 'Nombre',          type: 'text',  ph: 'Tu nombre' },
  { key: 'telefono', label: 'Teléfono',         type: 'tel',   ph: '+34 ___' },
  { key: 'email',    label: 'Email',            type: 'email', ph: 'tu@email.com' },
  { key: 'parcela',  label: 'Parcela / Cultivo', type: 'text',  ph: 'Ej: 25 ha de cereal en Cuéllar' },
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
      data-drone-target="contact"
      className="section-pad"
      style={{ background: 'var(--bg-alt)', minHeight: 'calc(100svh - 185px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <div className="grid-bg" style={{ opacity: 0.3 }} />
      <div className="wrap" style={{ position: 'relative' }}>

        <div className="con-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>

          {/* Left: pitch + contact links */}
          <FadeIn>
            <span className="eyebrow"><span className="num">07</span> CONTACTO</span>
            <h2 className="h-section" style={{ marginTop: 18 }}>
              Pide tu<br /><em>presupuesto sin compromiso</em>
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Cuéntanos tu parcela, el tipo de cultivo y el tratamiento que necesitas.
              Respondemos en menos de 24h con un presupuesto cerrado por hectárea.
            </p>

            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {CONTACTS.map((c) => (
                <a key={c.label} href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display: 'grid', gridTemplateColumns: '44px 1fr auto',
                    gap: 14, alignItems: 'center', padding: 16,
                    border: '1px solid var(--border)', borderRadius: 10,
                    background: 'var(--bg-card)', transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: 'color-mix(in oklch, var(--accent) 14%, transparent)',
                    color: 'var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon name={c.icon} size={18} />
                  </div>
                  <div>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--text-mut)', letterSpacing: '0.12em' }}>
                      {c.label.toUpperCase()}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, marginTop: 3, color: 'var(--text)' }}>
                      {c.value}
                    </div>
                  </div>
                  <Icon name="arrow" size={16} />
                </a>
              ))}
            </div>
          </FadeIn>

          {/* Right: form */}
          <FadeIn delay={120}>
            <form onSubmit={handleSubmit} style={{
              padding: 28, borderRadius: 16,
              border: '1px solid var(--border-2)',
              background: 'var(--bg-card)',
              backdropFilter: 'blur(14px)',
            }}>
              {sent ? (
                <div style={{ padding: '40px 8px', textAlign: 'center' }}>
                  <div style={{
                    width: 64, height: 64, margin: '0 auto 20px',
                    borderRadius: '50%',
                    background: 'color-mix(in oklch, var(--accent) 16%, transparent)',
                    border: '1px solid var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)',
                  }}>
                    <Icon name="check" size={28} />
                  </div>
                  <h3 style={{ fontSize: 22, marginBottom: 8, color: 'var(--text)' }}>Mensaje enviado</h3>
                  <p style={{ color: 'var(--text-mut)' }}>Te responderemos en menos de 24h con tu presupuesto.</p>
                </div>
              ) : (
                <>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--text-mut)', letterSpacing: '0.14em', marginBottom: 16 }}>
                    FORM · PRESUPUESTO
                  </div>
                  <div style={{ display: 'grid', gap: 14 }}>
                    {FIELDS.map((f) => (
                      <label key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <span className="mono" style={{ fontSize: 10.5, color: 'var(--text-mut)', letterSpacing: '0.1em' }}>
                          {f.label.toUpperCase()}
                        </span>
                        <input
                          required
                          type={f.type}
                          name={f.key}
                          placeholder={f.ph}
                          style={{
                            background: 'var(--bg)', color: 'var(--text)',
                            border: '1px solid var(--border)', borderRadius: 8,
                            padding: '12px 14px', fontSize: 14,
                            fontFamily: 'var(--font-display)',
                            outline: 'none', transition: 'border-color 0.2s',
                          }}
                          onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                          onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                        />
                      </label>
                    ))}
                    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span className="mono" style={{ fontSize: 10.5, color: 'var(--text-mut)', letterSpacing: '0.1em' }}>MENSAJE</span>
                      <textarea
                        required
                        name="mensaje"
                        rows={4}
                        placeholder="¿Qué servicio necesitas y cuándo?"
                        style={{
                          background: 'var(--bg)', color: 'var(--text)',
                          border: '1px solid var(--border)', borderRadius: 8,
                          padding: '12px 14px', fontSize: 14,
                          fontFamily: 'var(--font-display)', resize: 'vertical',
                          outline: 'none',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                        onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                      />
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ marginTop: 18, width: '100%', justifyContent: 'center' }}>
                    Enviar solicitud <Icon name="arrow" size={14} />
                  </button>
                  <p className="mono" style={{ fontSize: 10.5, color: 'var(--text-dim)', marginTop: 8, textAlign: 'center', letterSpacing: '0.08em' }}>
                    RESPUESTA · &lt; 24H · TODOS LOS DÍAS LABORABLES
                  </p>
                </>
              )}
            </form>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .con-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </section>
  );
}
