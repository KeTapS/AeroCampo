'use client';

function LogoMark({ size = 28 }: { size?: number }) {
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

const COLS = [
  ['Servicios', ['Fitosanitarios', 'Fertilización', 'Monitorización', 'Vídeo aéreo']],
  ['Empresa',   ['Nosotros', 'Cobertura', 'Contacto']],
  ['Legal',     ['Aviso legal', 'Privacidad', 'Cookies', 'AESA · STS-ES']],
] as const;

export default function Footer() {
  return (
    <footer style={{ position: 'relative', zIndex: 5 }}>
      <div className="wrap">
        <div className="foot-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 36 }}>

          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <LogoMark size={28} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 }}>
                AeroCampo <span style={{ color: 'var(--accent)' }}>Iberia</span>
              </span>
            </div>
            <p style={{ marginTop: 14, fontSize: 13.5, color: 'var(--text-mut)', maxWidth: 320, lineHeight: 1.6 }}>
              Tratamientos agrícolas con drones de precisión en Castilla y León.
              Operadora AESA registrada.
            </p>
          </div>

          {/* Link columns */}
          {COLS.map(([title, items]) => (
            <div key={title}>
              <div className="mono" style={{ fontSize: 10.5, color: 'var(--accent)', letterSpacing: '0.16em', marginBottom: 14 }}>
                {title.toUpperCase()}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" style={{ fontSize: 13.5, color: 'var(--text-mut)', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-mut)')}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 56, paddingTop: 20, borderTop: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}>
          <span className="mono" style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
            © 2026 AEROCAMPO IBERIA · TODOS LOS DERECHOS RESERVADOS
          </span>
          <span className="mono" style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
            CASTILLA Y LEÓN · ESPAÑA
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) { .foot-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 520px) { .foot-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
