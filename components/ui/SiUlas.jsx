'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const poses = {
  hello: '/images/mascot/si-ulas-hello.png',
  thinking: '/images/mascot/si-ulas-thinking.png',
  celebrating: '/images/mascot/si-ulas-celebrating.png',
};

export default function SiUlas({
  pose = 'hello',
  size = 120,
  animate = true,
  className = '',
}) {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      animate={animate ? { y: [0, -6, 0] } : {}}
      transition={animate ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      <Image
        src={poses[pose] || poses.hello}
        alt={`Si Ulas - ${pose}`}
        fill
        className="object-contain drop-shadow-lg"
        priority
      />
    </motion.div>
  );
}
