'use client';

import { motion } from 'framer-motion';

interface WordRevealProps {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const container = (delay: number, stagger: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

const wordVariant = {
  hidden: { y: '105%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
};

export default function WordReveal({
  text,
  delay = 0,
  stagger = 0.08,
  className,
  tag: Tag = 'span',
}: WordRevealProps) {
  const words = text.split(' ');

  const MotionTag = motion[Tag] as typeof motion.span;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container(delay, stagger)}
      className={className}
      style={{ display: 'block' }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            marginRight: '0.3em',
          }}
          aria-hidden="true"
        >
          <motion.span style={{ display: 'inline-block' }} variants={wordVariant}>
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
