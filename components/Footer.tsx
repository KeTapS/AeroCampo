const PHONE = '+34600000000';
const WHATSAPP_NUMBER = '34600000000';
const WHATSAPP_MSG = encodeURIComponent('Hola, me gustaría solicitar información sobre vuestros servicios de drones agrícolas.');

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: '#0d2e10',
      color: 'rgba(255,255,255,0.8)',
      padding: '3rem 1.5rem 1.5rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7CB342, #00ACC1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '1rem',
                color: 'white',
              }}>AC</div>
              <span style={{ color: 'white', fontWeight: '700', fontSize: '1.05rem' }}>AeroCampo Iberia</span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.7', margin: '0 0 1rem' }}>
              Especialistas en agricultura de precisión con drones. Servicio profesional, cercano y adaptado al agricultor.
            </p>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', margin: 0 }}>
              Castilla y León, España
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 style={{ color: '#7CB342', fontSize: '0.95rem', fontWeight: '600', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Servicios
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                'Tratamientos fitosanitarios',
                'Fertilización de precisión',
                'Monitorización de cultivos',
                'Fotografía y vídeo aéreo',
              ].map(s => (
                <li key={s}>
                  <a href="#servicios" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#7CB342')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                  >{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coverage */}
          <div>
            <h3 style={{ color: '#7CB342', fontSize: '0.95rem', fontWeight: '600', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Zona de cobertura
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Segovia', 'Valladolid', 'Castilla y León', 'Consultar otras provincias'].map(z => (
                <li key={z} style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>{z}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ color: '#7CB342', fontSize: '0.95rem', fontWeight: '600', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Contacto
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href={`tel:${PHONE}`} style={{
                color: 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                📞 {PHONE}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#25D366',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                💬 WhatsApp
              </a>
              <a href="#contacto" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.9rem' }}>
                ✉️ Formulario de contacto
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.45)',
        }}>
          <span>© {year} AeroCampo Iberia. Todos los derechos reservados.</span>
          <span>Modelo 3D drone: <a href="https://sketchfab.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'underline' }}>Sketchfab</a> — CC Attribution</span>
        </div>
      </div>
    </footer>
  );
}
