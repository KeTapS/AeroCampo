'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import FadeIn from '@/components/ui/FadeIn';

const SERVICES = [
  {
    img:   '/images/Fitosanitarios.jpg',
    icon:  '🌿',
    title: 'Tratamientos fitosanitarios',
    desc:  'Aplicación precisa de pesticidas, herbicidas y fungicidas con drones multirrotor. Cobertura homogénea, sin manchas y con mínima deriva.',
    color: '#1B5E20',
    grad:  'linear-gradient(135deg, #1B5E20, #2E7D32)',
    href:  '#contacto',
  },
  {
    img:   '/images/Fertilización.jpg',
    icon:  '🌱',
    title: 'Fertilización de precisión',
    desc:  'Distribución de fertilizantes líquidos y granulares adaptada a las necesidades de cada zona del cultivo mediante mapas de prescripción.',
    color: '#7CB342',
    grad:  'linear-gradient(135deg, #558B2F, #7CB342)',
    href:  '#contacto',
  },
  {
    img:   '/images/dron-camara.png',
    icon:  '📡',
    title: 'Monitorización de cultivos',
    desc:  'Captura de imágenes multiespectrales para detectar estrés hídrico, enfermedades y plagas antes de que sean visibles al ojo humano.',
    color: '#00ACC1',
    grad:  'linear-gradient(135deg, #00838F, #00ACC1)',
    href:  '#monitorizacion',
  },
  {
    img:   '/images/imagen-cinematografica.jpg',
    icon:  '📸',
    title: 'Fotografía y vídeo aéreo',
    desc:  'Documentación profesional de tu explotación: mapas ortofotogramétricos, seguimiento de campaña y reportajes agrícolas en 4K.',
    color: '#388E3C',
    grad:  'linear-gradient(135deg, #1B5E20, #43A047)',
    href:  '#contacto',
  },
];

const cardV = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' as const },
  }),
};

export default function ServicesSection() {
  return (
    <section id="servicios" style={{ padding: '7rem 1.5rem', background: '#F5F5F5', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <FadeIn style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-label">Nuestros servicios</span>
          <h2 className="section-heading" style={{ maxWidth: '520px', margin: '0 auto' }}>
            Soluciones completas para tu explotación
          </h2>
          <p className="section-subheading" style={{ maxWidth: '480px', margin: '0.75rem auto 0' }}>
            Tecnología de precisión para cada necesidad del agricultor moderno.
          </p>
        </FadeIn>

        {/* Cards */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {SERVICES.map((s, i) => (
            <motion.div key={s.title} custom={i} variants={cardV}
              whileHover={{ y: -8, boxShadow: `0 24px 56px rgba(0,0,0,0.14)` }}
              style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.06)', cursor: 'default', willChange: 'transform', transition: 'box-shadow 0.3s ease' }}>

              {/* Image */}
              <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                <Image src={s.img} alt={s.title} fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  sizes="(max-width: 768px) 100vw, 300px"
                  onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.06)')}
                  onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')} />
                {/* gradient bottom fade */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent)' }} />
                {/* accent top bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: s.grad }} />
                {/* icon chip */}
                <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', width: '38px', height: '38px', borderRadius: '10px', background: s.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: `0 4px 14px ${s.color}55` }}>
                  {s.icon}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
                <h3 style={{ color: '#1a1a1a', fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.6rem', fontFamily: 'Poppins, sans-serif' }}>
                  {s.title}
                </h3>
                <p style={{ color: '#666', fontSize: '0.86rem', lineHeight: '1.65', margin: '0 0 1.1rem', fontFamily: 'Inter, sans-serif' }}>
                  {s.desc}
                </p>
                <motion.a href={s.href} whileHover={{ x: 4 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: s.color, textDecoration: 'none', fontSize: '0.84rem', fontWeight: '600', fontFamily: 'Poppins, sans-serif' }}>
                  Más información →
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
