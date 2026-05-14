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
      style={{ background: 'var(--bg-alt)', minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
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
            <p className="lede" style={{ marginTop: 20 }}>
              AeroCampo Iberia nace en Castilla y León con una misión sencilla: aplicar tecnología seria al cultivo de
              cereal, viña y oleaginosas. Equipo joven, pilotos AESA, ingenieros agrónomos. Trabajamos con grandes y
              pequeñas explotaciones — al mismo precio por hectárea.
            </p>

            <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {CERTS.map(([k, v]) => (
                <div key={k} style={{
                  padding: 18, borderRadius: 10,
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

          {/* Right: video */}
          <FadeIn delay={120}>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative', borderRadius: 16, overflow: 'hidden',
                border: '1px solid var(--border-2)',
                boxShadow: '0 24px 60px -20px color-mix(in oklch, var(--accent) 40%, transparent)',
                backgroundColor: '#000',
              }}>
                {/* Video element */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    backgroundColor: '#000',
                  }}
                >
                  <source src="/videos/dron.mp4" type="video/mp4" />
                  Tu navegador no soporta video HTML5
                </video>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        #nosotros video {
          transition: filter 0.4s ease;
        }
        #nosotros [style*='position: relative'][style*='borderRadius'] {
          cursor: pointer;
          transition: box-shadow 0.35s;
        }
        #nosotros [style*='position: relative'][style*='borderRadius']:hover {
          box-shadow: 0 28px 70px -18px color-mix(in oklch, var(--accent) 55%, transparent) !important;
        }
        #nosotros [style*='position: relative'][style*='borderRadius']:hover video {
          filter: brightness(1.08);
        }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
