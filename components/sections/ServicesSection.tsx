'use client';

import FadeIn from '@/components/ui/FadeIn';

const SERVICES = [
  {
    num: '01',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="1.5" /><circle cx="10" cy="9" r="1.5" />
        <circle cx="14" cy="6" r="1.5" /><circle cx="6" cy="13" r="1.5" />
        <circle cx="14" cy="13" r="1.5" /><circle cx="10" cy="17" r="1.5" />
      </svg>
    ),
    title: 'Tratamientos fitosanitarios',
    desc:  'Aplicación precisa de pesticidas, herbicidas y fungicidas con drones multirrotor. Cobertura homogénea, sin manchas y con mínima deriva.',
    tags:  ['Pulverización electrostática', 'Dosis variable'],
  },
  {
    num: '02',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V10" /><path d="M5 8a7 7 0 0 1 7-2 7 7 0 0 1 7 2c0 4-3 6-7 6S5 12 5 8z" />
      </svg>
    ),
    title: 'Fertilización de precisión',
    desc:  'Distribución de fertilizantes líquidos y granulares adaptada a cada zona mediante mapas de prescripción.',
    tags:  ['Líquido + sólido', 'Mapa NDVI'],
  },
  {
    num: '03',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 12h18" />
      </svg>
    ),
    title: 'Monitorización de cultivos',
    desc:  'Imágenes multiespectrales para detectar estrés hídrico, plagas y enfermedades antes de que sean visibles.',
    tags:  ['NDVI · NDRE', 'Diagnóstico zonal'],
  },
  {
    num: '04',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    title: 'Fotografía y vídeo aéreo',
    desc:  'Documentación profesional: ortofotomapas, seguimiento de campaña, reportajes agrícolas en 4K.',
    tags:  ['4K · 6K', 'Mapas ortofoto'],
  },
];

export default function ServicesSection() {
  return (
    <section
      id="servicios"
      data-drone-target="services"
      className="section-pad"
      style={{ background: 'var(--bg-alt)' }}
    >
      <div className="grid-bg" style={{ opacity: 0.35 }} />
      <div className="wrap" style={{ position: 'relative' }}>

        <FadeIn className="section-head">
          <div>
            <span className="eyebrow"><span className="num">02</span> SERVICIOS</span>
            <h2 className="h-section" style={{ marginTop: 18 }}>
              Soluciones completas <em>para tu explotación</em>
            </h2>
          </div>
          <p className="lede">
            Cuatro líneas de operación que cubren la campaña entera — desde el primer diagnóstico
            multiespectral hasta el último tratamiento de cierre. Sin pisar el cultivo, sin compactar el suelo.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={s.num} delay={i * 90}>
              <article className="card" style={{ padding: '22px 22px 24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--text-dim)' }}>/ {s.num}</span>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: 'color-mix(in oklch, var(--accent) 12%, transparent)',
                    color: 'var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid var(--border-2)',
                  }}>
                    {s.icon}
                  </div>
                </div>
                <h3 style={{ fontSize: 19, marginBottom: 10, color: 'var(--text)' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-mut)', fontSize: 14, lineHeight: 1.6, flex: 1 }}>{s.desc}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 18 }}>
                  {s.tags.map((t) => (
                    <span key={t} className="chip" style={{ fontSize: 10.5 }}>{t}</span>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
