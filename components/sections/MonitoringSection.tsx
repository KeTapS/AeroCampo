'use client';

import FadeIn from '@/components/ui/FadeIn';

const LAYERS = [
  { code: 'NDVI', label: 'Vigor vegetativo',   color: 'var(--accent)',   pct: 78 },
  { code: 'NDRE', label: 'Estrés nitrogenado', color: 'var(--accent-2)', pct: 52 },
  { code: 'NDWI', label: 'Estrés hídrico',     color: '#7fc9d8',         pct: 34 },
  { code: 'TERM', label: 'Termal · plagas',    color: '#e58f5a',         pct: 18 },
];

const ANNOTATIONS = [
  { x: 22, y: 38, lbl: 'NDVI · 0.32', sub: 'baja vigorosidad' },
  { x: 64, y: 60, lbl: 'NDRE · 0.18', sub: 'déficit N' },
  { x: 48, y: 22, lbl: 'TERM · +3.2°C', sub: 'foco plaga' },
];

export default function MonitoringSection() {
  return (
    <section
      id="monitorizacion"
      data-drone-target="monitoring"
      className="section-pad"
      style={{ background: 'var(--bg-alt)' }}
    >
      <div className="grid-bg" style={{ opacity: 0.35 }} />
      <div className="wrap" style={{ position: 'relative' }}>

        <FadeIn className="section-head">
          <div>
            <span className="eyebrow"><span className="num">04</span> MONITORIZACIÓN</span>
            <h2 className="h-section" style={{ marginTop: 18 }}>
              Ver el campo<br /><em>como nunca antes</em>
            </h2>
          </div>
          <p className="lede">
            Capturamos imágenes multiespectrales y termales que revelan lo que el ojo humano no puede ver: estrés
            hídrico, plagas tempranas, deficiencias de nitrógeno. Diagnóstico zonal sobre cada parcela.
          </p>
        </FadeIn>

        <div className="mon-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 36, alignItems: 'start' }}>

          {/* NDVI image viewer */}
          <FadeIn>
            <div style={{
              position: 'relative', borderRadius: 16, overflow: 'hidden',
              border: '1px solid var(--border-2)', background: 'var(--bg-card)',
              aspectRatio: '4 / 3',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'url(/images/ndvi.jpg)',
                backgroundSize: 'cover', backgroundPosition: 'center',
                filter: 'saturate(1.05) contrast(1.02)',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, color-mix(in oklch, var(--bg) 18%, transparent), transparent 30%, transparent 70%, color-mix(in oklch, var(--bg) 35%, transparent))',
              }} />

              {/* Annotations */}
              {ANNOTATIONS.map((a, i) => (
                <div key={i} style={{
                  position: 'absolute', left: `${a.x}%`, top: `${a.y}%`,
                  transform: 'translate(-50%, -50%)',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{
                    width: 12, height: 12, borderRadius: '50%',
                    background: 'var(--accent)',
                    boxShadow: '0 0 0 3px color-mix(in oklch, var(--accent) 40%, transparent)',
                    flexShrink: 0,
                  }} />
                  <div style={{
                    background: 'var(--bg)', border: '1px solid var(--border-2)',
                    borderRadius: 6, padding: '6px 8px',
                    fontFamily: 'var(--font-mono)', fontSize: 10.5, lineHeight: 1.3,
                  }}>
                    <b style={{ color: 'var(--accent)', fontWeight: 500 }}>{a.lbl}</b>
                    <div style={{ color: 'var(--text-mut)' }}>{a.sub}</div>
                  </div>
                </div>
              ))}

              <div className="readout" style={{
                position: 'absolute', top: 14, left: 14,
                background: 'color-mix(in oklch, var(--bg) 78%, transparent)',
                padding: '6px 10px', borderRadius: 4,
              }}>
                <b>● CAPTURA</b> · sentinel-2 · ndvi 0.65
              </div>
              <div className="readout" style={{
                position: 'absolute', bottom: 14, right: 14,
                background: 'color-mix(in oklch, var(--bg) 78%, transparent)',
                padding: '6px 10px', borderRadius: 4,
              }}>
                ALT 80 m · GSD 2.1 cm/px
              </div>
            </div>
          </FadeIn>

          {/* Spectral layer list */}
          <FadeIn delay={120}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {LAYERS.map((l, i) => (
                <article key={l.code} className="card" style={{ padding: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div>
                      <span className="mono" style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.12em' }}>/ 0{i+1}</span>
                      <h3 style={{ fontSize: 18, marginTop: 4, fontWeight: 500 }}>
                        <span style={{ color: l.color, fontWeight: 700 }}>{l.code}</span>
                        {' '}<span style={{ color: 'var(--text)' }}>· {l.label}</span>
                      </h3>
                    </div>
                    <span className="mono" style={{ fontSize: 12, color: 'var(--text)' }}>{l.pct}%</span>
                  </div>
                  <div style={{ marginTop: 12, height: 4, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${l.pct}%`, height: '100%', background: l.color, boxShadow: `0 0 12px ${l.color}` }} />
                  </div>
                </article>
              ))}

              <div style={{
                display: 'flex', gap: 10, marginTop: 4, padding: '14px 16px',
                border: '1px dashed var(--border-2)', borderRadius: 12,
                fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-mut)',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                  <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                </svg>
                Entregamos informes con mapas, recomendaciones agronómicas
                y rutas de tratamiento listas para el dron.
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .mon-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
