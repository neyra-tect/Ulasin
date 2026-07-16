'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { soalPG, soalUraian } from '@/data/soal';
import { useProgress } from '@/context/ProgressContext';
import SiUlas from '@/components/ui/SiUlas';
import BrutalButton from '@/components/ui/BrutalButton';
import Footer from '@/components/layout/Footer';

function QuestionCard({ soal, index, onAnswer, userAnswer }) {
  const [showExplanation, setShowExplanation] = useState(false);

  const handleClick = (optIndex) => {
    if (userAnswer !== null) return;
    onAnswer(soal.id, optIndex);
    setShowExplanation(true);
  };

  return (
    <motion.div
      className="bg-white border-3 border-ink rounded-2xl p-5 brutal-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <p className="font-heading font-bold text-sm text-primary mb-2">Soal {index + 1}</p>
      <p className="text-ink text-sm mb-4 leading-relaxed whitespace-pre-line">{soal.question}</p>

      <div className="space-y-2">
        {soal.options.map((option, optIdx) => {
          const isCorrect = optIdx === soal.correctIndex;
          const isSelected = userAnswer === optIdx;
          const isAnswered = userAnswer !== null;

          let optionStyle = 'bg-white border-ink/30 hover:bg-surface-alt hover:border-ink';
          if (isAnswered) {
            if (isCorrect) optionStyle = 'bg-success-bg border-success';
            else if (isSelected && !isCorrect) optionStyle = 'bg-error-bg border-error animate-shake';
          }

          return (
            <button
              key={optIdx}
              onClick={() => handleClick(optIdx)}
              disabled={isAnswered}
              className={`
                w-full text-left p-3 rounded-xl border-2 text-sm transition-all
                flex items-start gap-2
                ${optionStyle}
                ${!isAnswered ? 'cursor-pointer' : 'cursor-default'}
              `}
            >
              <span className="w-6 h-6 rounded-lg border-2 border-ink flex items-center justify-center text-xs font-bold flex-shrink-0 bg-white">
                {String.fromCharCode(65 + optIdx)}
              </span>
              <span>{option}</span>
              {isAnswered && isCorrect && <span className="ml-auto text-success">✓</span>}
              {isAnswered && isSelected && !isCorrect && <span className="ml-auto text-error">✗</span>}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <motion.div
          className={`mt-3 p-3 rounded-xl text-sm ${
            userAnswer === soal.correctIndex ? 'bg-success-bg' : 'bg-error-bg'
          }`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <p className="font-bold mb-1">
            {userAnswer === soal.correctIndex ? '🎉 Benar!' : '❌ Kurang tepat.'}
          </p>
          <p className="text-ink/70">{soal.explanation}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

function EssayCard({ soal, index }) {
  const [answer, setAnswer] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [selfAssess, setSelfAssess] = useState(null);

  return (
    <motion.div
      className="bg-white border-3 border-ink rounded-2xl p-5 brutal-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="font-heading font-bold text-sm text-secondary mb-2">Uraian {index + 1}</p>
      <p className="text-ink text-sm mb-4 leading-relaxed">{soal.question}</p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Tuliskan jawabanmu di sini..."
        className="w-full min-h-[120px] p-3 border-2 border-ink/30 rounded-xl text-sm bg-surface-alt focus:border-secondary focus:outline-none resize-y"
      />

      {!showKey ? (
        <div className="mt-3">
          <BrutalButton
            variant="secondary"
            size="sm"
            onClick={() => setShowKey(true)}
            disabled={!answer.trim()}
            icon="🔍"
          >
            Lihat Kunci Jawaban
          </BrutalButton>
        </div>
      ) : (
        <motion.div
          className="mt-3 space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Si Ulas thinking animation */}
          <div className="flex items-center gap-2 mb-2">
            <SiUlas pose="thinking" size={50} animate={false} />
            <p className="text-xs text-ink-light font-heading font-bold">Si Ulas sedang menganalisis...</p>
          </div>

          <div className="bg-orientasi-bg border-2 border-orientasi rounded-xl p-4">
            <p className="font-bold text-sm mb-1">📝 Kunci Jawaban:</p>
            <p className="text-sm text-ink/70 leading-relaxed">{soal.kpiAnswer}</p>
          </div>

          {selfAssess === null && (
            <div className="flex gap-3 justify-center">
              <BrutalButton variant="success" size="sm" onClick={() => setSelfAssess('good')} icon="👍">
                Jawabanku mirip!
              </BrutalButton>
              <BrutalButton variant="accent" size="sm" onClick={() => setSelfAssess('retry')} icon="👎">
                Belajar lagi
              </BrutalButton>
            </div>
          )}

          {selfAssess && (
            <p className="text-center text-sm text-ink-light">
              {selfAssess === 'good' ? '🌟 Hebat! Terus tingkatkan!' : '💪 Semangat! Baca kembali materinya ya!'}
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

function ScoreBoard({ score, total, onReset }) {
  const percentage = Math.round((score / total) * 100);
  const stars = percentage >= 100 ? 3 : percentage >= 70 ? 2 : percentage >= 50 ? 1 : 0;

  return (
    <motion.div
      className="bg-accent border-3 border-ink rounded-3xl p-8 brutal-shadow text-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <SiUlas pose={stars >= 2 ? 'celebrating' : 'thinking'} size={120} />

      <h2 className="font-heading text-3xl font-bold text-ink mt-4 mb-2">
        {stars >= 2 ? '🎉 Luar Biasa!' : stars >= 1 ? '👍 Bagus!' : '💪 Semangat!'}
      </h2>

      {/* Stars */}
      <div className="flex justify-center gap-2 mb-4">
        {[1, 2, 3].map((s) => (
          <motion.span
            key={s}
            className={`text-4xl ${s <= stars ? '' : 'opacity-20'}`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3 + s * 0.2 }}
          >
            ⭐
          </motion.span>
        ))}
      </div>

      {/* Score */}
      <div className="bg-white border-3 border-ink rounded-2xl p-4 inline-block mb-4">
        <p className="font-heading text-4xl font-bold text-primary">{score}/{total}</p>
        <p className="text-sm text-ink-light">Jawaban Benar</p>
      </div>

      <div className="flex gap-3 justify-center flex-wrap">
        <BrutalButton variant="primary" onClick={onReset} icon="🔄">
          Coba Lagi
        </BrutalButton>
        <Link href="/">
          <BrutalButton variant="outline" icon="🗺️">
            Kembali ke Peta
          </BrutalButton>
        </Link>
      </div>
    </motion.div>
  );
}

export default function LatihanPage() {
  const [mode, setMode] = useState(null); // 'pg' | 'uraian' | null
  const [answers, setAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);
  const { setQuizScore } = useProgress();

  const handleAnswer = (id, optIndex) => {
    setAnswers((prev) => ({ ...prev, [id]: optIndex }));
  };

  const score = useMemo(() => {
    return soalPG.reduce((acc, soal) => {
      return acc + (answers[soal.id] === soal.correctIndex ? 1 : 0);
    }, 0);
  }, [answers]);

  const handleFinish = () => {
    setShowScore(true);
    setQuizScore(score);
  };

  const handleReset = () => {
    setAnswers({});
    setShowScore(false);
    setMode(null);
  };

  const allAnswered = Object.keys(answers).length === soalPG.length;

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-red-500 border-b-3 border-ink py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/" className="text-2xl hover:scale-110 transition-transform text-white">←</Link>
          <div>
            <h1 className="font-heading text-2xl font-bold text-white flex items-center gap-2">
              🏆 Kastil Tantangan — Latihan
            </h1>
            <p className="text-sm text-white/70">Uji pemahamanmu tentang teks ulasan!</p>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {mode === null && !showScore && (
          <motion.div
            className="text-center space-y-6 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SiUlas pose="hello" size={140} />
            <h2 className="font-heading text-2xl font-bold text-ink">Pilih Mode Latihan</h2>
            <p className="text-ink-light text-sm max-w-md mx-auto">
              Kerjakan soal pilihan ganda dulu, lalu lanjut ke soal uraian untuk menguji pemahaman lebih dalam!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <BrutalButton variant="primary" size="lg" onClick={() => setMode('pg')} icon="📝">
                Pilihan Ganda (20 soal)
              </BrutalButton>
              <BrutalButton variant="secondary" size="lg" onClick={() => setMode('uraian')} icon="✍️">
                Soal Uraian (5 soal)
              </BrutalButton>
            </div>
          </motion.div>
        )}

        {mode === 'pg' && !showScore && (
          <>
            <div className="flex items-center justify-between mb-4">
              <BrutalButton variant="ghost" size="sm" onClick={() => setMode(null)} icon="←">
                Kembali
              </BrutalButton>
              <span className="font-heading font-bold text-sm text-ink-light">
                {Object.keys(answers).length}/{soalPG.length} terjawab
              </span>
            </div>

            <div className="space-y-4">
              {soalPG.map((soal, index) => (
                <QuestionCard
                  key={soal.id}
                  soal={soal}
                  index={index}
                  onAnswer={handleAnswer}
                  userAnswer={answers[soal.id] ?? null}
                />
              ))}
            </div>

            {allAnswered && (
              <motion.div
                className="mt-6 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <BrutalButton variant="accent" size="xl" onClick={handleFinish} icon="🏆">
                  Lihat Hasil!
                </BrutalButton>
              </motion.div>
            )}
          </>
        )}

        {mode === 'uraian' && !showScore && (
          <>
            <div className="flex items-center justify-between mb-4">
              <BrutalButton variant="ghost" size="sm" onClick={() => setMode(null)} icon="←">
                Kembali
              </BrutalButton>
            </div>
            <div className="space-y-4">
              {soalUraian.map((soal, index) => (
                <EssayCard key={soal.id} soal={soal} index={index} />
              ))}
            </div>
          </>
        )}

        {showScore && <ScoreBoard score={score} total={soalPG.length} onReset={handleReset} />}
      </div>

      <Footer />
    </div>
  );
}
