'use client';

import { motion } from 'framer-motion';
import FadeIn from '@/components/ui/FadeIn';
import CountUp from '@/components/ui/CountUp';

const values = [
  { icon: '🤝', title: 'Trato cercano',   desc: 'Hablamos tu idioma, sin tecnicismos.' },
  { icon: '⚡', title: 'Rapidez',          desc: 'Respuesta ágil cuando lo necesitas.' },
  { icon: '🎯', title: 'Adaptación',       desc: 'Soluciones a medida para cada parcela.' },
  { icon: '🔬', title: 'Tecnología',       desc: 'Equipos de última generación.' },
];

const statItems = [
  { value: 500, suffix: '+', label: 'Hectáreas tratadas' },
  { value: 30,  suffix: '%', label: 'Ahorro en producto' },
  { value: 100, suffix: '%', label: 'Satisfacción' },
];

export default function AboutSection() {
  return (
    <section id="nosotros" style={{ padding: '7rem 1.5rem', background: '#F5F5F5', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '4rem', alignItems: 'center' }}
          className="about-grid">

          {/* Left */}
          <FadeIn direction="left">
            <span className="section-label">Quiénes somos</span>
            <h2 className="section-heading" style={{ marginBottom: '1.25rem' }}>
              Empresa joven con<br />
              <span className="gradient-text">tecnología puntera</span>
            </h2>
            <p style={{ color: '#555', lineHeight: '1.8', fontSize: '1rem', marginBottom: '1.25rem', fontFamily: 'Inter, sans-serif' }}>
              AeroCampo Iberia nace de la pasión por la agricultura y la tecnología. Somos un equipo especializado en
              agricultura de precisión comprometido con ofrecer soluciones reales y efectivas.
            </p>
            <p style={{ color: '#555', lineHeight: '1.8', fontSize: '1rem', marginBottom: '2rem', fontFamily: 'Inter, sans-serif' }}>
              Nuestro enfoque: <strong style={{ color: '#1B5E20' }}>trato cercano, rapidez en el servicio y soluciones 100 % adaptadas a tu explotación</strong>.
              Sin burocracia, sin esperas. Llegamos, trabajamos y te damos resultados.
            </p>

            {/* Animated stats row */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              {statItems.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    border: '1px solid #eee',
                    textAlign: 'center',
                    minWidth: '100px',
                  }}
                >
                  <div style={{ color: '#1B5E20', fontSize: '1.75rem', fontWeight: '800', fontFamily: 'Poppins, sans-serif' }}>
                    <CountUp to={s.value} suffix={s.suffix} duration={2.2} />
                  </div>
                  <div style={{ color: '#888', fontSize: '0.75rem', marginTop: '0.2rem', fontFamily: 'Inter, sans-serif' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Values grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.09 }}
                  whileHover={{ borderColor: '#7CB342', boxShadow: '0 6px 20px rgba(124,179,66,0.15)' }}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '1.1rem',
                    border: '1px solid #eee',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    cursor: 'default',
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{v.icon}</div>
                  <div style={{ fontWeight: '700', color: '#1B5E20', fontSize: '0.9rem', marginBottom: '0.2rem', fontFamily: 'Poppins, sans-serif' }}>{v.title}</div>
                  <div style={{ color: '#888', fontSize: '0.78rem', lineHeight: '1.5', fontFamily: 'Inter, sans-serif' }}>{v.desc}</div>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          {/* Right: dark feature card */}
          <FadeIn direction="right" delay={0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 200 }}
              style={{
                background: 'linear-gradient(135deg, #1B5E20, #2E7D32)',
                borderRadius: '24px',
                padding: '2.5rem',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(27,94,32,0.35)',
              }}
            >
              <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(124,179,66,0.12)', pointerEvents: 'none' }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '2.75rem', marginBottom: '1rem' }}>🚁</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.65rem', fontFamily: 'Poppins, sans-serif' }}>
                  Agricultura de precisión
                </h3>
                <p style={{ opacity: 0.85, lineHeight: '1.7', marginBottom: '1.75rem', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif' }}>
                  Drones de última generación con GPS RTK, sensores multiespectrales y sistemas de pulverización de alta precisión.
                </p>
                {[
                  'Capacidad: 10-30 litros por vuelo',
                  'Cobertura: 5-15 ha/hora',
                  'GPS RTK centimétrico',
                  'Dosificación variable automatizada',
                  'Operación con luz diurna',
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.845rem', marginBottom: '0.65rem' }}
                  >
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#7CB342', flexShrink: 0 }} />
                    <span style={{ opacity: 0.9, fontFamily: 'Inter, sans-serif' }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Location badge below card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{
                marginTop: '1.25rem',
                background: 'white',
                borderRadius: '14px',
                padding: '1.1rem 1.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
                border: '1px solid #eee',
              }}
            >
              <div style={{ fontSize: '1.75rem' }}>📍</div>
              <div>
                <div style={{ fontWeight: '700', color: '#1B5E20', fontSize: '0.9rem', fontFamily: 'Poppins, sans-serif' }}>Con base en Castilla y León</div>
                <div style={{ color: '#888', fontSize: '0.78rem', marginTop: '0.1rem', fontFamily: 'Inter, sans-serif' }}>Nos desplazamos a toda la región con equipo propio</div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}
