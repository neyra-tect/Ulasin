'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SiUlas from '@/components/ui/SiUlas';
import BrutalButton from '@/components/ui/BrutalButton';
import Footer from '@/components/layout/Footer';

const tips = [
  {
    icon: '📚',
    title: 'Mulai dari Materi',
    description: 'Baca materi dari Bagian 1 hingga Bagian 7 secara berurutan. Setiap bagian punya kuis kilat di akhir!',
    color: 'bg-secondary/20',
  },
  {
    icon: '🍿',
    title: 'Lihat Contoh di Bank Contoh',
    description: 'Setelah baca materi, kunjungi Bank Contoh untuk melihat teks ulasan nyata. Coba aktifkan highlight warna!',
    color: 'bg-primary/20',
  },
  {
    icon: '🗺️',
    title: 'Review di Peta Pikiran',
    description: 'Sebelum kuis, buka Ringkasan Visual untuk review cepat semua materi dalam bentuk peta konsep.',
    color: 'bg-orientasi/20',
  },
  {
    icon: '🏆',
    title: 'Uji di Kastil Tantangan',
    description: 'Terakhir, kerjakan 20 soal PG + 5 soal uraian. Raih 3 bintang untuk menjadi juara!',
    color: 'bg-error/20',
  },
  {
    icon: '🔍',
    title: 'Gunakan Glosarium',
    description: 'Kalau ada istilah yang membingungkan, langsung cari di Kamus Saku Pintar!',
    color: 'bg-tafsiran/20',
  },
];

export default function PanduanPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-accent border-b-3 border-ink py-6 px-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-2xl hover:scale-110 transition-transform">←</Link>
          <div>
            <h1 className="font-heading text-2xl font-bold text-ink flex items-center gap-2">
              ⛺ Panduan Belajar
            </h1>
            <p className="text-sm text-ink/70">Tips strategi belajar yang efektif</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Si Ulas Greeting */}
        <motion.div
          className="flex flex-col items-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <SiUlas pose="hello" size={120} />
          <div className="mt-4 bg-white border-3 border-ink rounded-2xl p-4 brutal-shadow max-w-sm text-center">
            <p className="font-heading font-bold text-primary mb-1">Halo, Petualang! 👋</p>
            <p className="text-sm text-ink-light">
              Ikuti urutan belajar berikut agar petualanganmu di Ulasin lebih seru dan efektif!
            </p>
          </div>
        </motion.div>

        {/* Tips Cards */}
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              className={`${tip.color} border-3 border-ink rounded-2xl p-5 brutal-shadow`}
              initial={{ x: index % 2 === 0 ? -30 : 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white border-3 border-ink rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {tip.icon}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-ink mb-1">
                    Langkah {index + 1}: {tip.title}
                  </h3>
                  <p className="text-sm text-ink/70 leading-relaxed">{tip.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-8 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/materi">
            <BrutalButton variant="primary" size="lg" icon="📚">
              Mulai Belajar Sekarang!
            </BrutalButton>
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
