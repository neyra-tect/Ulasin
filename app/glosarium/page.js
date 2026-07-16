'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { glosariumData } from '@/data/glosarium';
import Footer from '@/components/layout/Footer';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const candyColors = [
  'bg-red-300', 'bg-orange-300', 'bg-amber-300', 'bg-yellow-300', 'bg-lime-300',
  'bg-green-300', 'bg-emerald-300', 'bg-teal-300', 'bg-cyan-300', 'bg-sky-300',
  'bg-blue-300', 'bg-indigo-300', 'bg-violet-300', 'bg-purple-300', 'bg-fuchsia-300',
  'bg-pink-300', 'bg-rose-300', 'bg-red-200', 'bg-orange-200', 'bg-amber-200',
  'bg-yellow-200', 'bg-lime-200', 'bg-green-200', 'bg-emerald-200', 'bg-teal-200',
  'bg-cyan-200',
];

export default function GlosariumPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);

  const filteredTerms = useMemo(() => {
    let results = glosariumData;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (item) =>
          item.term.toLowerCase().includes(q) ||
          item.definition.toLowerCase().includes(q)
      );
    }

    if (activeFilter) {
      results = results.filter((item) => item.initial === activeFilter);
    }

    return results.sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, activeFilter]);

  const availableLetters = useMemo(() => {
    return new Set(glosariumData.map((item) => item.initial));
  }, []);

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-tafsiran border-b-3 border-ink py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-2xl hover:scale-110 transition-transform text-white">←</Link>
          <div>
            <h1 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
              🔍 Kamus Saku Pintar
            </h1>
            <p className="text-sm text-white/70">Glosarium istilah teks ulasan</p>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
            <input
              type="text"
              placeholder="Cari istilah..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveFilter(null);
              }}
              className="w-full pl-12 pr-4 py-3 border-3 border-ink rounded-xl text-ink bg-white brutal-shadow focus:outline-none focus:border-secondary font-body text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-light hover:text-ink"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Alphabet Filter */}
        <div className="mb-6 flex flex-wrap gap-1.5 justify-center">
          <button
            onClick={() => setActiveFilter(null)}
            className={`
              w-8 h-8 rounded-full border-2 text-xs font-bold transition-all
              ${!activeFilter
                ? 'bg-primary text-white border-ink shadow-[2px_2px_0px_#2D3436]'
                : 'bg-white text-ink/60 border-ink/30 hover:border-ink'
              }
            `}
          >
            All
          </button>
          {alphabet.map((letter, index) => {
            const isAvailable = availableLetters.has(letter);
            const isActive = activeFilter === letter;
            return (
              <button
                key={letter}
                onClick={() => isAvailable && setActiveFilter(isActive ? null : letter)}
                disabled={!isAvailable}
                className={`
                  w-8 h-8 rounded-full border-2 text-xs font-bold transition-all
                  ${isActive
                    ? 'border-ink shadow-[2px_2px_0px_#2D3436] scale-110'
                    : isAvailable
                    ? `${candyColors[index]} border-ink/30 hover:border-ink hover:scale-105`
                    : 'bg-gray-100 text-ink/20 border-transparent cursor-not-allowed'
                  }
                `}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Results */}
        <div className="space-y-3">
          <AnimatePresence>
            {filteredTerms.length > 0 ? (
              filteredTerms.map((item, index) => (
                <motion.div
                  key={item.term}
                  className="bg-white border-3 border-ink rounded-2xl p-4 brutal-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <div className="flex items-start gap-3">
                    <span className="w-10 h-10 bg-secondary/20 border-2 border-secondary rounded-xl flex items-center justify-center font-heading font-bold text-secondary text-lg flex-shrink-0">
                      {item.initial}
                    </span>
                    <div>
                      <h3 className="font-heading font-bold text-ink">{item.term}</h3>
                      <p className="text-sm text-ink/70 leading-relaxed mt-1">{item.definition}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="text-4xl block mb-3">🔍</span>
                <p className="text-ink-light font-heading font-bold">
                  Istilah tidak ditemukan
                </p>
                <p className="text-sm text-ink-lighter mt-1">Coba cari dengan kata kunci lain</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-ink-lighter mt-6">
          Total: {filteredTerms.length} dari {glosariumData.length} istilah
        </p>
      </div>

      <Footer />
    </div>
  );
}
