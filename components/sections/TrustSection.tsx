'use client';

import { motion } from 'framer-motion';
import FadeIn from '@/components/ui/FadeIn';

const badges = [
  { icon: '✈️', title: 'Pilotos certificados',         description: 'Titulación oficial según normativa EASA. Formación continua y actualizada.',               color: '#1B5E20' },
  { icon: '📋', title: 'Operador autorizado AESA',     description: 'Empresa inscrita como operador de drones ante la Agencia Estatal de Seguridad Aérea.',     color: '#2E7D32' },
  { icon: '🛡️', title: 'Seguros vigentes',             description: 'Cobertura de responsabilidad civil específica para operaciones agrícolas con drones.',      color: '#7CB342' },
  { icon: '🎓', title: 'Formación especializada',      description: 'Certificación en aplicación de tratamientos fitosanitarios y manejo de productos agrícolas.', color: '#00ACC1' },
];

const badgeVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.11, ease: 'easeOut' as const },
  }),
};

export default function TrustSection() {
  return (
    <section id="confianza" style={{ padding: '7rem 1.5rem', background: 'white', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <FadeIn style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-label">Confianza y seguridad</span>
          <h2 className="section-heading" style={{ maxWidth: '580px', margin: '0 auto' }}>
            Trabajamos con todas<br />las garantías legales
          </h2>
          <p className="section-subheading" style={{ maxWidth: '500px', margin: '0.75rem auto 0' }}>
            Tu tranquilidad es nuestra prioridad. Toda nuestra documentación está en regla y disponible bajo solicitud.
          </p>
        </FadeIn>

        {/* Badges */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}
        >
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              custom={i}
              variants={badgeVariants}
              whileHover={{ y: -6, boxShadow: `0 20px 48px ${badge.color}22`, borderColor: badge.color }}
              style={{
                background: '#FAFAFA',
                border: '1.5px solid #eee',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'box-shadow 0.3s, border-color 0.3s',
                willChange: 'transform',
              }}
            >
              {/* Icon ring */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{
                  width: '68px', height: '68px', borderRadius: '50%',
                  background: `${badge.color}18`,
                  border: `2px solid ${badge.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.9rem', margin: '0 auto 1.25rem',
                }}
              >
                {badge.icon}
              </motion.div>

              <h3 style={{ color: '#1a1a1a', fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.55rem', fontFamily: 'Poppins, sans-serif' }}>
                {badge.title}
              </h3>
              <p style={{ color: '#777', fontSize: '0.84rem', lineHeight: '1.6', margin: 0, fontFamily: 'Inter, sans-serif' }}>
                {badge.description}
              </p>

              {/* Checkmark badge */}
              <div style={{
                position: 'absolute', top: '1rem', right: '1rem',
                width: '22px', height: '22px', borderRadius: '50%',
                background: badge.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: '0.65rem', fontWeight: '700',
              }}>✓</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Documentation note */}
        <FadeIn>
          <div style={{
            background: 'linear-gradient(135deg, rgba(27,94,32,0.05), rgba(0,172,193,0.05))',
            border: '1px solid rgba(27,94,32,0.12)',
            borderRadius: '16px',
            padding: '1.75rem 2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}>
            <div style={{ fontSize: '2.25rem' }}>📁</div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <h3 style={{ color: '#1B5E20', fontWeight: '700', fontSize: '1rem', marginBottom: '0.35rem', fontFamily: 'Poppins, sans-serif' }}>
                Documentación disponible bajo solicitud
              </h3>
              <p style={{ color: '#666', fontSize: '0.875rem', margin: 0, lineHeight: '1.6', fontFamily: 'Inter, sans-serif' }}>
                Certificados de piloto, seguro de RC, autorización AESA y certificaciones de productos — todo disponible si lo necesitas.
              </p>
            </div>
            <motion.a
              href="#contacto"
              className="btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ flexShrink: 0 }}
            >
              Solicitar documentación
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
