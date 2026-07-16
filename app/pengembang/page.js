'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/layout/Footer';
import { dapusData } from '@/data/dapus';

export default function PengembangPage() {
  const [showDapus, setShowDapus] = useState(false);

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-accent border-b-3 border-ink py-6 px-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-2xl hover:scale-110 transition-transform text-ink">←</Link>
          <div>
            <h1 className="font-heading text-2xl font-bold text-ink flex items-center gap-2">
              👩‍💻 Profil Pengembang
            </h1>
            <p className="text-sm text-ink/70">Tentang pembuat web Ulasin</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          className="bg-white border-3 border-ink rounded-3xl p-6 md:p-10 brutal-shadow text-center relative mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          {/* Decorative elements */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-3 border-ink overflow-hidden brutal-shadow bg-white z-10">
            <Image
              src="/images/bio/1.jpg"
              alt="Mutiara Retno Damayanti"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute top-4 right-4 text-3xl opacity-20">🎓</div>
          <div className="absolute bottom-4 left-4 text-3xl opacity-20">✍️</div>

          <div className="pt-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-ink mb-1">
              Mutiara Retno Damayanti
            </h2>
            <p className="text-sm md:text-base font-bold text-primary mb-6">
              Pendidikan Bahasa dan Sastra Indonesia
            </p>

            <div className="bg-surface-alt border-2 border-ink/20 rounded-2xl p-5 md:p-6 text-left relative">
              <span className="absolute -top-3 -left-3 text-2xl">✨</span>
              <p className="text-ink/80 text-sm md:text-base leading-relaxed text-justify indent-8">
                Mutiara Retno Damayanti lahir di Bojonegoro pada 19 Juni 2004. Pendidikan dasarnya ditempuh di SD Negeri Bogo dan diselesaikan pada tahun 2017. Selanjutnya, ia melanjutkan pendidikan di SMP Negeri 1 Kapas dan lulus pada tahun 2020. Pendidikan menengah atas ditempuh di SMK Negeri 4 Bojonegoro dan diselesaikan pada tahun 2023. Saat ini, ia merupakan mahasiswa Program Studi Pendidikan Bahasa dan Sastra Indonesia, Fakultas Pendidikan Bahasa dan Seni, IKIP PGRI Bojonegoro.
              </p>
            </div>

            <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="bg-secondary/20 border-2 border-ink rounded-xl px-4 py-2 flex items-center gap-2">
                <span className="text-xl">📍</span>
                <span className="text-sm font-bold text-ink">Bojonegoro, Jawa Timur</span>
              </div>
              <div className="bg-orientasi-bg border-2 border-ink rounded-xl px-4 py-2 flex items-center gap-2">
                <span className="text-xl">🏫</span>
                <span className="text-sm font-bold text-ink">IKIP PGRI Bojonegoro</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* References Button moved from Footer */}
        <motion.button
          onClick={() => setShowDapus(true)}
          className="w-full mt-6 bg-white border-3 border-ink rounded-2xl brutal-shadow brutal-shadow-hover px-5 py-4 flex items-center justify-center gap-3 group transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-2xl group-hover:scale-110 transition-transform">📖</span>
          <div className="text-center">
            <p className="font-heading font-bold text-sm text-ink">Daftar Pustaka</p>
            <p className="text-xs text-ink-lighter">{dapusData.length} referensi ilmiah</p>
          </div>
        </motion.button>
      </div>

      <Footer />

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
    </div>
  );
}
