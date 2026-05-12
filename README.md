# AeroCampo Iberia — Sitio Web

Landing page profesional para empresa de tratamientos agrícolas con drones en Castilla y León.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **React Three Fiber** + **Drei** — escena 3D interactiva del dron
- **GSAP** — animación de entrada cinematográfica
- **Framer Motion** — animaciones de secciones
- **Formspree** — formulario de contacto sin backend

## Inicio rápido

```bash
npm install
npm run dev
```

Abre http://localhost:3000

---

## Configuración antes del deploy

### 1. Modelo 3D (`public/drone.glb`)

Coloca tu modelo GLB en `public/drone.glb`. Los propulsores deben tener `Propeller` en el nombre del nodo para que la animación de giro funcione automáticamente.

### 2. Formulario de contacto (Formspree)

1. Crea una cuenta gratuita en https://formspree.io
2. Crea un formulario y copia el ID (ej: `xyzabcde`)
3. Edita `components/sections/ContactSection.tsx`:

```ts
const FORMSPREE_ID = 'TU_FORM_ID_AQUI';
```

### 3. Teléfono real

Reemplaza `+34600000000` (y `34600000000` para WhatsApp) con el número real en:
- `components/Header.tsx`
- `components/FloatingButtons.tsx`
- `components/Footer.tsx`
- `components/sections/ContactSection.tsx`
- `components/sections/HeroSection.tsx`

### 4. SEO local

En `app/layout.tsx` actualiza el objeto `schemaOrg` con la dirección y teléfono reales.

---

## Estructura

```
app/
  layout.tsx          # Layout raíz + metadatos SEO + Schema.org
  page.tsx            # Página principal
  globals.css         # Variables CSS + estilos globales

components/
  DroneScene.tsx      # Canvas 3D (React Three Fiber) — solo cliente
  Header.tsx          # Navbar sticky responsive
  Footer.tsx          # Pie de página
  FloatingButtons.tsx # Botones flotantes WhatsApp + Teléfono
  sections/           # HeroSection · ServicesSection · AdvantagesSection
                      # MonitoringSection · CoverageSection · AboutSection
                      # TrustSection · ContactSection
  ui/                 # CountUp · FadeIn · WordReveal

public/
  drone.glb           # Modelo 3D (añadir manualmente)
  images/             # Imágenes del sitio
```

---

## Deploy

```bash
npm run build
```

Compatible con Vercel, Netlify o cualquier plataforma Node.js.

---

## Paleta

| Variable | Hex | Uso |
|---|---|---|
| `--primary` | `#1B5E20` | Verde oscuro |
| `--secondary` | `#7CB342` | Verde lima — CTAs |
| `--accent` | `#00ACC1` | Azul agua |
