'use client';

import { useState, useEffect } from 'react';

const TEL = 'tel:+34600000000';

const NAV = [
  ['Servicios', '#servicios'],
  ['Ventajas',  '#ventajas'],
  ['Cobertura', '#cobertura'],
  ['Nosotros',  '#nosotros'],
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
    const update = () => {
      // Stay transparent while the cinematic Hero is on screen.
      // Switch to the glass background only when we've scrolled past it.
      const hero = document.getElementById('inicio');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setScrolled(rect.bottom <= 80);
      } else {
        setScrolled(root.scrollTop > 30);
      }
    };
    update();
    root.addEventListener('scroll', update, { passive: true });
    return () => root.removeEventListener('scroll', update);
  }, []);

  // Close mobile menu on ESC + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      data-scrolled={scrolled}
      data-open={open}
      className="site-header"
    >
      <div className="wrap site-header__inner">
        <a href="#inicio" className="site-header__brand" aria-label="AeroCampo Iberia — inicio">
          <img src="/logo.webp" alt="AeroCampo Iberia" />
        </a>

        <nav className="nav-desktop" aria-label="Navegación principal">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} onClick={(e) => scrollTo(e, href)} className="nav-link">
              {label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <a
            href="#contacto"
            onClick={(e) => scrollTo(e, '#contacto')}
            className="btn btn-primary site-header__cta"
          >
            Presupuesto
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="menu-toggle"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              {open
                ? <><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>
                : <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav aria-label="Navegación móvil">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} onClick={(e) => scrollTo(e, href)} className="mobile-menu__link">
              {label}
            </a>
          ))}
        </nav>
        <a href={TEL} className="mobile-menu__tel">+34 600 000 000</a>
      </div>

      <style>{`
        .site-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          padding: 20px 0;
          padding-top: max(20px, calc(20px + var(--safe-top, 0px)));
          transition: all 0.3s ease;
          background: transparent;
          border-bottom: 1px solid transparent;
        }
        .site-header[data-scrolled="true"] {
          padding: 12px 0;
          padding-top: max(12px, calc(12px + var(--safe-top, 0px)));
          background: color-mix(in oklch, var(--bg) 45%, transparent);
          border-bottom-color: color-mix(in oklch, var(--border) 60%, transparent);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
        }
        /* When mobile menu is open, give it solid bg for legibility */
        .site-header[data-open="true"] {
          background: var(--bg);
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }

        .site-header__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .site-header__brand {
          display: flex; align-items: center;
          flex-shrink: 0;
        }
        .site-header__brand img {
          height: 56px;
          width: auto;
        }

        .nav-desktop {
          display: flex;
          gap: 28px;
        }
        .nav-link {
          font-size: 13.5px;
          color: var(--text-mut);
          font-family: var(--font-display);
          font-weight: 500;
          transition: color 0.2s;
          padding: 8px 0;          /* bigger tap target */
        }
        @media (hover: hover) and (pointer: fine) {
          .nav-link:hover { color: var(--text); }
        }

        .site-header__actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .site-header__cta {
          font-size: 13.5px;
          padding: 11px 18px;
          min-height: 42px;
        }

        .menu-toggle {
          display: none;
          width: 44px; height: 44px;
          border-radius: 999px;
          border: 1px solid var(--border-2);
          color: var(--text);
          align-items: center;
          justify-content: center;
          touch-action: manipulation;
        }

        /* Mobile menu drawer */
        .mobile-menu {
          margin-top: 12px;
          padding: 12px clamp(16px, 4vw, 28px) calc(28px + var(--safe-bottom, 0px));
          padding-left:  max(clamp(16px, 4vw, 28px), var(--safe-left, 0px));
          padding-right: max(clamp(16px, 4vw, 28px), var(--safe-right, 0px));
          background: var(--bg-alt);
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .mobile-menu nav {
          display: flex; flex-direction: column;
        }
        .mobile-menu__link {
          display: block;
          padding: 14px 6px;
          font-size: 17px;
          color: var(--text);
          font-family: var(--font-display);
          font-weight: 600;
          border-bottom: 1px solid var(--border);
        }
        .mobile-menu__link:last-of-type { border-bottom: 0; }
        .mobile-menu__tel {
          margin-top: 12px;
          padding: 12px 6px 4px;
          font-size: 14px;
          color: var(--text-mut);
          font-family: var(--font-mono);
        }

        /* ── Tablet / Phone ── */
        @media (max-width: 880px) {
          .nav-desktop { display: none; }
          .menu-toggle { display: inline-flex; }
        }
        @media (max-width: 640px) {
          .site-header { padding: 14px 0; }
          .site-header[data-scrolled="true"] { padding: 10px 0; }
          .site-header__brand img { height: 44px; }
          .site-header__cta { font-size: 13px; padding: 10px 14px; min-height: 40px; }
        }
        @media (max-width: 380px) {
          .site-header__brand img { height: 38px; }
          .site-header__cta { padding: 9px 12px; }
          .site-header__cta svg { display: none; }   /* save space on tiny */
        }
      `}</style>
    </header>
  );
}
