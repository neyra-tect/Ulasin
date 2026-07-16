'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SiUlas from '@/components/ui/SiUlas';
import BrutalButton from '@/components/ui/BrutalButton';
import { useProgress } from '@/context/ProgressContext';

export default function GuidePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const { progress, setGuideShown } = useProgress();

  const fullText =
    'Hai! Aku Si Ulas 🐱 Selamat datang di Ulasin! Biar petualanganmu seru, yuk mampir ke Rumah Buku (Materi) dulu sebelum kamu bertarung di Kastil Tantangan (Kuis)! Kamu juga bisa lihat contoh-contoh teks ulasan di Bioskop Kritik. Selamat belajar!';

  useEffect(() => {
    if (!progress.guideShown) {
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, [progress.guideShown]);

  // Typewriter effect
  useEffect(() => {
    if (!isOpen) return;
    if (displayedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 25);
      return () => clearTimeout(timer);
    }
  }, [isOpen, displayedText, fullText]);

  const handleClose = () => {
    setIsOpen(false);
    setGuideShown();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Content */}
          <motion.div
            className="relative bg-white border-3 border-ink rounded-3xl p-6 max-w-md w-full brutal-shadow"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* Decorative top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent border-3 border-ink rounded-full px-4 py-1">
              <span className="font-heading font-bold text-sm">⛺ Tenda Si Ulas</span>
            </div>

            {/* Mascot */}
            <div className="flex justify-center mt-4 mb-4">
              <SiUlas pose="hello" size={140} />
            </div>

            {/* Speech bubble */}
            <div className="bg-surface-alt border-2 border-ink rounded-2xl p-4 mb-5 min-h-[120px]">
              <p className="text-ink text-sm leading-relaxed">
                {displayedText}
                {displayedText.length < fullText.length && (
                  <span className="animate-pulse">|</span>
                )}
              </p>
            </div>

            {/* Button */}
            <div className="flex justify-center">
              <BrutalButton
                variant="primary"
                size="lg"
                onClick={handleClose}
                icon="🚀"
              >
                Siap, Kapten!
              </BrutalButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
