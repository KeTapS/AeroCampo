'use client';

import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import { REGIONS, VB_W, VB_H, COMPOSITION_BORDER } from './spainMapData';

export default function CoverageSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const base = REGIONS.find((r) => r.isBase)!;

  return (
    <section
      id="cobertura"
      style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 0', background: 'var(--bg)' }}
    >
      <div className="wrap" style={{ position: 'relative' }}>

        {/* Header */}
        <FadeIn className="section-head" style={{ marginBottom: 32 }}>
          <div>
            <span className="eyebrow"><span className="num">04</span> COBERTURA</span>
            <h2 className="h-section" style={{ marginTop: 14 }}>
              Volamos sobre<br /><em>toda España</em>
            </h2>
          </div>
          <p className="lede">
            Cobertura nacional con base operativa en Segovia (Castilla y León).
            Nos desplazamos a cualquier punto del país según el proyecto y el volumen de trabajo.
          </p>
        </FadeIn>

        {/* Content grid */}
        <div className="cov-layout">

          {/* ── SVG Map ────────────────────────────────────── */}
          <FadeIn className="cov-map-wrapper">
            <div className="cov-map">
              {/* HUD top */}
              <div className="readout cov-hud cov-hud-top">
                <b>● BASE</b> SEGOVIA
              </div>

              <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
                className="cov-svg"
                aria-label="Mapa de España con sus diecisiete comunidades autónomas"
              >
                {/* Decorative grid lines (HUD) */}
                <defs>
                  <pattern id="cov-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M50 0H0V50" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" />
                  </pattern>
                </defs>
                <rect width={VB_W} height={VB_H} fill="url(#cov-grid)" />

                {/* Crosshair on base */}
                <g opacity={hovered === base.id || !hovered ? 1 : 0.2}>
                  <line x1={base.cx} y1="0" x2={base.cx} y2={VB_H} stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.4" />
                  <line x1="0" y1={base.cy} x2={VB_W} y2={base.cy} stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.4" />
                </g>

                {/* Canary Islands inset box border */}
                <path d={COMPOSITION_BORDER} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.8" strokeDasharray="3 4" />

                {/* Region paths */}
                <g>
                  {REGIONS.map((r) => {
                    const isHover = hovered === r.id;
                    const isDimmed = hovered !== null && !isHover;
                    return (
                      <path
                        key={r.id}
                        d={r.d}
                        className={`cov-path ${r.isBase ? 'is-base' : ''} ${isHover ? 'is-hover' : ''} ${isDimmed ? 'is-dim' : ''}`}
                        onMouseEnter={() => setHovered(r.id)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <title>{r.name}</title>
                      </path>
                    );
                  })}
                </g>

                {/* Region labels */}
                <g pointerEvents="none">
                  {REGIONS.map((r) => (
                    <text
                      key={r.id}
                      x={r.cx}
                      y={r.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`cov-label ${r.isBase ? 'is-base' : ''} ${hovered === r.id ? 'is-hover' : ''}`}
                    >
                      {r.name.toUpperCase()}
                    </text>
                  ))}
                </g>

                {/* Base marker on Castilla y León */}
                <g pointerEvents="none">
                  <circle cx={base.cx} cy={base.cy - 16} r="4" fill="var(--accent)" />
                  <circle cx={base.cx} cy={base.cy - 16} r="6" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.5">
                    <animate attributeName="r" from="6" to="16" dur="2.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.7" to="0" dur="2.2s" repeatCount="indefinite" />
                  </circle>
                </g>
              </svg>
            </div>
          </FadeIn>

          {/* ── Communities grid ───────────────────────────── */}
          <FadeIn delay={120}>
            <div className="cov-provinces">
              {REGIONS.map((r, i) => (
                <div
                  key={r.id}
                  className={`cov-province ${r.isBase ? 'is-base' : ''} ${hovered === r.id ? 'is-hover' : ''}`}
                  onMouseEnter={() => setHovered(r.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="cov-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="cov-name">{r.name}</div>
                  {r.isBase && <div className="cov-base-tag">● BASE</div>}
                </div>
              ))}
            </div>
          </FadeIn>

        </div>
      </div>

      <style>{`
        /* ───── Desktop: map left, communities right ───── */
        .cov-layout {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 22px;
          align-items: center;
        }

        .cov-map-wrapper { display: flex; min-height: 0; }
        .cov-map {
          position: relative;
          flex: 1;
          aspect-ratio: ${VB_W} / ${VB_H};
          max-height: clamp(340px, 56svh, 500px);
          border-radius: 16px;
          border: 1px solid var(--border-2);
          overflow: hidden;
          background: var(--bg-card);
        }

        .cov-svg { width: 100%; height: 100%; display: block; }

        .cov-hud {
          position: absolute;
          background: rgba(6,9,10,0.78);
          padding: 5px 10px;
          border-radius: 4px;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 10.5px;
          letter-spacing: 0.08em;
          z-index: 2;
        }
        .cov-hud-top { top: 12px; left: 12px; }

        /* ── SVG path styling ── */
        .cov-path {
          fill: color-mix(in oklch, var(--accent) 4%, transparent);
          stroke: color-mix(in oklch, var(--accent) 50%, transparent);
          stroke-width: 1;
          stroke-linejoin: round;
          stroke-linecap: round;
          transition: fill 0.25s, stroke 0.25s, opacity 0.25s;
          cursor: pointer;
        }
        .cov-path.is-hover {
          fill: color-mix(in oklch, var(--accent) 25%, transparent);
          stroke: var(--accent);
          stroke-width: 1.4;
        }
        @media (hover: hover) and (pointer: fine) {
          .cov-path:hover {
            fill: color-mix(in oklch, var(--accent) 25%, transparent);
            stroke: var(--accent);
            stroke-width: 1.4;
          }
        }
        .cov-path.is-dim { opacity: 0.30; }
        .cov-path.is-base {
          fill: color-mix(in oklch, var(--accent) 22%, transparent);
          stroke: var(--accent);
          stroke-width: 1.2;
        }
        .cov-path.is-base.is-hover {
          fill: color-mix(in oklch, var(--accent) 38%, transparent);
        }

        /* ── SVG labels ── */
        .cov-label {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          fill: rgba(255,255,255,0.5);
          letter-spacing: 0.04em;
          pointer-events: none;
          transition: fill 0.25s;
          paint-order: stroke;
          stroke: rgba(6,9,10,0.55);
          stroke-width: 2.5px;
        }
        .cov-label.is-base { fill: var(--accent); font-weight: 700; }
        .cov-label.is-hover { fill: #fff; }

        /* ── Community cards ── */
        .cov-provinces {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .cov-province {
          position: relative;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          transition: border-color 0.25s, background 0.25s, transform 0.25s;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          cursor: pointer;
          min-height: 60px;
          touch-action: manipulation;
        }
        .cov-province.is-hover {
          border-color: color-mix(in oklch, var(--accent) 50%, transparent);
          background: var(--bg-card-2);
          transform: translateY(-2px);
        }
        @media (hover: hover) and (pointer: fine) {
          .cov-province:hover {
            border-color: color-mix(in oklch, var(--accent) 50%, transparent);
            background: var(--bg-card-2);
            transform: translateY(-2px);
          }
        }
        .cov-province.is-base {
          background: rgba(125, 211, 91, 0.05);
          border-color: rgba(125, 211, 91, 0.35);
        }
        .cov-province.is-base.is-hover { background: rgba(125, 211, 91, 0.10); }

        .cov-num {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-dim);
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }
        .cov-name {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 14px;
          color: var(--text);
          line-height: 1.15;
        }
        .cov-base-tag {
          position: absolute;
          top: 9px;
          right: 11px;
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--accent);
          letter-spacing: 0.12em;
        }

        /* ───── Tablet: stacked ───── */
        @media (max-width: 1000px) {
          .cov-layout { grid-template-columns: 1fr; gap: 18px; }
          .cov-map { max-height: 420px; }
        }

        /* ───── Mobile: communities in 2 cols, hide map labels ───── */
        @media (max-width: 680px) {
          .cov-provinces { grid-template-columns: repeat(2, 1fr); }
          .cov-map { max-height: 340px; }
          .cov-label { display: none; }   /* too cramped on a small map */
          .cov-name { font-size: 13.5px; }
          .cov-province { padding: 10px 12px; min-height: 56px; }
        }

        /* ───── Tiny mobile ───── */
        @media (max-width: 400px) {
          .cov-provinces { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
