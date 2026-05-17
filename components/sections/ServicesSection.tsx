'use client';

import { useRef } from 'react';
import { useScrollProgress } from '@/components/ui/useScrollProgress';

const SERVICES = [
  {
    num: '01',
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
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20h10" />
        <path d="M10 20c5.5-2.5.8-6.4 3-10" />
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
        <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
      </svg>
    ),
    title: 'Fertilización de precisión',
    desc:  'Distribución de fertilizantes líquidos y granulares adaptada a cada zona del cultivo.',
    tags:  ['Líquido + sólido', 'Dosis variable'],
  },
  {
    num: '03',
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

/* Stagger windows over the 0..1 progress range */
const STEP_START = 0.10;
const STEP_LEN   = 0.16;
const STEP_GAP   = 0.18;

function cardOpacity(progress: number, i: number) {
  const start = STEP_START + i * STEP_GAP;
  const end   = start + STEP_LEN;
  return Math.max(0, Math.min(1, (progress - start) / (end - start)));
}

export default function ServicesSection() {
  const wrapRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(wrapRef);

  /* Header reveal: 0 → 0.08 */
  const headProgress = Math.max(0, Math.min(1, progress / 0.08));

  return (
    <section
      ref={wrapRef as React.RefObject<HTMLElement>}
      id="servicios"
      className="services-section"
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

          {/* Header */}
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
              Tres líneas de operación que cubren la campaña entera — desde la fertilización inicial
              hasta el último tratamiento de cierre. Sin pisar el cultivo, sin compactar el suelo.
            </p>
          </div>

          {/* Cards */}
          <div className="svc-grid" style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(3, 1fr)' }}>
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
                  <span className="svc-accent" />
                  <span className="svc-ghost">{s.num}</span>
                  <div className="svc-icon">{s.icon}</div>
                  <h3 className="svc-title">{s.title}</h3>
                  <p className="svc-desc">{s.desc}</p>
                  <div className="svc-divider" />
                  <ul className="svc-specs">
                    {s.tags.map((t) => (
                      <li key={t}>
                        <span className="svc-bullet" />
                        {t}
                      </li>
                    ))}
                  </ul>
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

        </div>
      </div>

      <style>{`
        .services-section {
          position: relative;
          height: 320svh;
          background: var(--bg-alt);
        }
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
        @media (hover: hover) and (pointer: fine) {
          .svc-card:hover {
            border-color: color-mix(in oklch, var(--accent) 42%, transparent);
            box-shadow:
              0 22px 60px -28px color-mix(in oklch, var(--accent) 50%, transparent),
              inset 0 1px 0 color-mix(in oklch, var(--accent) 14%, transparent);
          }
          .svc-card:hover .svc-arrow { opacity: 1; transform: translate(0, 0); color: var(--accent); }
          .svc-card:hover .svc-accent {
            opacity: 0.9;
            background: linear-gradient(90deg, transparent 0%, var(--accent) 35%, var(--accent-2) 65%, transparent 100%);
          }
          .svc-card:hover .svc-ghost { color: color-mix(in oklch, var(--accent) 9%, transparent); }
        }

        .svc-accent {
          position: absolute; top: 0; left: 14px; right: 14px; height: 1px;
          background: linear-gradient(90deg, transparent, color-mix(in oklch, var(--accent) 55%, transparent) 50%, transparent);
          opacity: 0.55;
          transition: opacity 0.4s, background 0.4s;
        }
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
        .svc-divider {
          height: 1px;
          background: linear-gradient(90deg, color-mix(in oklch, var(--accent) 30%, transparent), transparent 80%);
          margin-bottom: 14px;
          position: relative;
        }
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

        /* ── Tablet (≤ 1024px) — 2 columns ─────────────────────── */
        @media (max-width: 1024px) {
          .services-section { height: 280svh; }
          #servicios .svc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        /* ── Phone (≤ 760px) — 1 column ────────────────────────── */
        @media (max-width: 760px) {
          .services-section { height: 240svh; }
          #servicios .svc-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          .svc-ghost { font-size: 80px !important; top: -8px !important; }
          .svc-card  { padding: 18px 18px 22px !important; }
          /* On touch, always show the arrow at low opacity so cards feel tappable */
          .svc-arrow { opacity: 0.6 !important; transform: translate(0,0) !important; }
        }

        /* ── Tiny phones ───────────────────────────────────────── */
        @media (max-width: 380px) {
          .svc-title { font-size: 18px; }
          .svc-desc  { font-size: 13px; }
        }
      `}</style>
    </section>
  );
}
