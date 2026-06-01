import Link from 'next/link';
import { ReactNode } from 'react';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      {/* Simple header — just the logo, links back home */}
      <header className="legal-header">
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" aria-label="AeroCampo Iberia — inicio">
            <img src="/logo.webp" alt="AeroCampo Iberia" style={{ height: 48, width: 'auto', display: 'block' }} />
          </Link>
          <Link href="/" className="legal-back">← Volver al inicio</Link>
        </div>
      </header>

      <main className="legal">
        <div className="wrap legal-wrap">
          <h1 className="legal-title">{title}</h1>
          {updated && <p className="legal-updated">Última actualización: {updated}</p>}

          <div className="legal-disclaimer">
            <strong>Borrador.</strong> Los campos entre corchetes <code>[ … ]</code> están pendientes
            de completar. Conviene que un asesor legal revise el texto antes de su publicación
            definitiva.
          </div>

          <div className="legal-body">{children}</div>
        </div>
      </main>

      <Footer />
      <FloatingButtons />

      <style>{`
        .legal-header {
          border-bottom: 1px solid var(--border);
          padding: 16px 0;
          padding-top: max(16px, calc(16px + var(--safe-top, 0px)));
          background: var(--bg-alt);
        }
        .legal-back {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-mut);
          transition: color 0.2s;
        }
        @media (hover: hover) and (pointer: fine) {
          .legal-back:hover { color: var(--accent); }
        }

        .legal { background: var(--bg); padding: clamp(40px, 7vw, 72px) 0 clamp(48px, 8vw, 88px); }
        .legal-wrap { max-width: 820px; }

        .legal-title {
          font-family: var(--font-display);
          font-size: clamp(30px, 5vw, 46px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: var(--text);
        }
        .legal-updated {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-dim);
          margin-top: 10px;
        }

        .legal-disclaimer {
          margin: 28px 0;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1px solid color-mix(in oklch, var(--accent) 28%, transparent);
          background: color-mix(in oklch, var(--accent) 7%, transparent);
          font-size: 13.5px;
          line-height: 1.55;
          color: var(--text-mut);
        }
        .legal-disclaimer code {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--accent);
        }

        .legal-body { color: var(--text-mut); font-size: 15.5px; line-height: 1.7; }
        .legal-body h2 {
          font-family: var(--font-display);
          font-size: clamp(19px, 2.4vw, 23px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text);
          margin: 34px 0 12px;
        }
        .legal-body h3 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text);
          margin: 22px 0 8px;
        }
        .legal-body p { margin-bottom: 14px; }
        .legal-body ul { margin: 0 0 14px 0; padding-left: 22px; }
        .legal-body li { margin-bottom: 7px; }
        .legal-body strong { color: var(--text); font-weight: 600; }
        .legal-body a { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
        .legal-body .ph {
          color: var(--accent);
          font-family: var(--font-mono);
          font-size: 13.5px;
        }
        .legal-body table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 16px;
          font-size: 14px;
        }
        .legal-body td {
          padding: 9px 12px;
          border: 1px solid var(--border);
          vertical-align: top;
        }
        .legal-body td:first-child { color: var(--text); font-weight: 600; width: 38%; }
      `}</style>
    </>
  );
}
