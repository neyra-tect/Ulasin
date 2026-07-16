'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', label: 'Peta', icon: '🗺️' },
  { href: '/materi', label: 'Materi', icon: '📚' },
  { href: '/contoh', label: 'Contoh', icon: '🍿' },
  { href: '/latihan', label: 'Kuis', icon: '🏆' },
  { href: '/lainnya', label: 'Rangkuman', icon: '📋' },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isLainnya = (href) => {
    if (href !== '/lainnya') return false;
    return ['/ringkasan', '/glosarium', '/panduan'].some((p) => pathname.startsWith(p));
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-3 border-ink">
      <div className="max-w-lg mx-auto flex items-center justify-around py-1">
        {navItems.map((item) => {
          const active = isActive(item.href) || isLainnya(item.href);
          return (
            <Link
              key={item.href}
              href={item.href === '/lainnya' ? '/ringkasan' : item.href}
              className="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-colors relative"
            >
              {active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-xl border-2 border-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="text-xl relative z-10">{item.icon}</span>
              <span
                className={`text-xs font-bold relative z-10 ${active ? 'text-primary' : 'text-ink-light'
                  }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
