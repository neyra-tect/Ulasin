'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { dapusData } from '@/data/dapus';

export default function Footer() {
  const [showDapus, setShowDapus] = useState(false);

  return (
    <>
      <footer className="bg-gray-100 border-t-3 border-ink py-10 px-4 mb-16">
        <div className="max-w-md mx-auto flex flex-col items-center gap-6">
          {/* Developer Profile Card */}
          <div className="w-full bg-white border-3 border-ink rounded-2xl brutal-shadow p-6 flex flex-col items-center text-center relative">
            {/* Badge label */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent border-2 border-ink rounded-full px-4 py-0.5">
              <span className="font-heading font-bold text-xs text-ink">👩‍💻 Pengembang</span>
            </div>

            <div className="w-20 h-20 rounded-full border-3 border-ink overflow-hidden brutal-shadow bg-white mt-2 mb-3">
              <Image
                src="/images/bio/1.jpg"
                alt="Mutiara Retno Damayanti"
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="font-heading font-bold text-base text-ink">Mutiara Retno Damayanti</p>
            <p className="text-sm text-ink-light">Pendidikan Bahasa dan Sastra Indonesia</p>
            <p className="text-xs text-ink-lighter mt-0.5">IKIP PGRI Bojonegoro</p>
          </div>

          {/* References Button */}
          <button
            onClick={() => setShowDapus(true)}
            className="w-full bg-white border-3 border-ink rounded-2xl brutal-shadow brutal-shadow-hover px-5 py-4 flex items-center justify-center gap-3 group transition-all"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">📖</span>
            <div className="text-center">
              <p className="font-heading font-bold text-sm text-ink">Daftar Pustaka</p>
              <p className="text-xs text-ink-lighter">{dapusData.length} referensi ilmiah</p>
            </div>
          </button>
        </div>

        {/* Copyright */}
        <div className="max-w-md mx-auto mt-8 pt-4 border-t border-ink-lighter">
          <p className="text-center text-xs text-ink-lighter leading-relaxed">
            © 2026 <span className="font-bold">Ulasin</span> — Media Pembelajaran Teks Ulasan Interaktif
            <br />Pendidikan Bahasa dan Sastra Indonesia
          </p>
        </div>
      </footer>

      {/* Daftar Pustaka Modal */}
      <AnimatePresence>
        {showDapus && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDapus(false)}
          >
            <motion.div
              className="bg-white border-3 border-ink rounded-2xl brutal-shadow max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-2xl font-bold text-ink flex items-center gap-2">
                  📖 Daftar Pustaka
                </h2>
                <button
                  onClick={() => setShowDapus(false)}
                  className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center hover:bg-error hover:text-white transition-colors font-bold"
                >
                  ✕
                </button>
              </div>
              <ol className="space-y-3">
                {dapusData.map((ref) => (
                  <li key={ref.id} className="text-sm text-ink-light leading-relaxed pl-2 border-l-3 border-primary/30">
                    <p>{ref.text}</p>
                    {ref.doi && (
                      <a
                        href={ref.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:underline text-xs mt-1 inline-block"
                      >
                        {ref.doi}
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
