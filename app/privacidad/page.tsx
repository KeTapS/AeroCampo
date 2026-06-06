import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad y tratamiento de datos personales de AeroCampo Iberia.',
  robots: { index: false, follow: true },   // draft content — don't index until real data is in
};

const PH = ({ children }: { children: string }) => <span className="ph">[{children}]</span>;

export default function PrivacidadPage() {
  return (
    <LegalPage title="Política de Privacidad" updated="mayo de 2026">
      <p>
        En AeroCampo Iberia tratamos la información que nos facilitas con el fin de atender tu
        solicitud. Conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018
        (LOPDGDD), te informamos de lo siguiente:
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <table>
        <tbody>
          <tr><td>Responsable</td><td>AEROCAMPO IBERIA, S.L.</td></tr>
          <tr><td>NIF / CIF</td><td>B88737929</td></tr>
          <tr><td>Domicilio</td><td>Carretera de Cuéllar, nº 12, 40297 Sanchonuño, Segovia</td></tr>
          <tr><td>Correo electrónico</td><td>aerocampoiberia@gmail.com</td></tr>
          <tr><td>Teléfono</td><td>+34 615 325 317</td></tr>
        </tbody>
      </table>

      <h2>2. ¿Qué datos recogemos?</h2>
      <p>A través del formulario de contacto de la web podemos recoger:</p>
      <ul>
        <li>Nombre.</li>
        <li>Teléfono.</li>
        <li>Correo electrónico.</li>
        <li>Información sobre tu parcela o cultivo y el mensaje que nos envíes.</li>
      </ul>
      <p>Solo tratamos los datos que nos facilitas voluntariamente al rellenar el formulario.</p>

      <h2>3. ¿Con qué finalidad?</h2>
      <p>
        Utilizamos tus datos para responder a tu consulta, elaborar un presupuesto y mantener el
        contacto comercial derivado de tu solicitud. No se utilizan para elaborar perfiles ni para
        tomar decisiones automatizadas.
      </p>

      <h2>4. Legitimación</h2>
      <p>
        La base jurídica del tratamiento es tu <strong>consentimiento</strong>, otorgado al enviar
        el formulario, así como la aplicación de medidas precontractuales a petición tuya.
      </p>

      <h2>5. ¿Durante cuánto tiempo conservamos los datos?</h2>
      <p>
        Conservaremos tus datos mientras dure la relación comercial o hasta que solicites su
        supresión, y posteriormente durante los plazos legalmente exigibles.
      </p>

      <h2>6. ¿A quién se comunican tus datos?</h2>
      <p>
        No se ceden datos a terceros, salvo obligación legal. Los datos pueden ser tratados por
        proveedores tecnológicos que prestan servicios de alojamiento y envío de correo
        (por ejemplo, Cloudflare, Inc.), que actúan como encargados del tratamiento conforme al RGPD.
      </p>

      <h2>7. Tus derechos</h2>
      <p>Como interesado, tienes derecho a:</p>
      <ul>
        <li>Acceder a tus datos personales.</li>
        <li>Solicitar la rectificación de datos inexactos.</li>
        <li>Solicitar su supresión.</li>
        <li>Solicitar la limitación de su tratamiento.</li>
        <li>Oponerte al tratamiento.</li>
        <li>Solicitar la portabilidad de tus datos.</li>
        <li>Retirar el consentimiento prestado en cualquier momento.</li>
      </ul>

      <h2>8. ¿Cómo ejercer tus derechos?</h2>
      <p>
        Puedes ejercer estos derechos escribiendo a{' '}
        <a href="mailto:aerocampoiberia@gmail.com">aerocampoiberia@gmail.com</a>, indicando el
        derecho que deseas ejercer y adjuntando una copia de tu documento de identidad.
      </p>

      <h2>9. Reclamaciones</h2>
      <p>
        Si consideras que el tratamiento de tus datos no se ajusta a la normativa, puedes presentar
        una reclamación ante la Agencia Española de Protección de Datos (AEPD),{' '}
        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>.
      </p>
    </LegalPage>
  );
}
