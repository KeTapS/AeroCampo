'use client';

import { useRef, useEffect, Suspense, Component, ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// ── Section-based landing poses ──────────────────────────────────────
const SECTION_POSES = {
  hero:        { x:  5.1, y: -2.35, rx:  0.05, ry: Math.PI + 0.1, rz: -0.1 },
  services:    { x: -2.6, y: -0.6, rx:  0.05, ry: Math.PI + 0.85, rz:  0.04 },
  advantages:  { x:  2.6, y: -0.2, rx:  0.04, ry: Math.PI + 0.10, rz: -0.04 },
  monitoring:  { x: -1.4, y: -0.3, rx: -0.10, ry: Math.PI + 1.10, rz:  0.02 },
  coverage:    { x:  2.4, y:  0.1, rx:  0.02, ry: Math.PI + 0.20, rz: -0.02 },
  about:       { x: -2.4, y: -0.4, rx:  0.05, ry: Math.PI + 0.95, rz:  0.05 },
  contact:     { x:  3.0, y: -1.6, rx:  0.10, ry: Math.PI + 0.30, rz:  0.00 },
} as const;
type SectionName = keyof typeof SECTION_POSES;

// ── Cinematic entry A → B → hero ─────────────────────────────────────
const ENTRY_A = { x: 7,   y: 4,   z: -8, rx: -0.40, ry: Math.PI + 0.70, rz:  0.25, s: 0.18 };
const ENTRY_B = { x: 1.8, y: 0.6, z: -1, rx: -0.05, ry: Math.PI + 0.55, rz: -0.05, s: 0.50 };
const FINAL_SCALE = 0.48;
const ENTRY_MS    = 3400;

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function easeInOutQuad(t: number) { return t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2, 2)/2; }
function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

type PropInfo = { mesh: THREE.Mesh; axis: 'x' | 'y' | 'z' };

// ── Error boundary ────────────────────────────────────────────────────
class ModelErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

// ── Camera initializer ────────────────────────────────────────────────
function CameraInit() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0.8, 7);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

// ── Drone mesh ────────────────────────────────────────────────────────
function DroneModel({
  activeSectionRef,
  wrapperRef,
}: {
  activeSectionRef: React.MutableRefObject<SectionName>;
  wrapperRef:       React.RefObject<HTMLDivElement | null>;
}) {
  const groupRef  = useRef<THREE.Group>(null);
  const propRefs  = useRef<PropInfo[]>([]);
  const { scene } = useGLTF('/drone.glb');

  const curr = useRef({
    x: ENTRY_A.x, y: ENTRY_A.y,
    rx: ENTRY_A.rx, ry: ENTRY_A.ry, rz: ENTRY_A.rz,
  });
  const entryStartRef = useRef(0);
  const entryDone     = useRef(false);
  const idleT         = useRef(0);

  useEffect(() => {
    if (!scene) return;
    propRefs.current = [];

    scene.traverse((obj) => {
      if (/^(Cube(\.\d+)?|Plane(\.\d+)?|Ground|Floor|Background|Box)/i.test(obj.name)) {
        obj.visible = false;
        return;
      }
      const asMesh = obj as THREE.Mesh;
      if (asMesh.isMesh) {
        const mat = asMesh.material as THREE.MeshStandardMaterial;
        if (mat && 'envMapIntensity' in mat) mat.envMapIntensity = 0.85;
      }
      if (/Propeller/i.test(obj.name) && (obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        // Re-centre the geometry so the spin pivot is at the propeller's
        // own centre (not the drone body origin, which is the default pivot)
        const geo = mesh.geometry.clone();
        geo.computeBoundingBox();
        const bb = geo.boundingBox!;
        const center = new THREE.Vector3();
        bb.getCenter(center);
        geo.translate(-center.x, -center.y, -center.z);
        mesh.geometry = geo;
        // Shift the mesh position to compensate so it stays in place
        mesh.position.add(center);
        // Spin axis = smallest bounding-box extent (perpendicular to the disc)
        const size = new THREE.Vector3();
        bb.getSize(size);
        let axis: 'x' | 'y' | 'z' = 'y';
        if (size.x <= size.y && size.x <= size.z) axis = 'x';
        else if (size.z <= size.x && size.z <= size.y) axis = 'z';
        propRefs.current.push({ mesh, axis });
      }
    });

    entryStartRef.current = performance.now();
  }, [scene]);

  useFrame(() => {
    if (!groupRef.current) return;

    // Propellers spin around the axis perpendicular to their disc
    for (const { mesh, axis } of propRefs.current) {
      mesh.rotation[axis] += 0.55;
    }

    const now = performance.now();

    // ── Entry phase ───────────────────────────────────────────────────
    if (!entryDone.current) {
      const t = Math.min(1, (now - entryStartRef.current) / ENTRY_MS);

      let tx: number, ty: number, tz: number,
          trx: number, try_: number, trz: number, ts: number;

      if (t < 0.55) {
        const p = easeInOutQuad(t / 0.55);
        tx   = lerp(ENTRY_A.x,  ENTRY_B.x,  p);
        ty   = lerp(ENTRY_A.y,  ENTRY_B.y,  p);
        tz   = lerp(ENTRY_A.z,  ENTRY_B.z,  p);
        trx  = lerp(ENTRY_A.rx, ENTRY_B.rx, p);
        try_ = lerp(ENTRY_A.ry, ENTRY_B.ry, p);
        trz  = lerp(ENTRY_A.rz, ENTRY_B.rz, p);
        ts   = lerp(ENTRY_A.s,  ENTRY_B.s,  p);
        if (wrapperRef.current) wrapperRef.current.style.zIndex = '1';
      } else {
        const hero = SECTION_POSES.hero;
        const p    = easeOutCubic((t - 0.55) / 0.45);
        tx   = lerp(ENTRY_B.x,  hero.x,  p);
        ty   = lerp(ENTRY_B.y,  hero.y,  p);
        tz   = lerp(ENTRY_B.z,  0,       p);
        trx  = lerp(ENTRY_B.rx, hero.rx, p);
        try_ = lerp(ENTRY_B.ry, hero.ry, p);
        trz  = lerp(ENTRY_B.rz, hero.rz, p);
        ts   = lerp(ENTRY_B.s,  FINAL_SCALE, p);
        if (wrapperRef.current) wrapperRef.current.style.zIndex = '3';
      }

      groupRef.current.position.set(tx, ty, tz);
      groupRef.current.rotation.set(trx, try_, trz);
      groupRef.current.scale.setScalar(ts);

      if (t >= 1) {
        entryDone.current = true;
        const hero = SECTION_POSES.hero;
        Object.assign(curr.current, { x: hero.x, y: hero.y,
                                       rx: hero.rx, ry: hero.ry, rz: hero.rz });
      }
      return;
    }

    // ── Idle phase: lerp + organic oscillations ───────────────────────
    idleT.current += 1 / 60;

    const tgt = SECTION_POSES[activeSectionRef.current] ?? SECTION_POSES.hero;
    const k   = 0.045;
    curr.current.x  += (tgt.x  - curr.current.x)  * k;
    curr.current.y  += (tgt.y  - curr.current.y)  * k;
    curr.current.rx += (tgt.rx - curr.current.rx) * k;
    curr.current.ry += (tgt.ry - curr.current.ry) * k;
    curr.current.rz += (tgt.rz - curr.current.rz) * k;

    const bob   = Math.sin(idleT.current * Math.PI * 0.8)       * 0.10;
    const sway  = Math.sin(idleT.current * Math.PI * 0.5 + 1.0) * 0.05;
    const pitch = Math.sin(idleT.current * Math.PI * 1.2 + 2.5) * 0.025;

    groupRef.current.scale.setScalar(FINAL_SCALE);
    groupRef.current.position.set(curr.current.x + sway, curr.current.y + bob, 0);
    groupRef.current.rotation.set(
      curr.current.rx + pitch,
      curr.current.ry,
      curr.current.rz + sway * 0.6,
    );
  });

  return (
    <group
      ref={groupRef}
      position={[ENTRY_A.x, ENTRY_A.y, ENTRY_A.z]}
      rotation={[ENTRY_A.rx, ENTRY_A.ry, ENTRY_A.rz]}
      scale={ENTRY_A.s}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/drone.glb');

// ── Scene root ────────────────────────────────────────────────────────
export default function DroneScene() {
  const wrapperRef       = useRef<HTMLDivElement>(null);
  const activeSectionRef = useRef<SectionName>('hero');

  // Section IntersectionObserver
  useEffect(() => {
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const name = e.target.getAttribute('data-drone-target');
          if (!name) continue;
          ratios.set(name, e.isIntersecting ? e.intersectionRatio : 0);
        }
        let best: string | null = null;
        let bestRatio = -1;
        ratios.forEach((ratio, name) => {
          if (ratio > bestRatio) { best = name; bestRatio = ratio; }
        });
        if (best && best in SECTION_POSES) {
          activeSectionRef.current = best as SectionName;
        }
      },
      { threshold: [0, 0.15, 0.35, 0.55, 0.75], rootMargin: '-20% 0px -30% 0px' },
    );

    const id = setTimeout(() => {
      document.querySelectorAll('[data-drone-target]').forEach((el) => observer.observe(el));
    }, 400);

    return () => { clearTimeout(id); observer.disconnect(); };
  }, []);

  // Fade near footer
  useEffect(() => {
    const onScroll = () => {
      if (!wrapperRef.current) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p   = max > 0 ? window.scrollY / max : 0;
      wrapperRef.current.style.opacity =
        p > 0.85 ? String(Math.max(0, 1 - (p - 0.85) / 0.10)) : '1';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div id="drone-canvas" ref={wrapperRef} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
        style={{ background: 'transparent' }}
      >
        <CameraInit />
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 8, 6]}   intensity={1.30} color="#eaffea" />
        <directionalLight position={[-5, 3, -4]}  intensity={0.55} color="#7dd35b" />
        <directionalLight position={[-3, -2, 5]}  intensity={0.75} color="#4dd4e1" />
        <Suspense fallback={null}>
          <ModelErrorBoundary>
            <DroneModel activeSectionRef={activeSectionRef} wrapperRef={wrapperRef} />
          </ModelErrorBoundary>
        </Suspense>
      </Canvas>
    </div>
  );
}
