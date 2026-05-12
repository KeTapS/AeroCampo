'use client';

import FadeIn from '@/components/ui/FadeIn';

const ZONES = [
  'Segovia', 'Valladolid', 'Ávila', 'Salamanca',
  'Burgos', 'Palencia', 'Soria', 'León', 'Zamora',
];

const SECONDARY_MARKERS: [number, number][] = [
  [130, 120], [240, 130], [200, 220], [105, 195], [275, 205],
];

export default function CoverageSection() {
  return (
    <section
      id="cobertura"
      data-drone-target="coverage"
      className="section-pad"
    >
      <div className="wrap">

        <FadeIn className="section-head">
          <div>
            <span className="eyebrow"><span className="num">05</span> COBERTURA</span>
            <h2 className="h-section" style={{ marginTop: 18 }}>
              Volamos sobre<br /><em>Castilla y León</em>
            </h2>
          </div>
          <p className="lede">
            Base en Segovia y operativos en las nueve provincias. Vamos donde haga falta dentro
            de la comunidad — sin distinción entre parcelas cercanas o lejanas.
          </p>
        </FadeIn>

        <div className="cov-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, alignItems: 'start' }}>

          {/* Abstract SVG map */}
          <FadeIn>
            <div style={{
              position: 'relative', aspectRatio: '4 / 3',
              borderRadius: 16, border: '1px solid var(--border-2)',
              background: 'var(--bg-card)', overflow: 'hidden',
            }}>
              <svg viewBox="0 0 400 300" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                {/* Concentric topography rings */}
                {[60, 100, 140, 180, 220].map((r) => (
                  <ellipse key={r} cx="190" cy="160" rx={r} ry={r * 0.65}
                    fill="none" stroke="var(--border)" strokeWidth="0.6" />
                ))}
                {/* Province blobs */}
                {([
                  [120, 100, 50, 30], [220, 110, 60, 35], [180, 200, 80, 45],
                  [80, 180, 45, 28], [280, 200, 55, 32],
                ] as [number,number,number,number][]).map(([x, y, rx, ry], i) => (
                  <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry}
                    fill="none" stroke="var(--accent)" strokeWidth="0.8"
                    strokeDasharray="2 4" opacity="0.5" />
                ))}
                {/* Base ping — Segovia */}
                <circle cx="190" cy="160" r="6" fill="var(--accent)" />
                <circle cx="190" cy="160" r="12" fill="none" stroke="var(--accent)" strokeWidth="1">
                  <animate attributeName="r" from="6" to="40" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.8" to="0" dur="2.5s" repeatCount="indefinite" />
                </circle>
                {/* Secondary markers */}
                {SECONDARY_MARKERS.map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="var(--accent-2)" opacity="0.85" />
                ))}
              </svg>

              <div className="readout" style={{
                position: 'absolute', top: 14, left: 14,
                background: 'color-mix(in oklch, var(--bg) 70%, transparent)',
                padding: '6px 10px', borderRadius: 4,
              }}>
                <b>● BASE</b> SEGOVIA · 40.95N 4.12W
              </div>
              <div className="readout" style={{
                position: 'absolute', bottom: 14, right: 14,
                background: 'color-mix(in oklch, var(--bg) 70%, transparent)',
                padding: '6px 10px', borderRadius: 4,
              }}>
                9 PROVINCIAS · CASTILLA Y LEÓN
              </div>
            </div>
          </FadeIn>

          {/* Province grid */}
          <FadeIn delay={120}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {ZONES.map((name) => {
                const isBase = name === 'Segovia';
                return (
                  <div key={name} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: 16, borderRadius: 10,
                    border: '1px solid var(--border)',
                    background: isBase ? 'color-mix(in oklch, var(--accent) 8%, transparent)' : 'var(--bg-card)',
                  }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: 'var(--text)' }}>
                      {name}
                    </span>
                    {isBase && (
                      <span className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.1em' }}>
                        ● BASE
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .cov-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
