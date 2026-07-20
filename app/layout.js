import { Nunito, Fredoka } from 'next/font/google';
import './globals.css';
import { ProgressProvider } from '@/context/ProgressContext';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
});

const fredoka = Fredoka({
  variable: '--font-fredoka',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata = {
  title: 'Ulasin — Ruang Belajar Teks Ulasan Interaktif',
  description:
    'Media pembelajaran interaktif teks ulasan (resensi) untuk siswa SMP. Belajar struktur, kaidah kebahasaan, dan latihan soal teks ulasan dengan cara yang menyenangkan.',
  keywords: 'teks ulasan, resensi, bahasa indonesia, SMP, pembelajaran interaktif, media belajar',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${nunito.variable} ${fredoka.variable}`}>
      <body className="min-h-screen flex flex-col font-body antialiased">
        <ProgressProvider>
          <main className="flex-1">{children}</main>
        </ProgressProvider>
      </body>
    </html>
  );
}
