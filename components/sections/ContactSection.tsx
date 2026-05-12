'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/ui/FadeIn';

const FORMSPREE_ID = 'xyzabcde';
const PHONE = '+34600000000';
const WHATSAPP_NUMBER = '34600000000';
const WHATSAPP_MSG = encodeURIComponent('Hola, me gustaría solicitar un presupuesto para tratamiento con drones en mi explotación.');

const SERVICES = [
  'Tratamientos fitosanitarios',
  'Fertilización de precisión',
  'Monitorización de cultivos',
  'Fotografía y vídeo aéreo',
  'Otro / Consulta general',
];

const inputBase: React.CSSProperties = {
  width: '100%',
  padding: '0.875rem 1rem',
  borderRadius: '10px',
  border: '1.5px solid #e0e0e0',
  fontSize: '0.925rem',
  color: '#1a1a1a',
  background: '#FAFAFA',
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
  transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontWeight: '600', fontSize: '0.8rem', color: '#444', marginBottom: '0.4rem', fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({ nombre: '', telefono: '', municipio: '', hectareas: '', servicio: '', mensaje: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const r = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(r.ok ? 'success' : 'error');
      if (r.ok) setForm({ nombre: '', telefono: '', municipio: '', hectareas: '', servicio: '', mensaje: '' });
    } catch { setStatus('error'); }
  };

  const focusStyle = { borderColor: '#7CB342', background: 'white', boxShadow: '0 0 0 3px rgba(124,179,66,0.12)' };

  return (
    <section id="contacto" style={{ padding: '7rem 1.5rem', background: '#F5F5F5' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <FadeIn style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-label">Contacto</span>
          <h2 className="section-heading" style={{ maxWidth: '560px', margin: '0 auto' }}>
            ¿Listo para transformar<br />tu explotación?
          </h2>
          <p className="section-subheading" style={{ maxWidth: '480px', margin: '0.75rem auto 0' }}>
            Cuéntanos qué necesitas y te preparamos un presupuesto sin compromiso en menos de 24 h.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.65fr', gap: '2.5rem', alignItems: 'start' }}
          className="contact-grid">

          {/* Left: quick contact */}
          <FadeIn direction="left" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* WhatsApp card */}
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(37,211,102,0.25)', borderColor: '#25D366', background: '#f0fff5' }}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                background: 'white', border: '2px solid #25D366',
                borderRadius: '14px', padding: '1.4rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" fill="white" width="26" height="26">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '0.95rem', fontFamily: 'Poppins, sans-serif' }}>Escribir por WhatsApp</div>
                <div style={{ color: '#666', fontSize: '0.8rem', marginTop: '0.15rem', fontFamily: 'Inter, sans-serif' }}>Respuesta rápida garantizada</div>
              </div>
            </motion.a>

            {/* Phone card */}
            <motion.a
              href={`tel:${PHONE}`}
              whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(27,94,32,0.2)', borderColor: '#1B5E20', background: '#f8fdf8' }}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                background: 'white', border: '2px solid #1B5E20',
                borderRadius: '14px', padding: '1.4rem',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#1B5E20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.4rem' }}>📞</div>
              <div>
                <div style={{ fontWeight: '700', color: '#1a1a1a', fontSize: '0.95rem', fontFamily: 'Poppins, sans-serif' }}>Llamar ahora</div>
                <div style={{ color: '#1B5E20', fontSize: '0.9rem', fontWeight: '600', marginTop: '0.15rem', fontFamily: 'Inter, sans-serif' }}>{PHONE}</div>
              </div>
            </motion.a>

            {/* Info box */}
            <div style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', borderRadius: '16px', padding: '1.75rem', color: 'white' }}>
              <h3 style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '1rem', fontFamily: 'Poppins, sans-serif' }}>¿Qué incluye el presupuesto?</h3>
              {['Análisis de tus necesidades', 'Estimación de costes por hectárea', 'Planificación de campaña', 'Sin compromiso de contratación'].map(item => (
                <div key={item} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.55rem', fontSize: '0.845rem', fontFamily: 'Inter, sans-serif' }}>
                  <span style={{ color: '#7CB342', fontWeight: '700' }}>✓</span>
                  <span style={{ opacity: 0.9 }}>{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Right: form */}
          <FadeIn direction="right" delay={0.1}>
            <div style={{ background: 'white', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 8px 48px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}>
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ textAlign: 'center', padding: '2.5rem 1rem' }}
                  >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }} style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</motion.div>
                    <h3 style={{ color: '#1B5E20', fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.75rem', fontFamily: 'Poppins, sans-serif' }}>¡Mensaje enviado!</h3>
                    <p style={{ color: '#666', lineHeight: '1.7', fontFamily: 'Inter, sans-serif', fontSize: '0.925rem' }}>
                      Hemos recibido tu solicitud. Nos pondremos en contacto a la mayor brevedad posible.
                    </p>
                    <button onClick={() => setStatus('idle')} className="btn-primary" style={{ marginTop: '1.5rem' }}>
                      Enviar otro mensaje
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h3 style={{ color: '#1B5E20', fontWeight: '700', fontSize: '1.15rem', marginBottom: '1.75rem', fontFamily: 'Poppins, sans-serif' }}>
                      Solicitar presupuesto gratuito
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }} className="form-row">
                      <Field label="Nombre *">
                        <input name="nombre" type="text" required value={form.nombre} onChange={handle} placeholder="Tu nombre" style={inputBase}
                          onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, { borderColor: '#e0e0e0', background: '#FAFAFA', boxShadow: 'none' })} />
                      </Field>
                      <Field label="Teléfono *">
                        <input name="telefono" type="tel" required value={form.telefono} onChange={handle} placeholder="600 000 000" style={inputBase}
                          onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, { borderColor: '#e0e0e0', background: '#FAFAFA', boxShadow: 'none' })} />
                      </Field>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }} className="form-row">
                      <Field label="Municipio">
                        <input name="municipio" type="text" value={form.municipio} onChange={handle} placeholder="Ej: Cuéllar, Segovia" style={inputBase}
                          onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, { borderColor: '#e0e0e0', background: '#FAFAFA', boxShadow: 'none' })} />
                      </Field>
                      <Field label="Hectáreas aprox.">
                        <input name="hectareas" type="text" value={form.hectareas} onChange={handle} placeholder="Ej: 25 ha" style={inputBase}
                          onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, { borderColor: '#e0e0e0', background: '#FAFAFA', boxShadow: 'none' })} />
                      </Field>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <Field label="Servicio requerido">
                        <select name="servicio" value={form.servicio} onChange={handle} style={{ ...inputBase, cursor: 'pointer' }}
                          onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, { borderColor: '#e0e0e0', background: '#FAFAFA', boxShadow: 'none' })}>
                          <option value="">Selecciona un servicio</option>
                          {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </Field>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <Field label="Información adicional">
                        <textarea name="mensaje" rows={3} value={form.mensaje} onChange={handle} placeholder="Tipo de cultivo, fecha estimada, detalles..." style={{ ...inputBase, resize: 'vertical', minHeight: '88px' }}
                          onFocus={e => Object.assign(e.target.style, focusStyle)} onBlur={e => Object.assign(e.target.style, { borderColor: '#e0e0e0', background: '#FAFAFA', boxShadow: 'none' })} />
                      </Field>
                    </div>

                    {status === 'error' && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#ffebee', border: '1px solid #ffcdd2', borderRadius: '8px', padding: '0.875rem', color: '#c62828', fontSize: '0.845rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                        Error al enviar. Contáctanos directamente por WhatsApp o teléfono.
                      </motion.div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn-secondary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', opacity: status === 'sending' ? 0.7 : 1 }}
                    >
                      {status === 'sending' ? '⏳ Enviando…' : '📋 Solicitar presupuesto gratuito'}
                    </motion.button>

                    <p style={{ color: '#bbb', fontSize: '0.75rem', textAlign: 'center', marginTop: '0.875rem', fontFamily: 'Inter, sans-serif' }}>
                      Sin compromiso · Respondemos en menos de 24 h
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
