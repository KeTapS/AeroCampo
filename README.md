# AeroCampo Iberia — Sitio Web

Sitio web profesional para servicios de drones agrícolas en Castilla y León.

## Stack tecnológico

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **React Three Fiber** + **Drei** — escena 3D del dron animado
- **GSAP** — animaciones de entrada y scroll
- **Formspree** — formulario de contacto sin backend

## Inicio rápido

```bash
npm install
npm run dev
```

Abre http://localhost:3000

---

## Configuración necesaria antes del deploy

### 1. Modelo 3D del dron (obligatorio)

Coloca tu modelo en:
```
public/drone.glb
```

El modelo debe tener los propulsores nombrados `Propeller_1` a `Propeller_6`.
Usa `npx gltfjsx public/drone.glb` para inspeccionar nombres de nodos tras colocar el archivo.

**Fuentes gratuitas recomendadas:**
- Sketchfab (filtrar por downloadable + CC license)
- Free3D.com

### 2. Formulario de contacto (Formspree)

1. Crea cuenta gratuita en https://formspree.io
2. Crea un nuevo formulario y copia el Form ID (ej: `xyzabcde`)
3. Edita `components/sections/ContactSection.tsx` línea 8:
```ts
const FORMSPREE_ID = 'TU_FORM_ID_AQUI';
```

### 3. Número de teléfono real

Busca globalmente `+34600000000` y reemplaza con el número real en:
- `components/Header.tsx`
- `components/FloatingButtons.tsx`
- `components/Footer.tsx`
- `components/sections/ContactSection.tsx`
- `components/sections/HeroSection.tsx`

Y `34600000000` (formato sin +) en los mismos archivos para los links de WhatsApp.

### 4. Schema.org (SEO local)

En `app/layout.tsx`, actualiza el objeto `schemaOrg` con la dirección real y el teléfono.

---

## Estructura del proyecto

```
app/
  layout.tsx              # Layout raíz + metadatos SEO + Schema.org LocalBusiness
  page.tsx                # Página principal + detección de sección activa
  globals.css             # Variables CSS + estilos globales + utilidades

components/
  DroneScene.tsx          # Canvas 3D con dron (React Three Fiber) — solo cliente
  Header.tsx              # Navbar sticky con menú responsive
  Footer.tsx              # Pie de página con enlaces
  FloatingButtons.tsx     # Botones flotantes WhatsApp + Teléfono (fijos)
  sections/
    HeroSection.tsx       # Sección inicial con headline + CTAs + stats
    ServicesSection.tsx   # 4 tarjetas de servicios
    AdvantagesSection.tsx # 6 ventajas vs maquinaria pesada
    CoverageSection.tsx   # Mapa de cobertura por provincias CyL
    AboutSection.tsx      # Quiénes somos + valores de empresa
    TrustSection.tsx      # Certificaciones, seguros y documentación
    ContactSection.tsx    # Formulario Formspree + CTAs de contacto

public/
  drone.glb               # ← Coloca aquí tu modelo 3D
```

---

## Comportamiento del dron 3D

| Estado | Descripción |
|--------|-------------|
| **Entrada** | Vuela desde lejos hacia cámara (2.5s, easeOutCubic) |
| **Idle** | Propulsores girando + bobbing en Y ±0.15u + tilt en Z ±2° |
| **Por sección** | Se reposiciona suavemente al cambiar de sección visible |

Para personalizar posiciones, edita `SECTION_POSITIONS` en `components/DroneScene.tsx`.

---

## Deploy

```bash
npm run build   # Verificar compilación
# Conecta el repo a Vercel, Netlify o similar
```

---

## Paleta de colores

| Variable | Hex | Uso |
|----------|-----|-----|
| `--primary` | `#1B5E20` | Verde oscuro — color principal |
| `--secondary` | `#7CB342` | Verde lima — acentos y CTAs |
| `--accent` | `#00ACC1` | Azul agua — detalles |

Definidas en `app/globals.css`.
