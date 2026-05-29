'use client';

import { useRef } from 'react';
import { useSmoothScrollProgress, phase, easeOut } from '@/components/ui/useScrollProgress';

const ADV = [
  { icon: 'target', title: 'Aplicación dirigida',        desc: 'El dron trabaja cerca del cultivo y aplica el tratamiento de forma más localizada, reduciendo pérdidas de caldo y producto.' },
  { icon: 'rain',   title: 'Efecto de las hélices',      desc: 'El flujo de aire generado por las hélices ayuda a empujar las gotas hacia la planta, favoreciendo una mejor deposición sobre la hoja.' },
  { icon: 'drop',   title: 'Menos volumen de agua',      desc: 'La pulverización con dron permite trabajar con menor cantidad de caldo por hectárea, optimizando cada aplicación.' },
  { icon: 'bolt',   title: 'Rutas GPS controladas',      desc: 'La planificación de vuelo permite mantener pasadas ordenadas y evitar solapes innecesarios en la parcela.' },
  { icon: 'foot',   title: 'Acceso en momentos críticos', desc: 'Puede trabajar en cultivos altos, zonas complicadas o terrenos húmedos donde la maquinaria pesada no puede entrar.' },
  { icon: 'earth',  title: 'Sin contacto con el cultivo', desc: 'El dron no pisa la parcela, evitando daños mecánicos sobre la planta y compactación del suelo.' },
];

const ICONS: Record<string, React.ReactNode> = {
  foot: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 21V11a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v10M5 21l-2 0M19 21l2 0" />
    </svg>
  ),
  rain: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 13v6M8 13v6M12 15v6M20 9a4 4 0 0 0-3-7 6 6 0 0 0-11.7 1A5 5 0 0 0 5 13" />
    </svg>
  ),
  target: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" />
    </svg>
  ),
  drop: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.5s7 8 7 12.5a7 7 0 1 1-14 0c0-4.5 7-12.5 7-12.5z" />
    </svg>
  ),
  bolt: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  ),
  earth: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
};

const KPIS = [
  { value: 'Hasta 41%',    label: 'menos pesticida*' },
  { value: '25–30 ha/h',   label: 'capacidad estimada' },
  { value: 'Hasta 67,9%',  label: 'menos agua*' },
  { value: '0%',           label: 'compactación por tractor' },
] as const;

export default function AdvantagesSection() {
  const wrapRef  = useRef<HTMLElement>(null);
  // Match Services exactly (0.08) — same silky 60fps feel.
  const progress = useSmoothScrollProgress(wrapRef, 0.08);

  /* ─── Fases del recorrido ─────────────────────────────── */
  // 0.00 → 0.04  → initial state, foto pequeña centrada
  // 0.04 → 0.32  → zoom: la foto crece y llena el viewport
  // 0.15 → 0.42  → entra el headline del "problema" sobre la foto
  // 0.46 → 0.62  → la foto se oscurece y el "problema" se desvanece
  // 0.55 → 0.80  → entra el panel de "solución" con cards + KPIs
  // 0.80 → 1.00  → hold final (espacio para que el usuario lea sin pasar a la siguiente)
  // zoom = LINEAR (no easing). Scroll-driven geometric expansion
  // needs to feel proportional to user input; easeOut here was
  // doing 87% of the visual change in the first 50% of the scroll
  // range, which read as an aceleration + parón = "salto a mitad".
  const zoom        = phase(progress, 0.04, 0.32);
  const problem     = easeOut(phase(progress, 0.15, 0.42));
  const handoff     = easeOut(phase(progress, 0.46, 0.62));
  const solution    = easeOut(phase(progress, 0.55, 0.80));
  const dark        = handoff;                              // oscurecido extra al final
  const problemOut  = 1 - handoff;

  /* Stagger para las 6 advantage cards (solución) */
  function cardOpacity(i: number) {
    const start = 0.58 + i * 0.028;
    return easeOut(phase(progress, start, start + 0.10));
  }

  /* clip-path del marco que se abre — reducido para sentirse pulido,
     no dramático. Frame inicial: 16% inset (vs 22% antes), 18px radius. */
  const inset = (1 - zoom) * 16;
  const radius = (1 - zoom) * 18;

  return (
    <section
      ref={wrapRef as React.RefObject<HTMLElement>}
      id="ventajas"
      className="adv-section"
    >
      <div style={{
        position: 'sticky', top: 0, height: '100svh',
        overflow: 'hidden',
      }}>
        {/* ── Background image with clip-path expansion ── */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/tractor-mud.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 45%',
          clipPath: `inset(${inset}% ${inset}% ${inset}% ${inset}% round ${radius}px)`,
          transform: `scale(${0.97 + zoom * 0.04})`,   // 0.97 → 1.01, subtler
          willChange: 'clip-path, transform',
        }} />

        {/* Borde sutil del marco mientras está cerrado */}
        {zoom < 0.98 && (
          <div style={{
            position: 'absolute',
            top: `${inset}%`, left: `${inset}%`,
            right: `${inset}%`, bottom: `${inset}%`,
            borderRadius: radius,
            boxShadow: `inset 0 0 0 1px color-mix(in oklch, var(--accent) ${30 * (1 - zoom)}%, transparent)`,
            pointerEvents: 'none',
          }} />
        )}

        {/* Dark overlay — se intensifica al ceder paso al panel de solución */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg,
            rgba(6,9,10,${0.30 + dark * 0.45}) 0%,
            rgba(6,9,10,${0.15 + dark * 0.55}) 45%,
            rgba(6,9,10,${0.55 + dark * 0.40}) 100%)`,
          pointerEvents: 'none',
        }} />

        {/* Grid de fondo */}
        <div className="grid-bg" style={{ opacity: 0.25, position: 'absolute', inset: 0 }} />

        {/* ── PROBLEM CAPTION ── */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0 8vw',
          opacity: problem * problemOut,
          transform: `translateY(${(1 - problem) * 30 - handoff * 20}px) scale(${0.96 + problem * 0.04})`,
          pointerEvents: 'none',
        }}>
          <div style={{ textAlign: 'center', maxWidth: 940 }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(34px, 5.4vw, 72px)',
              lineHeight: 1.04, letterSpacing: '-0.035em',
              color: '#fff',
              textShadow: '0 4px 40px rgba(0,0,0,0.85)',
            }}>
              El barro detiene el tractor.<br />
              <em style={{
                fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                color: 'var(--accent)', fontWeight: 400,
              }}>
                Tu campaña no puede esperar.
              </em>
            </h2>
            <div className="readout" style={{
              marginTop: 24, display: 'inline-block',
              background: 'rgba(6,9,10,0.75)',
              padding: '7px 14px', borderRadius: 4,
              fontSize: 11, letterSpacing: '0.12em',
              backdropFilter: 'blur(6px)',
            }}>
              ● TERRENO HÚMEDO · ACCESO IMPOSIBLE
            </div>
          </div>
        </div>

        {/* ── SOLUTION PANEL ── */}
        <div
          className="adv-solution"
          style={{
            opacity: solution,
            transform: `translateY(${(1 - solution) * 40}px)`,
            pointerEvents: solution > 0.6 ? 'auto' : 'none',
          }}
        >
          <div className="wrap" style={{ position: 'relative', width: '100%' }}>
            <div className="adv-grid">

              {/* LEFT — eyebrow + heading + lede + CTA */}
              <div>
                <span className="eyebrow">
                  <span className="num">03</span> VENTAJAS
                </span>
                <h2 className="h-section" style={{ marginTop: 14, color: '#fff' }}>
                  Dron vs.<br /><em>maquinaria pesada</em>
                </h2>
                <p className="lede" style={{ marginTop: 16, marginBottom: 28, color: 'rgba(255,255,255,0.78)' }}>
                  No es el futuro: es la solución presente para agricultores
                  que buscan eficiencia, precisión y respeto por su tierra.
                </p>

                {/* KPI strip */}
                <div className="adv-kpis">
                  {KPIS.map((k) => (
                    <div key={k.label} className="adv-kpis__item">
                      <div className="adv-kpis__num">{k.value}</div>
                      <div className="readout adv-kpis__label">{k.label}</div>
                    </div>
                  ))}
                </div>

                {/* Nota legal */}
                <p style={{
                  fontSize: 10, color: 'rgba(255,255,255,0.38)',
                  lineHeight: 1.5, marginTop: 10,
                  fontFamily: 'var(--font-mono)', letterSpacing: '0.02em',
                }}>
                  *Datos orientativos según estudios comparativos y condiciones de aplicación.
                  Los resultados pueden variar según cultivo, producto, dosis, clima y terreno.
                </p>
              </div>

              {/* RIGHT — 6 advantage cards stagger-revealed */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {ADV.map((a, i) => {
                  const op = cardOpacity(i);
                  return (
                    <article key={a.title} className="adv-card" style={{
                      opacity: op,
                      transform: `translateY(${(1 - op) * 30}px)`,
                    }}>
                      <div className="adv-card__icon">{ICONS[a.icon]}</div>
                      <div>
                        <h3 style={{ fontSize: 13.5, marginBottom: 4, color: '#fff', fontWeight: 600 }}>{a.title}</h3>
                        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, lineHeight: 1.5 }}>{a.desc}</p>
                      </div>
                    </article>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div style={{
          position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 4, alignItems: 'center',
        }}>
          {[0.10, 0.30, 0.65].map((stage, i) => (
            <span key={i} style={{
              width: 30, height: 2,
              background: progress > stage ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>
      </div>

      <style>{`
        .adv-section {
          position: relative;
          height: 520svh;
          background: var(--bg);
        }

        /* Solution panel wrapper */
        #ventajas .adv-solution {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          padding: clamp(48px, 7vh, 96px) clamp(28px, 6vw, 96px);
        }

        #ventajas .adv-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: clamp(28px, 4vw, 60px);
          align-items: center;
        }

        /* KPI strip */
        #ventajas .adv-kpis {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          background: rgba(6,9,10,0.55);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          overflow: hidden;
          margin-bottom: 22px;
        }
        #ventajas .adv-kpis__item {
          padding: 14px 10px;
          text-align: center;
          border-right: 1px solid rgba(255,255,255,0.12);
        }
        #ventajas .adv-kpis__item:last-child { border-right: 0; }
        #ventajas .adv-kpis__num {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(22px, 2.2vw, 30px);
          color: var(--accent);
          letter-spacing: -0.03em;
          line-height: 1;
        }
        #ventajas .adv-kpis__label {
          margin-top: 5px;
          font-size: 10px;
          color: rgba(255,255,255,0.6);
        }

        /* Advantage cards */
        #ventajas .adv-card {
          display: flex; gap: 12px; align-items: flex-start;
          padding: 14px 16px;
          border-radius: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          backdrop-filter: blur(14px) saturate(120%);
          -webkit-backdrop-filter: blur(14px) saturate(120%);
          /* opacity/transform driven by lerped progress at 60fps —
             only hover transitions live in CSS */
          transition: border-color 0.3s, background 0.3s;
        }
        @media (hover: hover) and (pointer: fine) {
          #ventajas .adv-card:hover {
            border-color: color-mix(in oklch, var(--accent) 40%, transparent);
            background: rgba(255,255,255,0.06);
          }
        }
        #ventajas .adv-card__icon {
          width: 36px; height: 36px; border-radius: 8px; flex-shrink: 0;
          background: color-mix(in oklch, var(--accent) 18%, transparent);
          border: 1px solid color-mix(in oklch, var(--accent) 30%, transparent);
          color: var(--accent);
          display: flex; align-items: center; justify-content: center;
        }

        /* ── Tablet (≤ 980px) — stack columns, shorten section ─── */
        @media (max-width: 980px) {
          .adv-section { height: 380svh; }
          #ventajas .adv-grid { grid-template-columns: 1fr !important; gap: 32px; }
          #ventajas .adv-kpis { grid-template-columns: repeat(2, 1fr); }
          #ventajas .adv-kpis__item:nth-child(2) { border-right: 0; }
          #ventajas .adv-kpis__item:nth-child(1),
          #ventajas .adv-kpis__item:nth-child(2) {
            border-bottom: 1px solid rgba(255,255,255,0.12);
          }
        }

        /* ── Phone (≤ 640px) — cards 1-col + tighter ───────────── */
        @media (max-width: 640px) {
          .adv-section { height: 320svh; }
          #ventajas .adv-solution {
            padding: 36px 16px;
            align-items: flex-start;
            padding-top: max(72px, env(safe-area-inset-top));  /* clear header */
            overflow-y: auto;                                  /* allow scroll if too tall */
          }
          #ventajas .adv-grid > div:last-child {
            grid-template-columns: 1fr !important;
          }
          #ventajas .adv-card { padding: 12px 14px; }
          #ventajas .adv-kpis__num { font-size: 22px; }
          #ventajas .adv-kpis__label { font-size: 9.5px; }
          /* Center the CTA on phone */
          #ventajas .adv-grid > div:first-child > .btn-primary,
          #ventajas .adv-grid > div:first-child > a.btn {
            display: flex;
            margin-left: auto;
            margin-right: auto;
            width: fit-content;
          }
        }

        /* ── Landscape phones — keep content readable ──────────── */
        @media (max-height: 520px) and (orientation: landscape) {
          .adv-section { height: 320svh; }
        }
      `}</style>
    </section>
  );
}
