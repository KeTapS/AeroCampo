'use client';

import { RefObject, useEffect, useRef, useState } from 'react';

/**
 * Returns a value 0..1 representing how far the user has scrolled THROUGH
 * the given element (its top hitting viewport top → its bottom hitting
 * viewport bottom). Used by sticky-scroll storytelling sections (Hero,
 * Services, Advantages).
 *
 * Reads scroll from the `#scroll-root` element which contains the whole app
 * (the main scroll container in this layout).
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = document.getElementById('scroll-root');
    const el = ref.current;
    if (!root || !el) return;

    let raf = 0;
    const update = () => {
      const rect  = el.getBoundingClientRect();
      const vh    = window.innerHeight;
      const total = rect.height - vh;
      const p     = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;
      setProgress(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    root.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      root.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(raf);
    };
  }, [ref]);

  return progress;
}

/**
 * Same as `useScrollProgress` but interpolates the value toward the
 * raw scroll position every frame via a lerp. Smooths out the discrete
 * jumps from mouse-wheel scroll so scroll-driven animations look fluid
 * even when the user is barely turning the wheel.
 *
 *  smoothing: lerp factor per frame (0..1). Lower = silkier but more
 *             "trailing" feel. 0.08 is a good default for 60fps.
 */
export function useSmoothScrollProgress(
  ref: RefObject<HTMLElement | null>,
  smoothing = 0.08,
) {
  const raw = useScrollProgress(ref);
  const [progress, setProgress] = useState(0);

  const rafRef    = useRef<number | null>(null);
  const curRef    = useRef(0);
  const targetRef = useRef(0);

  // Keep target in sync with raw scroll — no animation side-effects.
  useEffect(() => { targetRef.current = raw; }, [raw]);

  // Single persistent rAF loop that interpolates current → target.
  // Survives target changes (no cancel/restart per tick = no gaps).
  useEffect(() => {
    const tick = () => {
      const diff = targetRef.current - curRef.current;
      if (Math.abs(diff) >= 0.0003) {
        curRef.current += diff * smoothing;
        setProgress(curRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [smoothing]);

  return progress;
}

/** Clamps `(p - start) / (end - start)` to [0, 1]. */
export function phase(p: number, start: number, end: number) {
  return Math.max(0, Math.min(1, (p - start) / (end - start)));
}

/** Cubic ease-out: `1 - (1 - t)^3`. */
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Trapezoidal opacity envelope:
 *   0 → fadeIn → full → fadeOut → end
 *
 * Returns a number in [0..1]:
 *   - 0   while p < fadeIn
 *   - 0→1 from fadeIn to full
 *   - 1   from full to fadeOut
 *   - 1→0 from fadeOut to end
 *   - 0   when p >= end
 */
export function trap(p: number, fadeIn: number, full: number, fadeOut: number, end: number) {
  if (p < fadeIn)  return 0;
  if (p < full)    return easeOut((p - fadeIn) / (full - fadeIn));
  if (p < fadeOut) return 1;
  if (p < end)     return 1 - easeOut((p - fadeOut) / (end - fadeOut));
  return 0;
}
