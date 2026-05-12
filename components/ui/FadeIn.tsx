'use client';

import { motion } from 'framer-motion';
import { ReactNode, CSSProperties } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  style?: CSSProperties;
  once?: boolean;
  amount?: number | 'some' | 'all';
}

const dirMap = {
  up:    { y: 32, x: 0 },
  down:  { y: -32, x: 0 },
  left:  { y: 0, x: 32 },
  right: { y: 0, x: -32 },
  none:  { y: 0, x: 0 },
};

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.65,
  direction = 'up',
  className,
  style,
  once = true,
  amount = 0.2,
}: FadeInProps) {
  const { x, y } = dirMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
