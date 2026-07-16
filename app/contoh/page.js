'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { contohData, structureColors } from '@/data/contoh';
import { useProgress } from '@/context/ProgressContext';
import SiUlas from '@/components/ui/SiUlas';
import BrutalButton from '@/components/ui/BrutalButton';
import Footer from '@/components/layout/Footer';

function ExampleDetail({ example, onBack }) {
  const [activeStructures, setActiveStructures] = useState({
    orientasi: false,
    tafsiran: false,
    evaluasi: false,
    rangkuman: false,
  });
  const [hoveredStructure, setHoveredStructure] = useState(null);

  const toggleStructure = (key) => {
    setActiveStructures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const structures = ['orientasi', 'tafsiran', 'evaluasi', 'rangkuman'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <BrutalButton variant="ghost" onClick={onBack} icon="←" size="sm" className="mb-4">
        Kembali ke Galeri
      </BrutalButton>

      <div className="bg-white border-3 border-ink rounded-2xl p-5 md:p-8 brutal-shadow mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{example.typeIcon}</span>
          <div>
            <h2 className="font-heading text-xl font-bold text-ink">{example.title}</h2>
            <p className="text-sm text-ink-light">{example.type} — {example.author} ({example.year})</p>
          </div>
        </div>

        {/* Structure Toggle Switches */}
        <div className="flex flex-wrap gap-2 mb-6 p-3 bg-surface-alt rounded-xl border-2 border-ink/20">
          <p className="w-full text-xs font-bold text-ink-light mb-1">🎨 Aktifkan highlight struktur:</p>
          {structures.map((key) => {
            const color = structureColors[key];
            const isActive = activeStructures[key];
            return (
              <button
                key={key}
                onClick={() => toggleStructure(key)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold
                  border-2 transition-all
                  ${isActive
                    ? `border-ink shadow-[2px_2px_0px_#2D3436]`
                    : 'border-ink/30 opacity-60 hover:opacity-100'
                  }
                `}
                style={{
                  backgroundColor: isActive ? color.bg : 'white',
                  color: color.text,
                }}
              >
                <span>{color.emoji}</span>
                {color.label}
              </button>
            );
          })}
        </div>

        {/* Text with Highlights */}
        <div className="space-y-4">
          {structures.map((key) => {
            const color = structureColors[key];
            const section = example.structures[key];
            const isHighlighted = activeStructures[key];

            return (
              <motion.div
                key={key}
                className={`
                  p-4 rounded-xl transition-all duration-300 relative
                  ${isHighlighted
                    ? `border-2`
                    : 'border border-transparent'
                  }
                `}
                style={{
                  backgroundColor: isHighlighted ? color.bg : 'transparent',
                  borderColor: isHighlighted ? color.border : 'transparent',
                }}
                onMouseEnter={() => isHighlighted && setHoveredStructure(key)}
                onMouseLeave={() => setHoveredStructure(null)}
                animate={{ scale: isHighlighted ? 1.01 : 1 }}
              >
                {isHighlighted && (
                  <span
                    className="inline-block px-2 py-0.5 rounded-md text-xs font-bold mb-2"
                    style={{ backgroundColor: color.border, color: 'white' }}
                  >
                    {color.emoji} {color.label}
                  </span>
                )}
                <p className="text-sm leading-relaxed text-ink/80">{section.text}</p>

                {/* Si Ulas Tooltip */}
                <AnimatePresence>
                  {hoveredStructure === key && (
                    <motion.div
                      className="absolute -bottom-2 left-4 right-4 z-10"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="bg-white border-2 border-ink rounded-xl p-3 shadow-lg flex items-start gap-2">
                        <SiUlas pose="thinking" size={40} animate={false} />
                        <p className="text-xs text-ink/70 leading-relaxed">{section.analysis}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function ContohPage() {
  const [selectedId, setSelectedId] = useState(null);
  const { viewContoh } = useProgress();

  const handleSelect = (id) => {
    setSelectedId(id);
    viewContoh(id);
  };

  const selectedExample = contohData.find((c) => c.id === selectedId);

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-primary border-b-3 border-ink py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-2xl hover:scale-110 transition-transform text-white">←</Link>
          <div>
            <h1 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
              🍿 Bioskop Kritik — Bank Contoh
            </h1>
            <p className="text-sm text-white/70">Galeri teks ulasan dengan highlight struktur</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {selectedExample ? (
            <ExampleDetail
              key={selectedExample.id}
              example={selectedExample}
              onBack={() => setSelectedId(null)}
            />
          ) : (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-ink-light text-sm mb-6 text-center">
                Pilih salah satu contoh teks ulasan untuk melihat analisis strukturnya! 📝
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {contohData.map((contoh, index) => (
                  <motion.button
                    key={contoh.id}
                    onClick={() => handleSelect(contoh.id)}
                    className="text-left border-3 border-ink rounded-2xl overflow-hidden brutal-shadow brutal-shadow-hover"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.15 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Poster Top */}
                    <div
                      className="h-32 flex items-center justify-center"
                      style={{ backgroundColor: contoh.color }}
                    >
                      <span className="text-6xl">{contoh.typeIcon}</span>
                    </div>
                    {/* Info */}
                    <div className="p-4 bg-white">
                      <span className="inline-block px-2 py-0.5 bg-surface-alt border border-ink/20 rounded-md text-xs font-bold text-ink-light mb-2">
                        {contoh.type}
                      </span>
                      <h3 className="font-heading font-bold text-lg text-ink mb-1">
                        {contoh.title}
                      </h3>
                      <p className="text-sm text-ink-light">{contoh.author}</p>
                      <p className="text-xs text-ink-lighter mt-2">{contoh.description}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
