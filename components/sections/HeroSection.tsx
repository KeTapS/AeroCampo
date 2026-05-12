'use client';

import FadeIn from '@/components/ui/FadeIn';
import CountUp from '@/components/ui/CountUp';

const WA = 'https://wa.me/34600000000?text=Hola%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20vuestros%20servicios.';

const STATS = [
  { to: 10,  suffix: '×',     label: 'más rápido que un tractor' },
  { to: 30,  suffix: '%',     label: 'menos producto fitosanitario' },
  { to: 15,  suffix: ' ha/h', label: 'cobertura por hora de vuelo' },
];

export default function HeroSection() {
  return (
    <section
      id="inicio"
      data-drone-target="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: 120,
      }}
    >
      {/* Background photo */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'url(/images/hero-field.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 65%',
        opacity: 0.32,
        filter: 'saturate(0.9) contrast(1.05)',
      }} />

      {/* Dark gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, var(--bg) 0%, color-mix(in oklch, var(--bg) 65%, transparent) 38%, color-mix(in oklch, var(--bg) 85%, transparent) 70%, var(--bg) 100%)',
      }} />

      {/* Grid */}
      <div className="grid-bg" style={{ opacity: 0.35 }} />

      {/* Radial spotlight */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(60% 50% at 20% 60%, color-mix(in oklch, var(--accent) 8%, transparent), transparent 60%)',
      }} />

      <div className="wrap" style={{ position: 'relative', zIndex: 4 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 60, alignItems: 'center' }}>

          {/* Left: copy */}
          <div>
            <FadeIn delay={50}>
              <div className="chip" style={{ marginBottom: 24 }}>
                <span className="dot" />
                Castilla y León · Pilotos AESA certificados
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <h1 className="h-display" style={{ lineHeight: 1.04, color: 'var(--text)' }}>
                Tratamientos<br />agrícolas con<br />
                <em style={{
                  fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                  color: 'var(--accent)', display: 'inline-block',
                  lineHeight: 1, paddingBottom: '0.18em',
                }}>
                  drones de precisión
                </em>
              </h1>
            </FadeIn>

            <FadeIn delay={300}>
              <p className="lede" style={{ marginTop: 52, maxWidth: '52ch' }}>
                Soluciones aéreas para el agricultor moderno en Segovia, Valladolid y toda Castilla&nbsp;y&nbsp;León.
                Más eficiencia, menos producto, sin pisar el cultivo.
              </p>
            </FadeIn>

            <FadeIn delay={450} style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
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
            </FadeIn>

            {/* Stats strip */}
            <FadeIn delay={600} style={{ marginTop: 56 }}>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden',
                background: 'var(--bg-card)', backdropFilter: 'blur(10px)',
              }}>
                {STATS.map((s, i) => (
                  <div key={i} style={{
                    padding: '22px 24px',
                    borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontWeight: 800,
                      fontSize: 'clamp(28px, 3.4vw, 40px)',
                      color: 'var(--accent)', letterSpacing: '-0.03em', lineHeight: 1,
                    }}>
                      <CountUp to={s.to} suffix={s.suffix} duration={2.2} />
                    </div>
                    <div className="readout" style={{ marginTop: 8 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right column — drone floats here; HUD rings for visual framing */}
          <div className="hero-right" style={{ position: 'relative', minHeight: 520 }}>
            <FadeIn delay={350}>
              <svg viewBox="0 0 400 400" style={{
                position: 'absolute', inset: '-10% -10% auto auto',
                width: '110%', height: 'auto', opacity: 0.45,
              }}>
                <circle cx="200" cy="200" r="180" stroke="var(--accent)"   strokeWidth="0.6" fill="none" strokeDasharray="3 6" />
                <circle cx="200" cy="200" r="130" stroke="var(--accent-2)" strokeWidth="0.6" fill="none" strokeDasharray="2 8" />
                <circle cx="200" cy="200" r="80"  stroke="var(--accent)"   strokeWidth="0.6" fill="none" />
                {Array.from({ length: 24 }).map((_, i) => {
                  const a = (i / 24) * Math.PI * 2;
                  const x1 = 200 + Math.cos(a) * 180, y1 = 200 + Math.sin(a) * 180;
                  const x2 = 200 + Math.cos(a) * 188, y2 = 200 + Math.sin(a) * 188;
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent)" strokeWidth="1" />;
                })}
              </svg>
            </FadeIn>
          </div>
        </div>

        {/* Bottom scroll cue */}
        <FadeIn delay={1000} style={{
          marginTop: 60, display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: 20,
        }}>
          <span className="readout">SCROLL · explorar capacidades</span>
          <span className="readout">07 SECCIONES · 01/07</span>
        </FadeIn>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right { display: none !important; }
        }
      `}</style>
    </section>
  );
}
