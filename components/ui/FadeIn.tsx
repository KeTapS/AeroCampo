'use client';

import { useRef, useState, useEffect, ReactNode, CSSProperties } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export default function FadeIn({ children, delay = 0, className, style }: FadeInProps) {
  const ref  = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && (setSeen(true), io.disconnect()));
      },
      { threshold: 0.12 },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-up${seen ? ' is-in' : ''}${className ? ` ${className}` : ''}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
