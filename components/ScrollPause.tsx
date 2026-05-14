'use client';

/**
 * SectionPager – snap por secciones tipo DJI / fullpage.js
 *
 *  • Cada gesto de scroll (rueda, trackpad, teclado, touch) avanza UNA sección.
 *  • Durante la animación se bloquea todo input (no se puede acumular gestos).
 *  • Smooth-scroll de ~900ms con easing nativo del navegador + cooldown extra.
 *  • Si el usuario hace clic en un ancla, se respeta y se actualiza el índice.
 */

import { useEffect } from 'react';

const ANIM_MS         = 900;   // duración del scroll programático
const COOLDOWN_MS     = 250;   // bloqueo extra tras la animación
const WHEEL_THRESHOLD = 12;    // ignora micro-gestos del trackpad
const TOUCH_THRESHOLD = 40;    // px de swipe necesarios para cambiar de sección

export default function ScrollPause() {
  useEffect(() => {
    const root = document.getElementById('scroll-root');
    if (!root) return;

    let sections: HTMLElement[] = [];
    let tops:     number[]      = [];
    let index = 0;
    let busy  = false;

    /* ---------- helpers ---------- */
    function refresh() {
      sections = Array.from(root!.querySelectorAll('section')) as HTMLElement[];
      const rootTop = root!.getBoundingClientRect().top;
      tops = sections.map(
        (s) => s.getBoundingClientRect().top - rootTop + root!.scrollTop
      );
    }

    function currentIndex(): number {
      const st = root!.scrollTop;
      let nearest = 0;
      let minDist = Infinity;
      tops.forEach((t, i) => {
        const d = Math.abs(t - st);
        if (d < minDist) { minDist = d; nearest = i; }
      });
      return nearest;
    }

    function go(target: number) {
      refresh();
      if (busy) return;
      target = Math.max(0, Math.min(sections.length - 1, target));
      if (target === index && Math.abs(root!.scrollTop - tops[target]) < 4) return;

      busy = true;
      index = target;
      root!.scrollTo({ top: tops[target], behavior: 'smooth' });

      setTimeout(() => { busy = false; }, ANIM_MS + COOLDOWN_MS);
    }

    /* ---------- wheel ---------- */
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      if (busy) return;
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;
      go(index + (e.deltaY > 0 ? 1 : -1));
    }

    /* ---------- keyboard ---------- */
    function onKey(e: KeyboardEvent) {
      const target = (e.target as HTMLElement)?.tagName;
      if (target === 'INPUT' || target === 'TEXTAREA') return;

      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault(); go(index + 1);
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault(); go(index - 1);
      } else if (e.key === 'Home') {
        e.preventDefault(); go(0);
      } else if (e.key === 'End') {
        e.preventDefault(); go(sections.length - 1);
      }
    }

    /* ---------- touch ---------- */
    let touchStartY = 0;
    function onTouchStart(e: TouchEvent) { touchStartY = e.touches[0].clientY; }
    function onTouchMove(e: TouchEvent)  { if (busy) e.preventDefault(); }
    function onTouchEnd(e: TouchEvent) {
      if (busy) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < TOUCH_THRESHOLD) return;
      go(index + (dy > 0 ? 1 : -1));
    }

    /* ---------- anchor links (#servicios, etc.) ---------- */
    function onAnchorClick(e: MouseEvent) {
      const a = (e.target as HTMLElement).closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      e.preventDefault();
      refresh();
      const i = sections.indexOf(el as HTMLElement);
      if (i >= 0) go(i);
    }

    /* ---------- init ---------- */
    refresh();
    index = currentIndex();

    root.addEventListener('wheel',      onWheel,      { passive: false });
    root.addEventListener('touchstart', onTouchStart, { passive: true  });
    root.addEventListener('touchmove',  onTouchMove,  { passive: false });
    root.addEventListener('touchend',   onTouchEnd,   { passive: true  });
    window.addEventListener('keydown',  onKey);
    document.addEventListener('click',  onAnchorClick);
    window.addEventListener('resize',   refresh);

    return () => {
      root.removeEventListener('wheel',      onWheel);
      root.removeEventListener('touchstart', onTouchStart);
      root.removeEventListener('touchmove',  onTouchMove);
      root.removeEventListener('touchend',   onTouchEnd);
      window.removeEventListener('keydown',  onKey);
      document.removeEventListener('click',  onAnchorClick);
      window.removeEventListener('resize',   refresh);
    };
  }, []);

  return null;
}
