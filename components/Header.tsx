'use client';

import { useState, useEffect } from 'react';

const TEL = 'tel:+34600000000';

const NAV = [
  ['Servicios',      '#servicios'],
  ['Ventajas',       '#ventajas'],
  ['Monitorización', '#monitorizacion'],
  ['Cobertura',      '#cobertura'],
  ['Nosotros',       '#nosotros'],
] as const;

export default function Header() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  function scrollTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  }

  useEffect(() => {
    const root = document.getElementById('scroll-root');
    if (!root) return;
    const f = () => setScrolled(root.scrollTop > 30);
    f();
    root.addEventListener('scroll', f, { passive: true });
    return () => root.removeEventListener('scroll', f);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: scrolled ? '12px 0' : '20px 0',
      background: scrolled ? 'color-mix(in oklch, var(--bg) 78%, transparent)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

        <a href="#inicio" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.svg" alt="AeroCampo Iberia" style={{ height: 40, width: 'auto' }} />
        </a>

        <nav className="nav-desktop" style={{ display: 'flex', gap: 28 }}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href} onClick={(e) => scrollTo(e, href)} style={{
              fontSize: 13.5, color: 'var(--text-mut)',
              fontFamily: 'var(--font-display)', fontWeight: 500,
              transition: 'color 0.2s',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-mut)')}>
              {label}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a href="#contacto" onClick={(e) => scrollTo(e, '#contacto')} className="btn btn-primary" style={{ fontSize: 13.5, padding: '11px 18px' }}>
            Presupuesto
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <button onClick={() => setOpen((o) => !o)} className="menu-toggle" aria-label="Menú"
            style={{
              display: 'none', background: 'transparent',
              border: '1px solid var(--border-2)', borderRadius: 999,
              width: 44, height: 44, cursor: 'pointer',
              alignItems: 'center', justifyContent: 'center', color: 'var(--text)',
            }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open
                ? <><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>
                : <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div style={{
          marginTop: 12, padding: '20px 28px 28px',
          background: 'var(--bg-alt)', borderTop: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href} onClick={(e) => scrollTo(e, href)}
              style={{ fontSize: 18, color: 'var(--text)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              {label}
            </a>
          ))}
          <a href={TEL} style={{ fontSize: 14, color: 'var(--text-mut)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
            +34 600 000 000
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 880px) {
          .nav-desktop { display: none !important; }
          .menu-toggle { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
