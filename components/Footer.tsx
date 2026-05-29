'use client';

const COLS = [
  ['Servicios', [
    ['Tratamientos', '#servicios'],
    ['Fertilización', '#servicios'],
    ['Vídeo aéreo', '#servicios'],
  ]],
  ['Empresa', [
    ['Nosotros', '#nosotros'],
    ['Cobertura', '#cobertura'],
    ['Contacto', '#contacto'],
  ]],
  ['Legal', [
    ['Aviso legal', '#'],
    ['Privacidad', '#'],
    ['AESA · STS-ES', '#'],
  ]],
] as const;

export default function Footer() {
  function scrollTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href === '#') return;          // legal links — no target yet
    e.preventDefault();
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <footer style={{ position: 'relative', zIndex: 5, padding: '36px 0 24px' }}>
      <div className="wrap">

        {/* Main row: logo + columns */}
        <div className="foot-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
          gap: 32,
          marginBottom: 28,
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <img
              src="/logo.webp"
              alt="AeroCampo Iberia"
              style={{ height: 56, width: 'auto', marginBottom: 10 }}
            />
            <p style={{ fontSize: 12.5, color: 'var(--text-dim)', lineHeight: 1.55 }}>
              Tratamientos agrícolas con drones DJI de precisión.<br />
              Operadora AESA · Cobertura nacional.
            </p>
          </div>

          {/* Link columns */}
          {COLS.map(([title, items]) => (
            <div key={title}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: 10 }}>
                {title.toUpperCase()}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                {items.map(([label, href]) => (
                  <li key={label}>
                    <a href={href}
                      onClick={(e) => scrollTo(e, href)}
                      style={{ fontSize: 13, color: 'var(--text-dim)', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-mut)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: 16, borderTop: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
        }}>
          <span className="mono" style={{ fontSize: 10.5, color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
            © 2026 AEROCAMPO IBERIA · TODOS LOS DERECHOS RESERVADOS
          </span>
          <span className="mono" style={{ fontSize: 10.5, color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
            COBERTURA NACIONAL · ESPAÑA
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .foot-grid { grid-template-columns: 1fr 1fr !important; }
        }

        /* ── Phone — center everything ───────────────────────── */
        @media (max-width: 640px) {
          .foot-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            text-align: center;
          }
          .foot-grid > div {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .foot-grid ul {
            align-items: center;
          }
          /* Bottom bar: stack and center copyright + location */
          footer .wrap > div:last-child {
            flex-direction: column;
            justify-content: center !important;
            align-items: center;
            text-align: center;
            gap: 6px !important;
          }
        }
      `}</style>
    </footer>
  );
}
