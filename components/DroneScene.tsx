'use client';

import { useRef, useEffect, Suspense, Component, ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// ── Base orientation (posición de reposo final) ──────────────────
const BASE_RX =  0.1;
const BASE_RY = Math.PI + 0.42;
const BASE_RZ = -0.1;
const FINAL_SCALE = 0.65;

// ── Scroll-linked keyframes ──────────────────────────────────────
// 8 sections: Hero · Services · Advantages · Monitoring · Coverage · About · Trust · Contact
const KF = [
  { t: 0,    x:  4,    y: -3.0, z: 0, rx: 0,    ry:  0.0, rz:  0.00 },
  { t: 0.13, x:  2.2,  y: -0.5, z: 0, rx: 0.04, ry: -0.4, rz:  0.03 },
  { t: 0.25, x: -2.2,  y: -1.0, z: 0, rx: 0.04, ry:  0.4, rz: -0.03 },
  { t: 0.38, x:  0,    y: -1.5, z: 0, rx: 0,    ry: -0.2, rz:  0.00 },
  { t: 0.50, x:  1.8,  y: -2.0, z: 0, rx: 0.03, ry: -0.3, rz:  0.02 },
  { t: 0.63, x: -1.5,  y: -2.4, z: 0, rx: 0.03, ry:  0.3, rz: -0.02 },
  { t: 0.76, x:  0,    y: -2.8, z: 0, rx: 0,    ry:  0.0, rz:  0.00 },
  { t: 0.88, x:  0.8,  y: -3.2, z: 0, rx: 0.02, ry: -0.2, rz:  0.01 },
] as const;

function smoothstep(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

function interpolateKF(progress: number) {
  const p = Math.max(0, Math.min(1, progress));
  let i = 0;
  while (i < KF.length - 2 && KF[i + 1].t <= p) i++;
  const a = KF[i], b = KF[i + 1];
  const span = b.t - a.t;
  const alpha = span === 0 ? 0 : smoothstep((p - a.t) / span);
  const lerp = (u: number, v: number) => u + (v - u) * alpha;
  return {
    x:  lerp(a.x,  b.x),  y:  lerp(a.y,  b.y),  z:  lerp(a.z,  b.z),
    rx: lerp(a.rx, b.rx), ry: lerp(a.ry, b.ry), rz: lerp(a.rz, b.rz),
  };
}

// ── Error boundary ───────────────────────────────────────────────
class ModelErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

// ── Propeller info ───────────────────────────────────────────────
type PropInfo = { mesh: THREE.Mesh; axis: 'x' | 'y' | 'z' };

// ── Drone mesh ───────────────────────────────────────────────────
function DroneModel({
  scrollProgress,
  wrapperRef,
}: {
  scrollProgress: React.MutableRefObject<number>;
  wrapperRef:     React.RefObject<HTMLDivElement | null>;
}) {
  const groupRef  = useRef<THREE.Group>(null);
  const propRefs  = useRef<PropInfo[]>([]);
  const { scene } = useGLTF('/drone.glb');

  // ── Valores que GSAP anima durante la entrada ────────────────
  // Punto 1: esquina superior-derecha fuera del viewport, dron pequeñito
  const entry = useRef({
    px: 15,  py: 8,  pz: -10,   // posición inicial
    sc: 0.15,                     // escala inicial (parece muy lejos)
    rx: BASE_RX - 0.5,            // inclinado hacia adelante (llegando)
    ry: BASE_RY + 0.3,            // orientado ligeramente de lado
    rz: 0.2,                      // pequeño cabeceo de vuelo
  });

  // ── Flags e idle ────────────────────────────────────────────
  const isIdle   = useRef(false);
  const idleTime = useRef(0);
  // Posición para el lerp de scroll (solo activa en idle)
  const curPos   = useRef(new THREE.Vector3(KF[0].x, KF[0].y, 0));

  useEffect(() => {
    if (!scene) return;
    propRefs.current = [];

    // ── Procesar hélices ─────────────────────────────────────
    const found: THREE.Mesh[] = [];
    scene.traverse((obj) => {
      if (/^(Cube(\.\d+)?|Plane(\.\d+)?|Ground|Floor|Background|Box)/i.test(obj.name)) {
        obj.visible = false;
        return;
      }
      if (/Propeller/i.test(obj.name) && (obj as THREE.Mesh).isMesh) {
        found.push(obj as THREE.Mesh);
      }
    });

    for (const mesh of found) {
      const geo = mesh.geometry.clone();
      geo.computeBoundingBox();
      if (!geo.boundingBox) { propRefs.current.push({ mesh, axis: 'y' }); continue; }

      const size   = new THREE.Vector3();
      const center = new THREE.Vector3();
      geo.boundingBox.getSize(size);
      geo.boundingBox.getCenter(center);

      // El eje más delgado es el eje de giro (disco = plano)
      let axis: 'x' | 'y' | 'z' = 'y';
      if (size.x <= size.y && size.x <= size.z) axis = 'x';
      else if (size.z <= size.x && size.z <= size.y) axis = 'z';

      geo.translate(-center.x, -center.y, -center.z);
      mesh.geometry = geo;
      mesh.position.add(center.clone().applyQuaternion(mesh.quaternion));
      propRefs.current.push({ mesh, axis });
    }

    // ── GSAP timeline: entrada cinematográfica (4 s total) ───
    const tl = gsap.timeline({ delay: 0.15 });

    // Fase 1 (0-2 s): esquina superior-derecha → detrás del texto
    // El canvas está en z-index 2, el texto del hero en z-index 3
    // → el dron pasa VISUALMENTE por detrás del headline
    tl.to(entry.current, {
      px: 3, py: -2, pz: -3,
      sc: 0.4,
      rx: BASE_RX - 0.12,
      ry: BASE_RY + 0.08,
      rz: -0.08,
      duration: 2,
      ease: 'power2.in',
      onComplete() {
        // El dron sale al primer plano: canvas pasa por delante del texto
        if (wrapperRef.current) wrapperRef.current.style.zIndex = '10';
      },
    });

    // Fase 2 (2-4 s): punto medio → posición de reposo final
    tl.to(entry.current, {
      px:  KF[0].x,
      py:  KF[0].y,
      pz:  0,
      sc:  FINAL_SCALE,
      rx:  BASE_RX,
      ry:  BASE_RY,
      rz:  BASE_RZ,
      duration: 2,
      ease: 'power2.out',
      onComplete() {
        // Sincronizar curPos para que el idle empiece exactamente aquí
        curPos.current.set(entry.current.px, entry.current.py, 0);
        isIdle.current = true;
      },
    });

    return () => { tl.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // ── Hélices: siempre girando, desde el primer frame ─────
    for (const { mesh, axis } of propRefs.current) {
      mesh.rotation[axis] += 0.5;
    }

    if (!isIdle.current) {
      // ── Fase de entrada: GSAP controla todo ─────────────────
      groupRef.current.position.set(entry.current.px, entry.current.py, entry.current.pz);
      groupRef.current.scale.setScalar(entry.current.sc);
      groupRef.current.rotation.set(entry.current.rx, entry.current.ry, entry.current.rz);
      return;
    }

    // ── Fase idle: flotación orgánica + movimiento por scroll ─
    idleTime.current += delta;

    // Tres oscilaciones con frecuencias y fases distintas → movimiento natural
    const bob    = Math.sin(idleTime.current * Math.PI)               * 0.15; // 0.5 Hz
    const rollZ  = Math.sin(idleTime.current * Math.PI * 0.6  + 1.2) * 0.05; // 0.3 Hz
    const pitchX = Math.sin(idleTime.current * Math.PI * 1.4  + 2.5) * 0.03; // 0.7 Hz

    const kf = interpolateKF(scrollProgress.current);

    curPos.current.x = THREE.MathUtils.lerp(curPos.current.x, kf.x, 0.045);
    curPos.current.y = THREE.MathUtils.lerp(curPos.current.y, kf.y, 0.045);

    groupRef.current.scale.setScalar(FINAL_SCALE);
    groupRef.current.position.set(curPos.current.x, curPos.current.y + bob, 0);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, BASE_RX + kf.rx + pitchX, 0.05,
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, BASE_RY + kf.ry, 0.05,
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z, BASE_RZ + kf.rz + rollZ, 0.05,
    );
  });

  // JSX inicializa el grupo en la posición de partida de la entrada
  // (coincide con entry.current) para evitar un frame en negro
  return (
    <group
      ref={groupRef}
      position={[entry.current.px, entry.current.py, entry.current.pz]}
      rotation={[entry.current.rx, entry.current.ry, entry.current.rz]}
      scale={entry.current.sc}
    >
      <primitive object={scene} />
    </group>
  );
}

// ── Camera ───────────────────────────────────────────────────────
function CameraSetup() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 1, 8);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

useGLTF.preload('/drone.glb');

// ── Scene root ───────────────────────────────────────────────────
export default function DroneScene() {
  const scrollProgress = useRef(0);
  const wrapperRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max      = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      scrollProgress.current = progress;

      // Fade out al acercarse a Contacto / Footer
      if (wrapperRef.current) {
        const opacity = progress > 0.80
          ? Math.max(0, 1 - (progress - 0.80) / 0.10)
          : 1;
        wrapperRef.current.style.opacity = String(opacity);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    // z-index inicial: 2 → detrás del texto del hero (z-index 3)
    // Cambia a 10 al completarse la fase 1 de la entrada (viene al primer plano)
    <div id="drone-canvas" ref={wrapperRef} aria-hidden="true"
      style={{ transition: 'opacity 0.35s ease' }}>
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}>
        <CameraSetup />
        <ambientLight intensity={0.9} />
        <directionalLight position={[ 5, 10,  5]} intensity={1.3} castShadow />
        <directionalLight position={[-5,  5, -5]} intensity={0.4} color="#00ACC1" />
        <directionalLight position={[ 0, -5,  5]} intensity={0.2} color="#7CB342" />
        <Suspense fallback={null}>
          <ModelErrorBoundary>
            <DroneModel scrollProgress={scrollProgress} wrapperRef={wrapperRef} />
          </ModelErrorBoundary>
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
}
