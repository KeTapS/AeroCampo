'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const PHONE = '+34600000000';
const WHATSAPP = '34600000000';
const WA_MSG = encodeURIComponent('Hola, me gustaría solicitar información sobre vuestros servicios de drones agrícolas.');

const NAV = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#ventajas',  label: 'Ventajas'  },
  { href: '#cobertura', label: 'Cobertura' },
  { href: '#nosotros',  label: 'Nosotros'  },
  { href: '#contacto',  label: 'Contacto'  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [visible,  setVisible]  = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setVisible(y < lastY || y < 80);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      animate={{ y: visible ? 0 : -90, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(10,30,12,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
        padding: '0 1.5rem',
        transition: 'background 0.4s, border-color 0.4s',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>

        {/* Logo */}
        <a href="#inicio" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden',
            position: 'relative', flexShrink: 0,
            border: '2px solid rgba(124,179,66,0.5)',
            boxShadow: '0 4px 16px rgba(124,179,66,0.3)',
          }}>
            <Image src="/images/logo.jpeg" alt="AeroCampo Iberia" fill style={{ objectFit: 'cover' }} sizes="40px" />
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: '700', fontSize: '1rem', fontFamily: 'Poppins, sans-serif', lineHeight: 1.1 }}>AeroCampo</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.62rem', fontFamily: 'Inter, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Iberia · Drones Agrícolas</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: '0.1rem' }} className="hdr-desktop">
          {NAV.map(link => (
            <a key={link.href} href={link.href}
              style={{ color: 'rgba(255,255,255,0.82)', textDecoration: 'none', padding: '0.45rem 0.85rem', borderRadius: '8px', fontSize: '0.86rem', fontWeight: '500', fontFamily: 'Poppins, sans-serif', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#7CB342')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.82)')}
            >{link.label}</a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }} className="hdr-desktop">
          <motion.a href={`tel:${PHONE}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', padding: '0.45rem 0.9rem', borderRadius: '8px', fontSize: '0.8rem', fontFamily: 'Poppins, sans-serif', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.3rem', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#7CB342')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}>
            📞 Llamar
          </motion.a>
          <motion.a href={`https://wa.me/${WHATSAPP}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            style={{ background: '#25D366', color: 'white', padding: '0.45rem 1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '600', fontFamily: 'Poppins, sans-serif', textDecoration: 'none' }}>
            💬 WhatsApp
          </motion.a>
          <motion.a href="#contacto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            style={{ background: '#7CB342', color: 'white', padding: '0.45rem 1.1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '600', fontFamily: 'Poppins, sans-serif', textDecoration: 'none' }}>
            Presupuesto
          </motion.a>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(o => !o)} aria-label="Menú" className="hdr-mobile"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {[0,1,2].map(i => (
            <motion.span key={i}
              animate={menuOpen ? (i===0 ? {rotate:45,y:7} : i===1 ? {opacity:0} : {rotate:-45,y:-7}) : {rotate:0,y:0,opacity:1}}
              style={{ display:'block', width:'22px', height:'2px', background:'white', borderRadius:'2px' }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div key="mob"
            initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            style={{ overflow:'hidden', background:'rgba(8,24,10,0.98)', borderTop:'1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ padding: '0.75rem 1.5rem 1.5rem' }}>
              {NAV.map((link,i) => (
                <motion.a key={link.href} href={link.href}
                  initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ delay: i*0.05 }}
                  onClick={() => setMenuOpen(false)}
                  style={{ display:'block', color:'white', textDecoration:'none', padding:'0.7rem 0', fontSize:'1rem', fontWeight:'500', fontFamily:'Poppins, sans-serif', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                  {link.label}
                </motion.a>
              ))}
              <div style={{ display:'flex', gap:'0.75rem', marginTop:'1rem' }}>
                <a href={`tel:${PHONE}`} style={{ flex:1, background:'rgba(255,255,255,0.1)', color:'white', textDecoration:'none', padding:'0.75rem', borderRadius:'8px', textAlign:'center', fontFamily:'Poppins, sans-serif', fontSize:'0.9rem', fontWeight:'600' }}>📞 Llamar</a>
                <a href={`https://wa.me/${WHATSAPP}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" style={{ flex:1, background:'#25D366', color:'white', textDecoration:'none', padding:'0.75rem', borderRadius:'8px', textAlign:'center', fontFamily:'Poppins, sans-serif', fontSize:'0.9rem', fontWeight:'600' }}>💬 WhatsApp</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) { .hdr-desktop { display: none !important; } }
        @media (min-width: 861px) { .hdr-mobile  { display: none !important; } }
      `}</style>
    </motion.header>
  );
}
