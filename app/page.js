'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import SiUlas from '@/components/ui/SiUlas';
import BrutalButton from '@/components/ui/BrutalButton';
import GuidePopup from '@/components/guide/GuidePopup';
import Footer from '@/components/layout/Footer';
import { useProgress } from '@/context/ProgressContext';

const mapNodes = [
  {
    id: 'panduan',
    label: 'Tenda Panduan',
    icon: '⛺',
    href: '/panduan',
    color: 'bg-accent',
    description: 'Tips belajar efektif',
  },
  {
    id: 'materi',
    label: 'Rumah Buku',
    icon: '📚',
    href: '/materi',
    color: 'bg-secondary',
    description: '7 bab materi teks ulasan',
    checkKey: 'materiCompleted',
    total: 7,
  },
  {
    id: 'contoh',
    label: 'Bioskop Kritik',
    icon: '🍿',
    href: '/contoh',
    color: 'bg-primary',
    description: 'Galeri contoh teks ulasan',
    checkKey: 'contohViewed',
    total: 3,
  },
  {
    id: 'latihan',
    label: 'Kastil Tantangan',
    icon: '🏆',
    href: '/latihan',
    color: 'bg-error',
    description: '20 soal PG + 5 uraian',
  },
];

const extraNodes = [
  { id: 'ringkasan', label: 'Peta Pikiran', icon: '🗺️', href: '/ringkasan', color: 'bg-orientasi' },
  { id: 'glosarium', label: 'Kamus Saku', icon: '🔍', href: '/glosarium', color: 'bg-tafsiran' },
  { id: 'pengembang', label: 'Pengembang', icon: '👩‍💻', href: '/pengembang', color: 'bg-accent' },
];

export default function HomePage() {
  const { progress } = useProgress();

  const getNodeStatus = (node) => {
    if (!node.checkKey) return null;
    const completed = progress[node.checkKey]?.length || 0;
    return { completed, total: node.total };
  };

  return (
    <div className="min-h-screen grid-paper">
      <GuidePopup />

      {/* Header */}
      <header className="pt-6 pb-4 px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Image
              src="/images/logo.png"
              alt="Logo Ulasin"
              width={48}
              height={48}
              className="rounded-xl"
            />
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-ink">
              Ulasin
            </h1>
          </div>
          <p className="text-ink-light text-sm">
            Ruang Belajar Teks Ulasan Interaktif 🐱
          </p>
        </div>
      </header>

      {/* Progress Potion Bar */}
      <div className="max-w-lg mx-auto px-4 mb-6">
        <motion.div
          className="bg-white border-3 border-ink rounded-2xl p-4 brutal-shadow"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧪</span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-heading font-bold text-sm">Ramuan Petualangan</span>
                <span className="font-heading font-bold text-sm text-primary">
                  {progress.totalProgress}%
                </span>
              </div>
              <div className="h-4 bg-gray-200 rounded-full border-2 border-ink overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-success to-secondary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress.totalProgress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Adventure Map */}
      <div className="max-w-lg mx-auto px-4 pb-8">
        {/* Si Ulas at Start */}
        <div className="flex justify-center mb-2">
          <SiUlas pose="hello" size={100} />
        </div>
        <p className="text-center font-heading font-bold text-ink-light text-sm mb-6">
          Mulai petualanganmu dari sini! 👇
        </p>

        {/* Main Path Nodes */}
        <div className="relative">
          {/* Vertical line connector */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-ink-lighter -translate-x-1/2 rounded-full" />

          <div className="space-y-6 relative">
            {mapNodes.map((node, index) => {
              const status = getNodeStatus(node);
              return (
                <motion.div
                  key={node.id}
                  initial={{ x: index % 2 === 0 ? -30 : 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.15 }}
                >
                  <Link href={node.href} className="block">
                    <div
                      className={`
                        ${node.color} border-3 border-ink rounded-2xl p-4 brutal-shadow brutal-shadow-hover
                        flex items-center gap-4 relative overflow-hidden
                      `}
                    >
                      {/* Node icon */}
                      <div className="w-14 h-14 bg-white border-3 border-ink rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                        {node.icon}
                      </div>

                      {/* Node info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-bold text-lg text-ink">{node.label}</h3>
                        <p className="text-sm text-ink/70">{node.description}</p>
                        {status && (
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex gap-1">
                              {Array.from({ length: status.total }, (_, i) => (
                                <div
                                  key={i}
                                  className={`w-2.5 h-2.5 rounded-full border border-ink ${
                                    i < status.completed ? 'bg-success' : 'bg-white/50'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs font-bold text-ink/60">
                              {status.completed}/{status.total}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Arrow */}
                      <span className="text-2xl flex-shrink-0">→</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Extra Nodes */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {extraNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <Link href={node.href}>
                <div
                  className={`
                    ${node.color}/30 border-3 border-ink rounded-2xl p-4 brutal-shadow brutal-shadow-hover
                    text-center
                  `}
                >
                  <span className="text-3xl block mb-1">{node.icon}</span>
                  <span className="font-heading font-bold text-sm text-ink">{node.label}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
