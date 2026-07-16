'use client';

import { motion } from 'framer-motion';

export default function BrutalCard({
  children,
  className = '',
  color = 'bg-surface',
  hover = true,
  onClick,
  as = 'div',
}) {
  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      className={`
        border-3 border-ink rounded-xl ${color} brutal-shadow
        ${hover ? 'brutal-shadow-hover cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      whileHover={hover ? { scale: 1.02 } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
    >
      {children}
    </Component>
  );
}
