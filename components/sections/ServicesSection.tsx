'use client';

import { useEffect, useRef, useState } from 'react';

const SERVICES = [
  {
    num: '01',
    /* Dron multirrotor (top-down) con haces de pulverización */
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5.5" cy="5.5" r="2.2" />
        <circle cx="18.5" cy="5.5" r="2.2" />
        <circle cx="5.5" cy="18.5" r="2.2" />
        <circle cx="18.5" cy="18.5" r="2.2" />
        <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
        <path d="M7 7l2 2" />
        <path d="M17 7l-2 2" />
        <path d="M7 17l2-2" />
        <path d="M17 17l-2-2" />
        <path d="M10.5 16v2" opacity="0.55" />
        <path d="M12 16.5v2.5" opacity="0.55" />
        <path d="M13.5 16v2" opacity="0.55" />
      </svg>
    ),
    title: 'Tratamientos fitosanitarios',
    desc:  'Aplicación precisa de pesticidas, herbicidas y fungicidas con drones multirrotor. Cobertura homogénea, sin manchas y con mínima deriva.',
    tags:  ['Pulverización electrostática', 'Dosis variable'],
  },
  {
    num: '02',
    /* Brote con dos hojas (Lucide-style "sprout") */
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20h10" />
        <path d="M10 20c5.5-2.5.8-6.4 3-10" />
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
        <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
      </svg>
    ),
    title: 'Fertilización de precisión',
    desc:  'Distribución de fertilizantes líquidos y granulares adaptada a cada zona mediante mapas de prescripción.',
    tags:  ['Líquido + sólido', 'Mapa NDVI'],
  },
  {
    num: '03',
    /* Mira de escaneo / radar multiespectral */
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 8.5V7.5" />
        <path d="M12 16.5v-1" />
        <path d="M8.5 12h-1" />
        <path d="M16.5 12h-1" />
        <circle cx="12" cy="12" r="0.6" fill="currentColor" />
      </svg>
    ),
    title: 'Monitorización de cultivos',
    desc:  'Imágenes multiespectrales para detectar estrés hídrico, plagas y enfermedades antes de que sean visibles.',
    tags:  ['NDVI · NDRE', 'Diagnóstico zonal'],
  },
  {
    num: '04',
    /* Cámara con lente detallada + indicador LED */
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="4" />
        <circle cx="12" cy="13" r="1.6" />
        <circle cx="18.2" cy="9.8" r="0.45" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: 'Fotografía y vídeo aéreo',
    desc:  'Documentación profesional: ortofotomapas, seguimiento de campaña, reportajes agrícolas en 4K.',
    tags:  ['4K · 6K', 'Mapas ortofoto'],
  },
];

/* Ventana de aparición de cada card sobre el progreso 0..1 */
const STEP_START = 0.10;   // empieza a revelar la primera card a 10 % de progreso
const STEP_LEN   = 0.16;   // cada card tarda 16 % en aparecer
const STEP_GAP   = 0.18;   // separación entre cards

function cardOpacity(progress: number, i: number) {
  const start = STEP_START + i * STEP_GAP;
  const end   = start + STEP_LEN;
  return Math.max(0, Math.min(1, (progress - start) / (end - start)));
}

export default function ServicesSection() {
  const wrapRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = document.getElementById('scroll-root');
    const wrap = wrapRef.current;
    if (!root || !wrap) return;

    let raf = 0;
    function update() {
      const rect = wrap!.getBoundingClientRect();
      const vh   = window.innerHeight;
      const total = rect.height - vh;
      const p = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;
      setProgress(p);
    }
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }
    update();
    root.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      root.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Progreso del header (eyebrow + h2): 0 → 0.08 */
  const headProgress = Math.max(0, Math.min(1, progress / 0.08));

  return (
    <section
      ref={wrapRef as any}
      id="servicios"
      data-drone-target="services"
      style={{
        position: 'relative',
        height: '320svh',           // 3.2× viewport → 4 reveals + margen
        background: 'var(--bg-alt)',
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100svh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <div className="grid-bg" style={{ opacity: 0.35 }} />

        <div className="wrap" style={{ position: 'relative' }}>

          {/* Cabecera */}
          <div className="section-head" style={{
            opacity: headProgress,
            transform: `translateY(${(1 - headProgress) * 24}px)`,
            transition: 'opacity 0.2s linear, transform 0.2s linear',
          }}>
            <div>
              <span className="eyebrow"><span className="num">02</span> SERVICIOS</span>
              <h2 className="h-section" style={{ marginTop: 16 }}>
                Soluciones completas <em>para tu explotación</em>
              </h2>
            </div>
            <p className="lede">
              Cuatro líneas de operación que cubren la campaña entera — desde el primer diagnóstico
              multiespectral hasta el último tratamiento de cierre. Sin pisar el cultivo, sin compactar el suelo.
            </p>
          </div>

          {/* Grid de cards con reveal progresivo */}
          <div className="svc-grid" style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {SERVICES.map((s, i) => {
              const op = cardOpacity(progress, i);
              return (
                <article
                  key={s.num}
                  className="svc-card"
                  style={{
                    opacity: op,
                    transform: `translateY(${(1 - op) * 60}px) scale(${0.94 + op * 0.06})`,
                    transition: 'opacity 0.05s linear, transform 0.05s linear, border-color 0.35s, box-shadow 0.35s',
                  }}
                >
                  {/* Línea de acento superior */}
                  <span className="svc-accent" />

                  {/* Número ghost gigante de fondo */}
                  <span className="svc-ghost">{s.num}</span>

                  {/* Icono */}
                  <div className="svc-icon">{s.icon}</div>

                  {/* Título y descripción */}
                  <h3 className="svc-title">{s.title}</h3>
                  <p className="svc-desc">{s.desc}</p>

                  {/* Divisor */}
                  <div className="svc-divider" />

                  {/* Specs */}
                  <ul className="svc-specs">
                    {s.tags.map((t) => (
                      <li key={t}>
                        <span className="svc-bullet" />
                        {t}
                      </li>
                    ))}
                  </ul>

                  {/* Flecha esquina */}
                  <span className="svc-arrow" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  </span>
                </article>
              );
            })}
          </div>

          {/* Indicador de progreso */}
          <div style={{
            position: 'absolute',
            left: 28, bottom: -44,
            display: 'flex', gap: 8, alignItems: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: 'var(--text-dim)', letterSpacing: '0.08em',
          }}>
            <span>{String(Math.min(4, Math.floor(progress / 0.22) + 1)).padStart(2, '0')} / 04</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {SERVICES.map((_, i) => (
                <span key={i} style={{
                  width: 24, height: 2,
                  background: cardOpacity(progress, i) > 0.5 ? 'var(--accent)' : 'var(--border-2)',
                  transition: 'background 0.3s',
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ───── Service card ───── */
        .svc-card {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 22px 22px 26px;
          border-radius: 16px;
          background:
            radial-gradient(120% 80% at 100% 0%, color-mix(in oklch, var(--accent) 6%, transparent) 0%, transparent 55%),
            linear-gradient(180deg, color-mix(in oklch, var(--accent) 2%, var(--bg-card)) 0%, var(--bg-card) 100%);
          border: 1px solid var(--border);
          overflow: hidden;
          backdrop-filter: blur(14px) saturate(120%);
          -webkit-backdrop-filter: blur(14px) saturate(120%);
        }
        .svc-card:hover {
          border-color: color-mix(in oklch, var(--accent) 42%, transparent);
          box-shadow:
            0 22px 60px -28px color-mix(in oklch, var(--accent) 50%, transparent),
            inset 0 1px 0 color-mix(in oklch, var(--accent) 14%, transparent);
        }
        .svc-card:hover .svc-arrow {
          opacity: 1;
          transform: translate(0, 0);
          color: var(--accent);
        }
        .svc-card:hover .svc-accent {
          opacity: 0.9;
          background: linear-gradient(90deg, transparent 0%, var(--accent) 35%, var(--accent-2) 65%, transparent 100%);
        }
        .svc-card:hover .svc-ghost { color: color-mix(in oklch, var(--accent) 9%, transparent); }

        /* Línea de acento superior */
        .svc-accent {
          position: absolute; top: 0; left: 14px; right: 14px; height: 1px;
          background: linear-gradient(90deg, transparent, color-mix(in oklch, var(--accent) 55%, transparent) 50%, transparent);
          opacity: 0.55;
          transition: opacity 0.4s, background 0.4s;
        }

        /* Número ghost gigante */
        .svc-ghost {
          position: absolute;
          top: -14px; right: 14px;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 110px;
          line-height: 1;
          letter-spacing: -0.05em;
          color: color-mix(in oklch, var(--accent) 5%, transparent);
          pointer-events: none;
          user-select: none;
          transition: color 0.4s;
        }

        /* Icono */
        .svc-icon {
          width: 56px; height: 56px;
          border-radius: 14px;
          background: linear-gradient(135deg, color-mix(in oklch, var(--accent) 18%, transparent), color-mix(in oklch, var(--accent) 3%, transparent));
          color: var(--accent);
          display: flex; align-items: center; justify-content: center;
          border: 1px solid color-mix(in oklch, var(--accent) 28%, transparent);
          box-shadow:
            inset 0 1px 0 color-mix(in oklch, var(--accent) 26%, transparent),
            0 8px 22px -12px color-mix(in oklch, var(--accent) 55%, transparent);
          margin-top: 6px;
          margin-bottom: 22px;
          position: relative;
        }

        /* Título y descripción */
        .svc-title {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.018em;
          line-height: 1.2;
          color: var(--text);
          margin-bottom: 10px;
          position: relative;
        }
        .svc-desc {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--text-mut);
          flex: 1;
          margin-bottom: 18px;
          position: relative;
        }

        /* Divisor */
        .svc-divider {
          height: 1px;
          background: linear-gradient(90deg, color-mix(in oklch, var(--accent) 30%, transparent), transparent 80%);
          margin-bottom: 14px;
          position: relative;
        }

        /* Specs */
        .svc-specs {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: relative;
        }
        .svc-specs li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          letter-spacing: 0.02em;
          color: var(--text-mut);
        }
        .svc-bullet {
          width: 5px; height: 5px;
          background: var(--accent);
          box-shadow: 0 0 0 3px color-mix(in oklch, var(--accent) 14%, transparent);
          flex-shrink: 0;
        }

        /* Flecha esquina */
        .svc-arrow {
          position: absolute;
          top: 20px; right: 20px;
          width: 30px; height: 30px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--text-dim);
          background: color-mix(in oklch, var(--bg) 50%, transparent);
          border: 1px solid var(--border);
          opacity: 0;
          transform: translate(-4px, 4px);
          transition: opacity 0.3s, transform 0.3s, color 0.3s;
        }

        /* ───── Responsive ───── */
        @media (max-width: 900px) {
          #servicios .svc-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          #servicios .svc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
