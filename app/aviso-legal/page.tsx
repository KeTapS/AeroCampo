import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Aviso Legal · AeroCampo Iberia',
  description: 'Aviso legal y condiciones de uso del sitio web de AeroCampo Iberia.',
  robots: { index: false, follow: true },   // draft content — don't index until real data is in
};

const PH = ({ children }: { children: string }) => <span className="ph">[{children}]</span>;

export default function AvisoLegalPage() {
  return (
    <LegalPage title="Aviso Legal" updated="mayo de 2026">
      <h2>1. Datos identificativos</h2>
      <p>
        En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de
        Comercio Electrónico (LSSI-CE), se informa de los datos identificativos del titular de
        este sitio web:
      </p>
      <table>
        <tbody>
          <tr><td>Titular</td><td>AEROCAMPO IBERIA, S.L.</td></tr>
          <tr><td>NIF / CIF</td><td>B88737929</td></tr>
          <tr><td>Domicilio</td><td>Carretera de Cuéllar, nº 12, 40297 Sanchonuño, Segovia</td></tr>
          <tr><td>Nombre comercial</td><td>AeroCampo Iberia</td></tr>
          <tr><td>Correo electrónico</td><td>aerocampoiberia@gmail.com</td></tr>
          <tr><td>Teléfono</td><td>+34 615 325 317</td></tr>
          <tr><td>Sitio web</td><td>https://aerocampo.es</td></tr>
          <tr><td>Datos registrales</td><td><PH>Pendiente de inscripción en el Registro Mercantil</PH></td></tr>
        </tbody>
      </table>

      <h2>2. Objeto</h2>
      <p>
        El presente aviso legal regula el uso del sitio web <strong>aerocampo.es</strong>, cuya
        finalidad es informar sobre los servicios de tratamientos agrícolas con drones que ofrece
        AeroCampo Iberia y facilitar el contacto con personas interesadas en dichos servicios.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El acceso y la navegación por este sitio atribuyen la condición de usuario e implican la
        aceptación de las condiciones recogidas en este aviso legal. El usuario se compromete a
        hacer un uso adecuado de los contenidos y a no emplearlos para actividades ilícitas o
        contrarias a la buena fe y al ordenamiento legal.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Todos los contenidos del sitio (textos, fotografías, gráficos, imágenes, logotipos,
        diseño y software) son titularidad del responsable o de terceros que han autorizado su
        uso. Queda prohibida su reproducción, distribución o transformación sin autorización
        expresa del titular.
      </p>

      <h2>5. Responsabilidad</h2>
      <p>
        El titular no se hace responsable de los daños que pudieran derivarse de un uso inadecuado
        del sitio ni de las interrupciones, errores u omisiones que pudieran existir en los
        contenidos. La información sobre rendimientos, dosis o capacidades de trabajo es orientativa
        y puede variar según el cultivo, el producto, el clima y las condiciones del terreno.
      </p>

      <h2>6. Enlaces externos</h2>
      <p>
        Este sitio puede contener enlaces a páginas de terceros. El titular no asume ninguna
        responsabilidad sobre el contenido o las políticas de dichos sitios externos.
      </p>

      <h2>7. Habilitación como operador de drones (AESA)</h2>
      <p>
        AeroCampo Iberia opera aeronaves no tripuladas conforme a la normativa europea y española
        bajo la supervisión de la Agencia Estatal de Seguridad Aérea (AESA).
      </p>
      <ul>
        <li>Número de operador UAS: <PH>ESP·xxxxxxxxxxxx</PH></li>
        <li>Escenario / habilitación: <PH>p. ej. STS-ES o categoría específica</PH></li>
        <li>Pilotos con certificado de competencia en vigor.</li>
      </ul>
      <p>
        Más información en la web oficial de AESA:{' '}
        <a href="https://www.seguridadaerea.gob.es" target="_blank" rel="noopener noreferrer">
          seguridadaerea.gob.es
        </a>.
      </p>

      <h2>8. Legislación aplicable y jurisdicción</h2>
      <p>
        Este aviso legal se rige por la legislación española. Para la resolución de cualquier
        controversia, las partes se someten a los juzgados y tribunales de Segovia, salvo que la
        normativa aplicable disponga otro fuero.
      </p>
    </LegalPage>
  );
}
