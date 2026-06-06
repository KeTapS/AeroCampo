'use client';

import { ReactNode, useRef } from 'react';
import { useSmoothScrollProgress, phase, trap } from '@/components/ui/useScrollProgress';

const WA = 'https://wa.me/34615325317?text=Hola%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20vuestros%20servicios.';

const STATS = [
  { value: 'Planificación GPS',  label: 'rutas de aplicación controladas' },
  { value: 'Equipo móvil',       label: 'servicio directo en finca' },
  { value: '25–30 ha/h',         label: 'capacidad estimada de trabajo' },
];

/* Scene windows over the whole hero scroll (0..1) — [fadeIn, full, fadeOut, end] */
const SCENES = {
  s1: [0.00, 0.00, 0.24, 0.36] as const, // El campo
  s2: [0.30, 0.42, 0.60, 0.72] as const, // La operación
  s3: [0.66, 0.78, 1.00, 1.00] as const, // Take action
};

const BGS = [
  { src: '/images/hero-field.webp',     window: SCENES.s1, pos: 'center 60%', zoomFrom: 1.00, zoomTo: 1.15 },
  { src: '/images/fitosanitarios.webp', window: SCENES.s2, pos: 'center 50%', zoomFrom: 1.10, zoomTo: 1.00 },
  { src: '/images/dron-atardecer.webp', window: SCENES.s3, pos: 'center 55%', zoomFrom: 1.05, zoomTo: 1.15 },
];

export default function HeroSection() {
  const wrapRef  = useRef<HTMLElement>(null);
  // Smoothed scroll progress — 60fps lerp interpolation hides discrete
  // mouse-wheel steps so the crossfade between scenes flows silkily
  // regardless of scroll speed.
  const progress = useSmoothScrollProgress(wrapRef, 0.07);

  const o1 = trap(progress, ...SCENES.s1);
  const o2 = trap(progress, ...SCENES.s2);
  const o3 = trap(progress, ...SCENES.s3);

  return (
    <section
      ref={wrapRef as React.RefObject<HTMLElement>}
      id="inicio"
      className="hero-section"
    >
      <div className="hero-sticky">
        {/* Layered photo backgrounds (crossfade + Ken Burns) */}
        {BGS.map((bg, i) => {
          const w = bg.window;
          const op = trap(progress, w[0], w[1], w[2], w[3]);
          const local = phase(progress, w[0], w[3]);
          const scale = bg.zoomFrom + (bg.zoomTo - bg.zoomFrom) * local;
          return (
            <div key={i} style={{
              position: 'absolute', inset: 0,
              opacity: op,
              backgroundImage: `url(${bg.src})`,
              backgroundSize: 'cover',
              backgroundPosition: bg.pos,
              transform: `scale(${scale})`,
              transformOrigin: '50% 50%',
              willChange: 'opacity, transform',
            }} />
          );
        })}

        {/* Cinematic vignette + bottom-fade (always on) */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(120% 90% at 50% 35%, transparent 0%, rgba(6,9,10,0.45) 70%, rgba(6,9,10,0.85) 100%),
            linear-gradient(180deg, rgba(6,9,10,0.55) 0%, transparent 35%, transparent 65%, var(--bg) 100%)`,
        }} />

        {/* Scan-line grid */}
        <div className="grid-bg" style={{ opacity: 0.25 }} />

        {/* Dark overlay for scene 3 — keeps text readable over the photo */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(6,9,10,0.55) 0%, rgba(6,9,10,0.35) 50%, rgba(6,9,10,0.65) 100%)',
          opacity: o3,
        }} />

        {/* ════════ SCENE 1 — El campo ════════ */}
        <SceneText opacity={o1} y={(1 - o1) * 24}>
          <div className="chip" style={{
            marginBottom: 24,
            background: 'rgba(6,9,10,0.52)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.13)',
          }}>
            <span className="dot" />
            Cobertura nacional · Drones DJI · Pilotos AESA certificados
          </div>
          <h1 className="h-display" style={{ lineHeight: 1.02, color: '#fff', textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}>
            Tratamientos agrícolas<br />con drones DJI<br />
            <em style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              color: 'var(--accent)', display: 'inline-block',
              lineHeight: 1, paddingBottom: '0.18em',
            }}>
              de precisión
            </em>
          </h1>
          <p className="lede" style={{
            marginTop: 24,
            color: 'rgba(255,255,255,0.78)',
            maxWidth: 460,
            marginLeft: 'auto', marginRight: 'auto',
          }}>
            Soluciones aéreas para el agricultor moderno en toda España.
          </p>
        </SceneText>

        {/* ════════ SCENE 2 — La operación ════════ */}
        <SceneText opacity={o2} y={(1 - o2) * 24}>
          <span className="label" style={{
            marginBottom: 20,
            background: 'rgba(6,9,10,0.58)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: '6px 14px',
            borderRadius: 6,
            border: '1px solid rgba(255,255,255,0.12)',
          }}>APLICACIÓN AÉREA · DRONES DJI</span>
          <h2 className="h-display" style={{ lineHeight: 1.02, color: '#fff', textShadow: '0 4px 40px rgba(0,0,0,0.75)' }}>
            Pulverización agrícola<br />de precisión<br />
            <em style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              color: 'var(--accent)', display: 'inline-block', lineHeight: 1, paddingBottom: '0.14em',
            }}>menos pisadas, más eficiencia</em>
          </h2>
          <p className="lede" style={{
            marginTop: 22,
            color: 'rgba(255,255,255,0.82)',
            maxWidth: 560,
            marginLeft: 'auto', marginRight: 'auto',
          }}>
            Aplicamos tratamientos agrícolas con drones DJI, reduciendo el contacto con el cultivo y
            permitiendo trabajar en zonas donde la maquinaria pesada no puede entrar. Rendimiento
            operativo estimado: hasta 25–30 ha/h según cultivo, producto, dosis y condiciones del terreno.
          </p>
        </SceneText>

        {/* ════════ SCENE 3 — Take action ════════ */}
        <SceneText opacity={o3} y={(1 - o3) * 24}>
          <span className="label" style={{ marginBottom: 20 }}>EMPECEMOS</span>
          <h2 className="h-display" style={{ lineHeight: 1.02, color: 'var(--text)' }}>
            Tu campaña,<br /><em style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              color: 'var(--accent)', display: 'inline-block', lineHeight: 1, paddingBottom: '0.14em',
            }}>más rápida y precisa</em>
          </h2>

          <div style={{
            marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center',
          }}>
            <a href="#contacto" className="btn btn-primary">
              Pedir presupuesto
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Stats strip */}
          <div className="hero-stats">
            {STATS.map((s, i) => (
              <div key={i} className="hero-stats__item">
                <div className="hero-stats__num">{s.value}</div>
                <div className="readout hero-stats__label">{s.label}</div>
              </div>
            ))}
          </div>
        </SceneText>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          height: 380svh;
          background: var(--bg);
        }
        .hero-sticky {
          position: sticky;
          top: 0;
          height: 100svh;
          overflow: hidden;
        }

        .hero-stats {
          margin: 36px auto 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          background: var(--bg-card);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          text-align: left;
          max-width: 640px;
        }
        .hero-stats__item {
          padding: 22px 24px;
          border-right: 1px solid var(--border);
        }
        .hero-stats__item:last-child { border-right: 0; }
        .hero-stats__num {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(14px, 1.6vw, 20px);
          color: var(--accent);
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .hero-stats__label { margin-top: 6px; }

        /* ── Tablet & smaller (≤ 880px) — slightly tighter ─────── */
        @media (max-width: 880px) {
          .hero-section { height: 300svh; }
        }

        /* ── Phone (≤ 640px) — stats become 1×3 stack ──────────── */
        @media (max-width: 640px) {
          .hero-section { height: 260svh; }
          .hero-stats {
            grid-template-columns: 1fr;
            max-width: 360px;
            margin-top: 28px;
          }
          .hero-stats__item {
            padding: 14px 18px;
            border-right: 0;
            border-bottom: 1px solid var(--border);
            display: flex; align-items: baseline; gap: 12px;
          }
          .hero-stats__item:last-child { border-bottom: 0; }
          .hero-stats__num { font-size: 26px; flex-shrink: 0; }
          .hero-stats__label { margin-top: 0; }
        }

        /* ── Landscape phones — compact, tighter scenes ────────── */
        @media (max-height: 520px) and (orientation: landscape) {
          .hero-section { height: 280svh; }
          .hero-stats { margin-top: 16px; }
          .hero-stats__item { padding: 10px 14px; }
        }
      `}</style>
    </section>
  );
}

/* ── Scene text wrapper ─────────────────────────────────────── */
function SceneText({ opacity, y, children }: { opacity: number; y: number; children: ReactNode }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0 clamp(28px, 6vw, 96px)',
      opacity,
      transform: `translateY(${y}px)`,
      pointerEvents: opacity > 0.6 ? 'auto' : 'none',
      transition: 'opacity 0.05s linear, transform 0.05s linear',
    }}>
      <div style={{
        width: '100%', maxWidth: 940, textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {children}
      </div>
    </div>
  );
}

