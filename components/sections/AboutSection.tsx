'use client';

import FadeIn from '@/components/ui/FadeIn';

const CERTS = [
  ['AESA',  'Operadora STS-ES'],
  ['ITRAD', 'Centro autorizado'],
  ['DJI',   'Partner agroprofesional'],
  ['UE-12', 'Seguro RC 1M€'],
] as const;

export default function AboutSection() {
  return (
    <section
      id="nosotros"
      data-drone-target="about"
      className="section-pad"
      style={{ background: 'var(--bg-alt)' }}
    >
      <div className="grid-bg" style={{ opacity: 0.3 }} />
      <div className="wrap" style={{ position: 'relative' }}>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>

          {/* Left: copy + certs */}
          <FadeIn>
            <span className="eyebrow"><span className="num">06</span> NOSOTROS</span>
            <h2 className="h-section" style={{ marginTop: 18 }}>
              Ingeniería <em>al servicio</em><br />del campo
            </h2>
            <p className="lede" style={{ marginTop: 22 }}>
              AeroCampo Iberia nace en Castilla y León con una misión sencilla: aplicar tecnología seria al cultivo de
              cereal, viña y oleaginosas. Equipo joven, pilotos AESA, ingenieros agrónomos. Trabajamos con grandes y
              pequeñas explotaciones — al mismo precio por hectárea.
            </p>

            <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {CERTS.map(([k, v]) => (
                <div key={k} style={{
                  padding: 16, borderRadius: 10,
                  border: '1px solid var(--border)', background: 'var(--bg-card)',
                }}>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.14em' }}>{k}</div>
                  <div style={{ marginTop: 6, fontSize: 13.5, color: 'var(--text)' }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <a href="#contacto" className="btn btn-primary">
                Hablar con el equipo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#" className="btn btn-ghost">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v12" /><path d="M7 10l5 5 5-5" /><path d="M5 21h14" />
                </svg>
                Dossier (PDF)
              </a>
            </div>
          </FadeIn>

          {/* Right: photo */}
          <FadeIn delay={120}>
            <div style={{ position: 'relative' }}>
              <div style={{
                aspectRatio: '3 / 4', borderRadius: 16, overflow: 'hidden',
                border: '1px solid var(--border-2)',
                backgroundImage: 'url(/images/Fitosanitarios.jpg)',
                backgroundSize: 'cover', backgroundPosition: 'center',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, color-mix(in oklch, var(--bg) 80%, transparent) 100%)',
                }} />
                <div className="readout" style={{
                  position: 'absolute', top: 14, left: 14,
                  background: 'color-mix(in oklch, var(--bg) 70%, transparent)',
                  padding: '6px 10px', borderRadius: 4,
                }}>
                  <b>● OPERACIÓN</b> · pulverización en campo
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
