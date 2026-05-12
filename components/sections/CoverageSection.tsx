'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import FadeIn from '@/components/ui/FadeIn';

const provinces = [
  { name: 'Segovia',    icon: '🏰', main: true  },
  { name: 'Valladolid', icon: '🍷', main: true  },
  { name: 'Ávila',      icon: '⛪', main: false },
  { name: 'Salamanca',  icon: '🎓', main: false },
  { name: 'Palencia',   icon: '🌾', main: false },
  { name: 'Burgos',     icon: '🏛️', main: false },
  { name: 'León',       icon: '🦁', main: false },
  { name: 'Zamora',     icon: '🏯', main: false },
  { name: 'Soria',      icon: '🌲', main: false },
];

const provinceVariants = {
  hidden:  { opacity: 0, scale: 0.82 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.42, delay: i * 0.06, ease: 'easeOut' as const },
  }),
};

export default function CoverageSection() {
  return (
    <section id="cobertura" style={{ position: 'relative', overflow: 'hidden', minHeight: '700px' }}>

      {/* ── Cinematic background ──────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/images/imagen-cinematografica.jpg"
          alt="Vista aérea de cultivos en Castilla y León"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          sizes="100vw"
        />
        {/* Multi-layer overlay for readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(4,24,8,0.88) 0%, rgba(10,40,14,0.75) 50%, rgba(4,24,8,0.82) 100%)' }} />
        {/* Bottom fade to next section */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to bottom, transparent, rgba(4,16,6,0.6))' }} />
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 1, padding: '7rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>

        {/* Section tag — centred above */}
        <FadeIn style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ display: 'inline-block', background: 'rgba(124,179,66,0.18)', border: '1px solid rgba(124,179,66,0.35)', color: '#a5d46a', borderRadius: '50px', padding: '0.3rem 1rem', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Poppins, sans-serif' }}>
            Zona de cobertura
          </span>
          <h2 style={{ color: 'white', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: '800', letterSpacing: '-0.02em', fontFamily: 'Poppins, sans-serif', marginTop: '0.75rem' }}>
            Llegamos directamente{' '}
            <span style={{ color: '#7CB342' }}>a tu explotación</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)', lineHeight: 1.7, maxWidth: '520px', margin: '0.75rem auto 0', fontFamily: 'Inter, sans-serif' }}>
            Nos desplazamos con furgoneta y equipo completo. Zona principal: <strong style={{ color: '#a5d46a' }}>Segovia y Valladolid</strong>.
            Cobertura extendida a toda <strong style={{ color: '#a5d46a' }}>Castilla y León</strong>.
          </p>
        </FadeIn>

        {/* Two-column layout */}
        <div className="coverage-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '3rem', alignItems: 'center' }}>

          {/* Left: province grid */}
          <FadeIn direction="left">
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '1.75rem', backdropFilter: 'blur(14px)' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>
                  Castilla y León · 9 provincias
                </div>
                <div style={{ color: '#7CB342', fontSize: '0.82rem', fontWeight: '600', marginTop: '0.2rem', fontFamily: 'Poppins, sans-serif' }}>
                  Cobertura completa disponible
                </div>
              </div>

              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem' }}>
                {provinces.map((p, i) => (
                  <motion.div key={p.name} custom={i} variants={provinceVariants} whileHover={{ scale: 1.06 }}
                    style={{
                      background: p.main ? 'linear-gradient(135deg, rgba(124,179,66,0.26), rgba(0,172,193,0.16))' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${p.main ? 'rgba(124,179,66,0.45)' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: '10px', padding: '0.7rem 0.4rem', textAlign: 'center', cursor: 'default',
                    }}>
                    <div style={{ fontSize: '1.25rem', marginBottom: '0.2rem' }}>{p.icon}</div>
                    <div style={{ color: p.main ? '#a5d46a' : 'rgba(255,255,255,0.6)', fontSize: '0.7rem', fontWeight: p.main ? '700' : '400', fontFamily: 'Poppins, sans-serif' }}>
                      {p.name}
                    </div>
                    {p.main && (
                      <div style={{ color: '#7CB342', fontSize: '0.58rem', marginTop: '0.1rem', fontFamily: 'Inter, sans-serif' }}>
                        Zona principal
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </FadeIn>

          {/* Right: highlights */}
          <FadeIn direction="right" delay={0.12}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {[
                { icon: '📍', title: 'Zona principal',     desc: 'Segovia y Valladolid — respuesta en 24-48 h' },
                { icon: '🗺️', title: 'Cobertura extendida', desc: 'Toda Castilla y León bajo petición' },
                { icon: '🚐', title: 'Movilidad propia',   desc: 'Furgoneta equipada con todo el material de vuelo' },
                { icon: '📱', title: 'Contacto directo',   desc: 'Coordinamos contigo desde el primer mensaje' },
              ].map((item, i) => (
                <motion.div key={item.title}
                  initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.09 }}
                  style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1rem 1.1rem', backdropFilter: 'blur(8px)' }}>
                  <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ color: 'white', fontWeight: '700', fontSize: '0.9rem', fontFamily: 'Poppins, sans-serif', marginBottom: '0.2rem' }}>{item.title}</div>
                    <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem', fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </motion.div>
              ))}

              <motion.a href="#contacto"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.65 }}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#7CB342', color: 'white', padding: '0.9rem 2rem', borderRadius: '50px', fontSize: '0.95rem', fontWeight: '700', fontFamily: 'Poppins, sans-serif', textDecoration: 'none', marginTop: '0.5rem', boxShadow: '0 8px 28px rgba(124,179,66,0.38)' }}>
                Consultar disponibilidad →
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .coverage-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
