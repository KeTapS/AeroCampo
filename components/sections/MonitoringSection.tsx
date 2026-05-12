'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import FadeIn from '@/components/ui/FadeIn';
import CountUp from '@/components/ui/CountUp';

const SPECS = [
  { icon: '📡', label: 'Sensor multiespectral',  val: '5 bandas'   },
  { icon: '🗺️', label: 'Resolución de mapa',     val: '3 cm/px'    },
  { icon: '⚡', label: 'Área por vuelo',          val: '50+ ha'     },
  { icon: '📊', label: 'Índice NDVI en tiempo real', val: 'Live'    },
];

const INSIGHTS = [
  { color: '#e74c3c', label: 'Estrés hídrico severo'  },
  { color: '#e67e22', label: 'Estrés moderado'        },
  { color: '#f1c40f', label: 'Desarrollo normal'      },
  { color: '#2ecc71', label: 'Óptimo'                 },
  { color: '#1B5E20', label: 'Exceso de humedad'      },
];

export default function MonitoringSection() {
  return (
    <section id="monitorizacion" style={{ padding: '7rem 1.5rem', background: '#0d1117', overflow: 'hidden', position: 'relative' }}>

      {/* Background glow */}
      <div style={{ position: 'absolute', top: '-200px', left: '-200px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,172,193,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,179,66,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <FadeIn style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ display: 'inline-block', background: 'rgba(0,172,193,0.15)', border: '1px solid rgba(0,172,193,0.3)', color: '#4dd6e8', borderRadius: '50px', padding: '0.3rem 1rem', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', fontFamily: 'Poppins, sans-serif' }}>
            Tecnología avanzada
          </span>
          <h2 style={{ color: 'white', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: '800', letterSpacing: '-0.02em', fontFamily: 'Poppins, sans-serif', maxWidth: '640px', margin: '0 auto' }}>
            Monitorización de Cultivos
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)', lineHeight: 1.7, maxWidth: '520px', margin: '0.75rem auto 0', fontFamily: 'Inter, sans-serif' }}>
            Detectamos problemas antes de que sean visibles al ojo humano. Mapas de salud vegetal,
            estrés hídrico y análisis NDVI en tiempo real.
          </p>
        </FadeIn>

        {/* Main split */}
        <div className="mon-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '2.5rem', alignItems: 'center', marginBottom: '3rem' }}>

          {/* Left: drone image */}
          <FadeIn direction="left">
            <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 24px 72px rgba(0,172,193,0.2)' }}>
              <div style={{ position: 'relative', height: '400px' }}>
                <Image src="/images/dron-camara.png" alt="Dron con cámara multiespectral" fill style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="600px" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,172,193,0.15) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(0,172,193,0.2)', borderRadius: '20px' }} />
              </div>

              {/* Floating spec chips */}
              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {SPECS.map(spec => (
                  <div key={spec.label} style={{ background: 'rgba(13,17,23,0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0,172,193,0.3)', borderRadius: '8px', padding: '0.4rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.85rem' }}>{spec.icon}</span>
                    <div>
                      <div style={{ color: '#4dd6e8', fontSize: '0.68rem', fontFamily: 'Inter, sans-serif', lineHeight: 1 }}>{spec.label}</div>
                      <div style={{ color: 'white', fontSize: '0.78rem', fontWeight: '700', fontFamily: 'Poppins, sans-serif' }}>{spec.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right: heatmap + analysis */}
          <FadeIn direction="right" delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Heatmap image */}
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '240px', boxShadow: '0 16px 48px rgba(0,0,0,0.4)' }}>
                <Image src="/images/grafico.jpg" alt="Mapa NDVI de salud vegetal" fill style={{ objectFit: 'cover' }} sizes="600px" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(13,17,23,0.7))' }} />
                {/* Corner label */}
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'rgba(13,17,23,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(0,172,193,0.3)', borderRadius: '8px', padding: '0.35rem 0.75rem', color: '#4dd6e8', fontSize: '0.72rem', fontWeight: '600', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.05em' }}>
                  NDVI · Índice de vegetación
                </div>
                {/* Legend */}
                <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', right: '0.75rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {INSIGHTS.map(ins => (
                    <div key={ins.label} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: ins.color, flexShrink: 0 }} />
                      <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.62rem', fontFamily: 'Inter, sans-serif' }}>{ins.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {[
                  { to: 95, suffix: '%', label: 'Precisión detección' },
                  { to: 48, suffix: 'h', label: 'Informe listo en' },
                  { to: 3,  suffix: 'cm', label: 'Resolución mapa' },
                ].map((s, i) => (
                  <motion.div key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.3 + i * 0.1 }}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
                    <div style={{ color: '#4dd6e8', fontSize: '1.6rem', fontWeight: '800', fontFamily: 'Poppins, sans-serif' }}>
                      <CountUp to={s.to} suffix={s.suffix} duration={2} />
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', marginTop: '0.2rem', fontFamily: 'Inter, sans-serif' }}>{s.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Description */}
              <div style={{ background: 'rgba(0,172,193,0.08)', border: '1px solid rgba(0,172,193,0.2)', borderRadius: '12px', padding: '1.25rem' }}>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0, fontFamily: 'Inter, sans-serif' }}>
                  Combinamos imágenes multiespectrales con análisis de datos para generar mapas de
                  prescripción precisos. Identificamos zonas de estrés, enfermedades y carencias
                  nutricionales <strong style={{ color: 'white' }}>antes de que sean visibles al ojo humano</strong>.
                </p>
              </div>

              <motion.a href="#contacto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'rgba(0,172,193,0.18)', border: '1.5px solid rgba(0,172,193,0.4)', color: '#4dd6e8', borderRadius: '50px', padding: '0.875rem 1.75rem', fontSize: '0.95rem', fontWeight: '600', fontFamily: 'Poppins, sans-serif', textDecoration: 'none', transition: 'background 0.25s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,172,193,0.28)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,172,193,0.18)')}>
                📡 Solicitar análisis de cultivo →
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mon-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
