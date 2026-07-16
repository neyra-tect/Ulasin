'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import { dapusData } from '@/data/dapus';

export default function DapusPage() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <header className="bg-evaluasi border-b-3 border-ink py-6 px-4 shrink-0">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-2xl hover:scale-110 transition-transform text-ink">←</Link>
          <div>
            <h1 className="font-heading text-2xl font-bold text-ink flex items-center gap-2">
              📖 Daftar Pustaka
            </h1>
            <p className="text-sm text-ink/70">Referensi materi teks ulasan</p>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 flex-1 w-full">
        <motion.div
          className="bg-white border-3 border-ink rounded-3xl p-6 md:p-8 brutal-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-ink/20">
            <span className="text-3xl">📚</span>
            <div>
              <h2 className="font-heading font-bold text-xl text-ink">Referensi Ilmiah</h2>
              <p className="text-sm text-ink-light">{dapusData.length} sumber rujukan materi</p>
            </div>
          </div>
          
          <ol className="space-y-6">
            {dapusData.map((ref, index) => (
              <motion.li 
                key={ref.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-sm md:text-base text-ink leading-relaxed pl-4 border-l-4 border-evaluasi"
              >
                <p>{ref.text}</p>
                {ref.doi && (
                  <a
                    href={ref.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-xs md:text-sm mt-2 inline-block font-bold"
                  >
                    🔗 {ref.doi}
                  </a>
                )}
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
