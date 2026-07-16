'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { structureColors } from '@/data/contoh';
import Footer from '@/components/layout/Footer';

const conceptData = {
  center: {
    id: 'teks-ulasan',
    label: 'Teks Ulasan',
    emoji: '📝',
    description: 'Teks yang berisi tinjauan, penilaian, dan pertimbangan mengenai kualitas suatu karya.',
  },
  branches: [
    {
      id: 'pengertian',
      label: 'Pengertian',
      emoji: '📖',
      color: '#A78BFA',
      bgColor: '#EDE9FE',
      description: 'Tulisan berisi pertimbangan atau penilaian tentang kualitas suatu karya.',
      children: [
        'Tinjauan & Penilaian',
        'Karya Sastra & Nonsastra',
        'Sama dengan Resensi',
      ],
    },
    {
      id: 'struktur',
      label: 'Struktur',
      emoji: '🧱',
      color: structureColors.orientasi.border,
      bgColor: structureColors.orientasi.bg,
      description: 'Empat bagian baku teks ulasan.',
      children: [
        '🔵 Orientasi — Identitas Karya',
        '🟢 Tafsiran — Sinopsis/Isi',
        '🟡 Evaluasi — Kelebihan & Kekurangan',
        '🔴 Rangkuman — Simpulan & Rekomendasi',
      ],
    },
    {
      id: 'kaidah',
      label: 'Kaidah Kebahasaan',
      emoji: '🧪',
      color: structureColors.tafsiran.border,
      bgColor: structureColors.tafsiran.bg,
      description: 'Ciri penggunaan bahasa dalam teks ulasan.',
      children: [
        'Konjungsi (penerang, temporal, perlawanan)',
        'Kata kerja mental (merasakan, mengagumi)',
        'Kata sifat penilai (menarik, apik)',
        'Kalimat kompleks',
      ],
    },
    {
      id: 'tujuan',
      label: 'Tujuan',
      emoji: '🎯',
      color: structureColors.evaluasi.border,
      bgColor: structureColors.evaluasi.bg,
      description: 'Mengapa teks ulasan ditulis.',
      children: [
        'Memberikan informasi karya',
        'Mengajak berpikir kritis',
        'Membantu menentukan pilihan',
        'Memberikan kritik membangun',
      ],
    },
    {
      id: 'langkah',
      label: 'Langkah Menyusun',
      emoji: '✍️',
      color: structureColors.rangkuman.border,
      bgColor: structureColors.rangkuman.bg,
      description: 'Cara menulis teks ulasan.',
      children: [
        '1. Pilih karya',
        '2. Nikmati karya',
        '3. Catat data identitas',
        '4. Buat sinopsis',
        '5. Analisis kelebihan & kekurangan',
        '6. Susun kerangka',
        '7. Kembangkan teks',
        '8. Sunting',
      ],
    },
  ],
};

export default function RingkasanPage() {
  const [expandedBranch, setExpandedBranch] = useState(null);

  const toggleBranch = (id) => {
    setExpandedBranch((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-orientasi border-b-3 border-ink py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-2xl hover:scale-110 transition-transform text-white">←</Link>
          <div>
            <h1 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
              🗺️ Peta Pikiran Ajaib
            </h1>
            <p className="text-sm text-white/70">Ringkasan visual materi teks ulasan</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-center text-ink-light text-sm mb-8">
          Klik setiap cabang untuk melihat detail! 🔍
        </p>

        {/* Center Node */}
        <motion.div
          className="mx-auto w-fit mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div className="bg-primary text-white border-3 border-ink rounded-2xl p-6 brutal-shadow text-center">
            <span className="text-4xl block mb-2">{conceptData.center.emoji}</span>
            <h2 className="font-heading text-2xl font-bold">{conceptData.center.label}</h2>
            <p className="text-sm text-white/80 mt-1 max-w-xs">{conceptData.center.description}</p>
          </div>
        </motion.div>

        {/* Connecting line */}
        <div className="w-1 h-6 bg-ink mx-auto rounded-full mb-4" />

        {/* Branches */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {conceptData.branches.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <button
                onClick={() => toggleBranch(branch.id)}
                className="w-full text-left"
              >
                <div
                  className="border-3 border-ink rounded-2xl p-4 brutal-shadow brutal-shadow-hover transition-all"
                  style={{ backgroundColor: branch.bgColor }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="w-10 h-10 rounded-xl border-2 border-ink flex items-center justify-center text-xl bg-white"
                    >
                      {branch.emoji}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-ink">{branch.label}</h3>
                      <p className="text-xs text-ink/60">{branch.description}</p>
                    </div>
                    <motion.span
                      className="text-lg"
                      animate={{ rotate: expandedBranch === branch.id ? 180 : 0 }}
                    >
                      ▼
                    </motion.span>
                  </div>
                </div>
              </button>

              {/* Children */}
              <AnimatePresence>
                {expandedBranch === branch.id && (
                  <motion.div
                    className="mt-2 ml-6 space-y-2"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {branch.children.map((child, cIdx) => (
                      <motion.div
                        key={cIdx}
                        className="bg-white border-2 border-ink/30 rounded-xl p-3 text-sm text-ink/80 flex items-center gap-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: cIdx * 0.05 }}
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: branch.color }}
                        />
                        {child}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
