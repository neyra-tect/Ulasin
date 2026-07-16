'use client';

import { motion } from 'framer-motion';

export default function SpeechBubble({ children, direction = 'left', className = '' }) {
  return (
    <motion.div
      className={`relative bg-white border-3 border-ink rounded-2xl p-4 brutal-shadow ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
      {/* Triangle pointer */}
      <div
        className={`absolute w-0 h-0 ${
          direction === 'left'
            ? 'left-[-14px] top-6 border-t-[10px] border-t-transparent border-r-[14px] border-r-ink border-b-[10px] border-b-transparent'
            : direction === 'right'
            ? 'right-[-14px] top-6 border-t-[10px] border-t-transparent border-l-[14px] border-l-ink border-b-[10px] border-b-transparent'
            : 'bottom-[-14px] left-1/2 -translate-x-1/2 border-l-[10px] border-l-transparent border-t-[14px] border-t-ink border-r-[10px] border-r-transparent'
        }`}
      />
      {direction === 'left' && (
        <div
          className="absolute left-[-10px] top-6 w-0 h-0 border-t-[8px] border-t-transparent border-r-[11px] border-r-white border-b-[8px] border-b-transparent"
        />
      )}
      {direction === 'right' && (
        <div
          className="absolute right-[-10px] top-6 w-0 h-0 border-t-[8px] border-t-transparent border-l-[11px] border-l-white border-b-[8px] border-b-transparent"
        />
      )}
      {direction === 'bottom' && (
        <div
          className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-t-[11px] border-t-white border-r-[8px] border-r-transparent"
        />
      )}
    </motion.div>
  );
}
