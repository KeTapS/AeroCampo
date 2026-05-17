'use client';

const WA  = 'https://wa.me/34600000000?text=Hola%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20vuestros%20servicios.';
const TEL = 'tel:+34600000000';

export default function FloatingButtons() {
  return (
    <div className="floating-fab">
      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="floating-fab__btn floating-fab__btn--wa"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </a>
      <a
        href={TEL}
        aria-label="Llámanos"
        className="floating-fab__btn floating-fab__btn--tel"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>

      <style>{`
        .floating-fab {
          position: fixed;
          z-index: 40;
          bottom: calc(24px + var(--safe-bottom, 0px));
          right:  calc(24px + var(--safe-right, 0px));
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;                 /* container ignores clicks */
        }
        .floating-fab__btn {
          pointer-events: auto;                  /* but the buttons receive them */
          width: 52px; height: 52px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s ease, box-shadow 0.25s;
          touch-action: manipulation;
        }
        .floating-fab__btn--wa {
          background: #25D366;
          color: white;
          box-shadow: 0 12px 32px -8px rgba(37,211,102,0.5);
        }
        .floating-fab__btn--tel {
          background: var(--accent);
          color: #0a1408;
          box-shadow: 0 12px 32px -8px color-mix(in oklch, var(--accent) 60%, transparent);
        }
        @media (hover: hover) and (pointer: fine) {
          .floating-fab__btn:hover { transform: translateY(-2px); }
        }
        .floating-fab__btn:active { transform: translateY(0); }

        @media (max-width: 640px) {
          .floating-fab {
            bottom: calc(16px + var(--safe-bottom, 0px));
            right:  calc(16px + var(--safe-right, 0px));
            gap: 8px;
          }
          .floating-fab__btn { width: 48px; height: 48px; }
        }
      `}</style>
    </div>
  );
}
