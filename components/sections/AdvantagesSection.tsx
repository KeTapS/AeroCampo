'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import FadeIn from '@/components/ui/FadeIn';
import CountUp from '@/components/ui/CountUp';

const ADVANTAGES = [
  { icon: '👣', title: 'No pisamos el cultivo',       desc: 'El dron vuela sobre la parcela sin contacto con el suelo, eliminando daños mecánicos en cualquier fase del cultivo.',                          img: null },
  { icon: '🌧️', title: 'Acceso en terrenos húmedos',  desc: 'Cuando la maquinaria no puede entrar por barro, el dron opera con normalidad. Sin esperas, sin oportunidades perdidas.',                       img: '/images/Terrenos_Húmedos.jpg' },
  { icon: '🎯', title: 'Mayor precisión',              desc: 'La pulverización electrostática genera gotas uniformes que penetran el dosel del cultivo con precisión milimétrica.',                          img: null },
  { icon: '💧', title: 'Menor gasto de producto',     desc: 'Los sensores de altura y la dosificación variable reducen el consumo de fitosanitarios hasta un 30 % frente a métodos convencionales.',        img: null },
  { icon: '⚡', title: 'Mayor rapidez',               desc: 'Tratamos entre 5 y 15 ha/h, reduciendo drásticamente los tiempos de intervención en los momentos críticos de la campaña.',                     img: null },
  { icon: '🌍', title: 'Sin compactación del suelo',  desc: 'Al no ejercer presión sobre el terreno se preserva la estructura del suelo, mejorando la infiltración del agua y la salud radicular.',         img: null },
];

const itemV = {
  hidden: { opacity: 0, x: 24 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.52, delay: i * 0.09, ease: 'easeOut' as const },
  }),
};

export default function AdvantagesSection() {
  return (
    <section id="ventajas" style={{ padding: '7rem 1.5rem', background: 'white', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="adv-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '4rem', alignItems: 'start' }}>

          {/* ── Left (sticky) ────────────────────────────── */}
          <FadeIn direction="left" style={{ position: 'sticky', top: '100px' }}>
            <span className="section-label">Ventajas del dron</span>
            <h2 className="section-heading" style={{ marginBottom: '1.5rem' }}>
              ¿Por qué elegir drones frente a maquinaria pesada?
            </h2>
            <p style={{ color: '#666', lineHeight: '1.75', marginBottom: '2rem', fontSize: '0.95rem', fontFamily: 'Inter, sans-serif' }}>
              La tecnología de drones agrícolas no es el futuro: es la solución presente para
              agricultores que buscan eficiencia, precisión y respeto por su tierra.
            </p>

            {/* Wet terrain image */}
            <div style={{ position: 'relative', height: '200px', borderRadius: '14px', overflow: 'hidden', marginBottom: '1.75rem', boxShadow: '0 8px 32px rgba(0,0,0,0.14)' }}>
              <Image src="/images/Terrenos_Húmedos.jpg" alt="Terrenos húmedos donde la maquinaria no puede entrar" fill style={{ objectFit: 'cover' }} sizes="500px" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem' }}>
                <div style={{ color: 'white', fontWeight: '700', fontSize: '0.9rem', fontFamily: 'Poppins, sans-serif' }}>Terrenos húmedos</div>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.78rem', fontFamily: 'Inter, sans-serif' }}>La maquinaria no puede entrar. El dron, sí.</div>
              </div>
            </div>

            {/* KPI pills */}
            <div style={{ background: 'linear-gradient(135deg, #f8fdf8, white)', border: '1px solid #e0ede0', borderRadius: '14px', padding: '1.5rem', marginBottom: '1.75rem' }}>
              {[
                { label: 'Reducción de producto fitosanitario', to: 30, suffix: '%' },
                { label: 'Cobertura por hora de vuelo',         to: 12, suffix: ' ha/h' },
                { label: 'Compactación del suelo',              to: 0,  suffix: '%' },
              ].map(kpi => (
                <div key={kpi.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.55rem 0', borderBottom: '1px solid #eee' }}>
                  <span style={{ color: '#555', fontSize: '0.82rem', fontFamily: 'Inter, sans-serif' }}>{kpi.label}</span>
                  <span style={{ color: '#1B5E20', fontWeight: '800', fontSize: '1.1rem', fontFamily: 'Poppins, sans-serif' }}>
                    <CountUp to={kpi.to} suffix={kpi.suffix} duration={2.2} />
                  </span>
                </div>
              ))}
            </div>

            <a href="#contacto" className="btn-primary" style={{ display: 'inline-flex' }}>
              Solicitar demostración
            </a>
          </FadeIn>

          {/* ── Right list ───────────────────────────────── */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {ADVANTAGES.map((adv, i) => (
              <motion.div key={adv.title} custom={i} variants={itemV}
                whileHover={{ x: 6, borderColor: '#7CB342', boxShadow: '0 6px 24px rgba(124,179,66,0.15)' }}
                style={{ display: 'flex', gap: '1rem', padding: '1.2rem', borderRadius: '12px', border: '1px solid #f0f0f0', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.04)', transition: 'border-color 0.3s, box-shadow 0.3s', cursor: 'default', willChange: 'transform' }}>

                {/* Image or icon */}
                {adv.img ? (
                  <div style={{ flexShrink: 0, width: '56px', height: '56px', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
                    <Image src={adv.img} alt={adv.title} fill style={{ objectFit: 'cover' }} sizes="56px" />
                  </div>
                ) : (
                  <div style={{ flexShrink: 0, width: '46px', height: '46px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(27,94,32,0.08), rgba(124,179,66,0.14))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                    {adv.icon}
                  </div>
                )}

                <div>
                  <h3 style={{ margin: '0 0 0.28rem', fontSize: '0.94rem', fontWeight: '700', color: '#1B5E20', fontFamily: 'Poppins, sans-serif' }}>
                    {adv.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.835rem', color: '#666', lineHeight: '1.6', fontFamily: 'Inter, sans-serif' }}>
                    {adv.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .adv-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .adv-grid > *:first-child { position: static !important; }
        }
      `}</style>
    </section>
  );
}
