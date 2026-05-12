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

function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="20" y="20" width="8" height="8" rx="2" fill="var(--accent)" />
      <path d="M22 22L10 12M26 22L38 12M22 26L10 36M26 26L38 36"
        stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      {([[10,12],[38,12],[10,36],[38,36]] as [number,number][]).map(([x,y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="6" ry="1.2" fill="var(--accent-2)" opacity="0.85">
          <animate attributeName="transform" type="rotate"
            from={`0 ${x} ${y}`} to={`360 ${x} ${y}`}
            dur={`${0.15 + i * 0.02}s`} repeatCount="indefinite" />
        </ellipse>
      ))}
    </svg>
  );
}

export default function Header() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
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

        <a href="#inicio" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LogoMark size={32} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, letterSpacing: '-0.02em' }}>
              AeroCampo <span style={{ color: 'var(--accent)' }}>Iberia</span>
            </span>
            <span className="mono" style={{ fontSize: 9.5, color: 'var(--text-dim)', letterSpacing: '0.16em', marginTop: 2 }}>
              AGRI · DRONE · OPS
            </span>
          </div>
        </a>

        <nav className="nav-desktop" style={{ display: 'flex', gap: 28 }}>
          {NAV.map(([label, href]) => (
            <a key={href} href={href} style={{
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
          <a href="#contacto" className="btn btn-primary" style={{ fontSize: 13.5, padding: '11px 18px' }}>
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
            <a key={href} href={href} onClick={() => setOpen(false)}
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
