'use client';

import FadeIn from '@/components/ui/FadeIn';
import CountUp from '@/components/ui/CountUp';

const ADV = [
  { icon: 'foot',   title: 'No pisamos el cultivo',    desc: 'El dron vuela sobre la parcela sin contacto con el suelo, eliminando daños mecánicos en cualquier fase.' },
  { icon: 'rain',   title: 'Acceso en terreno húmedo', desc: 'Cuando la maquinaria no puede entrar por barro, el dron opera con normalidad.' },
  { icon: 'target', title: 'Pulverización precisa',    desc: 'Gotas uniformes que penetran el dosel con precisión milimétrica.' },
  { icon: 'drop',   title: 'Menor gasto de producto',  desc: 'Sensores de altura y dosis variable reducen el consumo hasta un 30%.' },
  { icon: 'bolt',   title: 'Mayor rapidez',            desc: 'Tratamos entre 5 y 15 ha/h en los momentos críticos de campaña.' },
  { icon: 'earth',  title: 'Sin compactación',         desc: 'Preservamos la estructura del suelo y mejoramos la salud radicular.' },
];

const ICONS: Record<string, React.ReactNode> = {
  foot: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 21V11a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v10M5 21l-2 0M19 21l2 0" />
    </svg>
  ),
  rain: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 13v6M8 13v6M12 15v6M20 9a4 4 0 0 0-3-7 6 6 0 0 0-11.7 1A5 5 0 0 0 5 13" />
    </svg>
  ),
  target: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" />
    </svg>
  ),
  drop: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.5s7 8 7 12.5a7 7 0 1 1-14 0c0-4.5 7-12.5 7-12.5z" />
    </svg>
  ),
  bolt: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  ),
  earth: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
};

const KPIS = [
  ['Reducción producto fitosanitario', 30, '%'],
  ['Cobertura por hora de vuelo',       12, ' ha/h'],
  ['Compactación del suelo',             0, '%'],
  ['Daño mecánico al cultivo',           0, '%'],
] as const;

export default function AdvantagesSection() {
  return (
    <section
      id="ventajas"
      data-drone-target="advantages"
      className="section-pad"
    >
      <div className="wrap">

        {/* Contrast banner */}
        <FadeIn>
          <div style={{
            position: 'relative', marginBottom: 64, borderRadius: 18,
            overflow: 'hidden', border: '1px solid var(--border-2)',
            aspectRatio: '21 / 7',
            backgroundImage: 'url(/images/tractor-mud.jpg)',
            backgroundSize: 'cover', backgroundPosition: 'center 55%',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, color-mix(in oklch, var(--bg) 85%, transparent), color-mix(in oklch, var(--bg) 30%, transparent) 60%, transparent)',
            }} />
            <div className="ventajas-banner-copy" style={{
              position: 'absolute', inset: 0, padding: 'clamp(20px, 4vw, 48px)',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              maxWidth: '60%',
            }}>
              <span className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.18em', marginBottom: 10 }}>
                ↘ EL PROBLEMA
              </span>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 'clamp(22px, 2.4vw, 34px)', lineHeight: 1.1,
                color: 'var(--text)', letterSpacing: '-0.02em',
              }}>
                La maquinaria pesada no entra cuando<br />
                <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>
                  la campaña no espera
                </em>.
              </h3>
            </div>
            <div className="readout" style={{
              position: 'absolute', bottom: 18, right: 18,
              background: 'color-mix(in oklch, var(--bg) 70%, transparent)',
              padding: '6px 10px', borderRadius: 4,
            }}>
              ● TERRENO HÚMEDO · ACCESO IMPOSIBLE
            </div>
          </div>
        </FadeIn>

        <div className="adv-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 80, alignItems: 'start' }}>

          {/* Sticky left: title + KPIs */}
          <FadeIn style={{ position: 'sticky', top: 120 }}>
            <span className="eyebrow"><span className="num">03</span> VENTAJAS</span>
            <h2 className="h-section" style={{ marginTop: 18 }}>
              Dron vs.<br /><em>maquinaria pesada</em>
            </h2>
            <p className="lede" style={{ marginTop: 22, marginBottom: 36 }}>
              No es el futuro: es la solución presente para agricultores que buscan eficiencia,
              precisión y respeto por su tierra.
            </p>

            <div style={{ border: '1px solid var(--border)', borderRadius: 14, background: 'var(--bg-card)', padding: 6 }}>
              {KPIS.map(([label, val, suffix]) => (
                <div key={label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '14px 16px', borderBottom: '1px solid var(--border)',
                }}>
                  <span className="mono" style={{ fontSize: 11.5, color: 'var(--text-mut)', letterSpacing: '0.04em' }}>
                    {label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--accent)', letterSpacing: '-0.02em' }}>
                    <CountUp to={val} suffix={suffix} duration={2} />
                  </span>
                </div>
              ))}
            </div>

            <a href="#contacto" className="btn btn-primary" style={{ marginTop: 24 }}>
              Solicitar demostración
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </FadeIn>

          {/* Right: advantage cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {ADV.map((a, i) => (
              <FadeIn key={a.title} delay={i * 70}>
                <article className="card" style={{
                  display: 'grid', gridTemplateColumns: '56px 1fr auto',
                  gap: 20, padding: 22, alignItems: 'center',
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 10,
                    background: 'color-mix(in oklch, var(--accent) 14%, transparent)',
                    border: '1px solid var(--border-2)',
                    color: 'var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {ICONS[a.icon]}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 17, marginBottom: 4, color: 'var(--text)' }}>{a.title}</h3>
                    <p style={{ color: 'var(--text-mut)', fontSize: 13.5, lineHeight: 1.55 }}>{a.desc}</p>
                  </div>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--text-dim)' }}>0{i + 1}</span>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .adv-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .adv-grid > *:first-child { position: static !important; }
          .ventajas-banner-copy { max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
