'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { materiData } from '@/data/materi';
import { miniQuizData } from '@/data/miniQuiz';
import { useProgress } from '@/context/ProgressContext';
import SiUlas from '@/components/ui/SiUlas';
import BrutalButton from '@/components/ui/BrutalButton';
import Footer from '@/components/layout/Footer';

function MiniQuiz({ quiz, onComplete }) {
  const [answered, setAnswered] = useState(null);

  const handleAnswer = (answer) => {
    setAnswered(answer);
    if (answer === quiz.answer) {
      setTimeout(() => onComplete(), 1200);
    }
  };

  return (
    <motion.div
      className="bg-accent/20 border-3 border-ink rounded-2xl p-5 mt-6"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="flex items-start gap-3 mb-4">
        <SiUlas pose="thinking" size={60} animate={false} />
        <div>
          <h4 className="font-heading font-bold text-ink">⚡ Soal Kilat!</h4>
          <p className="text-sm text-ink/70 mt-1">{quiz.question}</p>
        </div>
      </div>

      {answered === null ? (
        <div className="flex gap-3 justify-center">
          <BrutalButton variant="success" onClick={() => handleAnswer(true)} icon="✅">
            Benar
          </BrutalButton>
          <BrutalButton variant="error" onClick={() => handleAnswer(false)} icon="❌">
            Salah
          </BrutalButton>
        </div>
      ) : (
        <motion.div
          className={`p-4 rounded-xl border-2 ${
            answered === quiz.answer
              ? 'bg-success-bg border-success'
              : 'bg-error-bg border-error'
          }`}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <p className="font-bold text-sm mb-1">
            {answered === quiz.answer ? '🎉 Tepat sekali!' : '😅 Belum tepat!'}
          </p>
          <p className="text-sm text-ink/70">{quiz.explanation}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

function TabContent({ materi, quiz, onQuizComplete }) {
  return (
    <motion.div
      key={materi.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {materi.content.map((section, sIdx) => (
        <div key={sIdx} className="mb-6">
          <h2 className="font-heading text-xl font-bold text-ink mb-3 flex items-center gap-2">
            {materi.icon} {section.subtitle}
          </h2>

          {section.paragraphs?.map((p, pIdx) => (
            <p
              key={pIdx}
              className="text-ink/80 leading-relaxed mb-3 text-sm md:text-base"
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}

          {section.list && (
            <ul className="space-y-2 mb-4 ml-4">
              {section.list.map((item, iIdx) => (
                <li
                  key={iIdx}
                  className="flex items-start gap-2 text-sm text-ink/80"
                >
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          )}

          {section.numberedList && (
            <ol className="space-y-3 mb-4">
              {section.numberedList.map((item, iIdx) => (
                <li key={iIdx} className="flex items-start gap-3 text-sm text-ink/80">
                  <span className="w-7 h-7 bg-primary text-white rounded-lg border-2 border-ink flex items-center justify-center font-heading font-bold text-xs flex-shrink-0">
                    {iIdx + 1}
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: item }} className="pt-0.5" />
                </li>
              ))}
            </ol>
          )}

          {section.table && (
            <div className="overflow-x-auto mb-4 -mx-2 px-2">
              <table className="w-full border-3 border-ink rounded-xl overflow-hidden text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    {section.table.headers.map((h, hIdx) => (
                      <th key={hIdx} className="p-3 text-left font-heading font-bold border-b-2 border-ink">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row, rIdx) => (
                    <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-surface-alt'}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-3 border-b border-ink/20">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {section.subsections?.map((sub, subIdx) => (
            <div key={subIdx} className="ml-2 mb-4 pl-4 border-l-3 border-primary/30">
              <h3 className="font-heading font-bold text-base text-ink mb-2">{sub.title}</h3>
              {sub.paragraphs?.map((p, pIdx) => (
                <p key={pIdx} className="text-sm text-ink/80 leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: p }} />
              ))}
              {sub.list && (
                <ul className="space-y-1.5 ml-4">
                  {sub.list.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2 text-sm text-ink/80">
                      <span className="text-secondary font-bold mt-0.5">•</span>
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {section.note && (
            <div className={`
              border-2 rounded-xl p-4 mt-4 flex items-start gap-3
              ${section.note.type === 'warning' ? 'border-evaluasi bg-evaluasi-bg' :
                section.note.type === 'tip' ? 'border-success bg-success-bg' :
                'border-orientasi bg-orientasi-bg'}
            `}>
              <span className="text-lg flex-shrink-0">
                {section.note.type === 'warning' ? '⚠️' : section.note.type === 'tip' ? '💡' : 'ℹ️'}
              </span>
              <p className="text-sm text-ink/80" dangerouslySetInnerHTML={{ __html: section.note.text }} />
            </div>
          )}
        </div>
      ))}

      {quiz && <MiniQuiz quiz={quiz} onComplete={onQuizComplete} />}
    </motion.div>
  );
}

export default function MateriPage() {
  const [activeTab, setActiveTab] = useState(0);
  const { progress, completeMateri } = useProgress();

  const handleQuizComplete = useCallback(() => {
    completeMateri(materiData[activeTab].id);
  }, [activeTab, completeMateri]);

  const currentMateri = materiData[activeTab];
  const currentQuiz = miniQuizData.find((q) => q.tabId === currentMateri.id);

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-secondary border-b-3 border-ink py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-2xl hover:scale-110 transition-transform text-white">←</Link>
          <div>
            <h1 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
              📚 Rumah Buku — Materi
            </h1>
            <p className="text-sm text-white/70">7 bab materi teks ulasan</p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-0 z-30 bg-white border-b-3 border-ink">
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <div className="flex min-w-max px-2 py-2 gap-1">
            {materiData.map((tab, index) => {
              const isCompleted = progress.materiCompleted.includes(tab.id);
              const isActive = activeTab === index;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  className={`
                    flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold whitespace-nowrap
                    transition-all border-2
                    ${isActive
                      ? 'bg-primary text-white border-ink shadow-[2px_2px_0px_#2D3436]'
                      : 'bg-white text-ink/60 border-transparent hover:bg-surface-alt hover:border-ink/20'
                    }
                  `}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.shortTitle}</span>
                  {isCompleted && <span className="text-success">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white border-3 border-ink rounded-2xl p-5 md:p-8 brutal-shadow">
          <AnimatePresence mode="wait">
            <TabContent
              key={currentMateri.id}
              materi={currentMateri}
              quiz={currentQuiz}
              onQuizComplete={handleQuizComplete}
            />
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <BrutalButton
            variant="ghost"
            onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
            disabled={activeTab === 0}
            icon="←"
          >
            Sebelumnya
          </BrutalButton>
          <BrutalButton
            variant="primary"
            onClick={() => setActiveTab(Math.min(materiData.length - 1, activeTab + 1))}
            disabled={activeTab === materiData.length - 1}
            icon="→"
          >
            Selanjutnya
          </BrutalButton>
        </div>
      </div>

      <Footer />
    </div>
  );
}
