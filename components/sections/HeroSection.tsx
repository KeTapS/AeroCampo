'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import WordReveal from '@/components/ui/WordReveal';
import CountUp from '@/components/ui/CountUp';

const PHONE    = '+34600000000';
const WHATSAPP = '34600000000';
const WA_MSG   = encodeURIComponent('Hola, me gustaría solicitar información sobre vuestros servicios de drones agrícolas.');

const STATS = [
  { to: 10,  suffix: 'x',  label: 'Más rápido'      },
  { to: 30,  suffix: '%',  label: 'Menos producto'   },
  { to: 100, suffix: '%',  label: 'Certificado AESA' },
];

export default function HeroSection() {
  return (
    <section id="inicio" style={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      padding: '8rem 1.5rem 5rem',
    }}>
      {/* ─── Background ──────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image src="/images/Hero.jpg" alt="" fill priority quality={92}
          style={{ objectFit: 'cover', objectPosition: 'center' }} />
        <motion.div initial={{ scale: 1.07 }} animate={{ scale: 1 }}
          transition={{ duration: 9, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0 }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(4,16,6,0.78) 0%, rgba(10,32,13,0.55) 50%, rgba(4,16,6,0.88) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }} />
      </div>

      {/* ─── Layout: texto izquierda (centrado) | dron derecha ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 3 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '2rem' }}>

          {/* ── Columna izquierda: todo centrado dentro del 50% ── */}
          <div style={{ textAlign: 'center' }}>

            {/* Cert badge */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(124,179,66,0.14)', border: '1px solid rgba(124,179,66,0.36)', borderRadius: '50px', padding: '0.38rem 1.1rem', color: '#a5d46a', fontSize: '0.8rem', fontWeight: '500', backdropFilter: 'blur(10px)', marginBottom: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7CB342', display: 'inline-block' }} />
              Pilotos certificados AESA · Castilla y León
            </motion.div>

            {/*
              H1: dos líneas sin bloques anidados.
              Cada WordReveal ya es display:block → exactamente 2 bloques,
              sin el <span display:block> extra que causaba el hueco triple.
              lineHeight ajustado a 1.05 para que queden compactos.
            */}
            <h1 style={{
              color: 'white',
              fontSize: 'clamp(2rem, 4.8vw, 3.6rem)',
              fontWeight: '900',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              marginBottom: '1.25rem',
              fontFamily: 'Poppins, sans-serif',
            }}>
              {/* Línea 1: texto blanco */}
              <WordReveal text="Tratamientos agrícolas" delay={0.45} stagger={0.09} />
              {/* Línea 2: gradient — aplicado al span que envuelve WordReveal,
                  no a un span inline dentro de WordReveal (eso causaba el bloque extra) */}
              <span className="gradient-text" style={{ display: 'block' }}>
                <WordReveal text="con drones de precisión" delay={0.72} stagger={0.08} />
              </span>
            </h1>

            {/* Subline */}
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ color: 'rgba(255,255,255,0.78)', fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', lineHeight: 1.65, maxWidth: '460px', margin: '0 auto 2.5rem', fontFamily: 'Inter, sans-serif' }}>
              Soluciones tecnológicas para el agricultor moderno en Segovia, Valladolid y Castilla y León.
              Más eficiencia, menos coste, sin pisar el cultivo.
            </motion.p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
              {[
                { label: '📋 Pedir presupuesto', href: '#contacto',                               cls: 'btn-secondary', ext: false },
                { label: '📞 Llamar',            href: `tel:${PHONE}`,                            cls: 'btn-outline',   ext: false },
                { label: '💬 WhatsApp',          href: `https://wa.me/${WHATSAPP}?text=${WA_MSG}`, cls: 'btn-whatsapp',  ext: true  },
              ].map((cta, i) => (
                <motion.a key={cta.label} href={cta.href}
                  target={cta.ext ? '_blank' : undefined}
                  rel={cta.ext ? 'noopener noreferrer' : undefined}
                  className={cta.cls}
                  initial={{ opacity: 0, scale: 0.9, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 1.35 + i * 0.1, ease: 'easeOut' }}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  style={{ fontSize: '0.95rem', padding: '0.9rem 1.5rem' }}>
                  {cta.label}
                </motion.a>
              ))}
            </div>

            {/* Stats strip */}
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.75, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(14px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              {STATS.map((s, i) => (
                <div key={s.label} style={{ textAlign: 'center', padding: '1rem 1.4rem', borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                  <div style={{ color: '#7CB342', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800', lineHeight: 1, fontFamily: 'Poppins, sans-serif' }}>
                    <CountUp to={s.to} suffix={s.suffix} duration={2.2} />
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.68rem', marginTop: '0.2rem', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>

          </div>

          {/* ── Columna derecha: vacía, el Canvas fixed del dron flota aquí ── */}
          <div className="hero-right" style={{ minHeight: '420px' }} />

        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid  { grid-template-columns: 1fr !important; }
          .hero-right { display: none !important; }
        }
      `}</style>
    </section>
  );
}
