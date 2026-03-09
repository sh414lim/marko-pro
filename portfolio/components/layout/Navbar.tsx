'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { useScrollPosition, useActiveSection } from '@/hooks/useScrollPosition';

const NAV_LINKS = [
  { label: 'ABOUT',   href: '#about'   },
  { label: 'SKILLS',  href: '#skills'  },
  { label: 'WORK',    href: '#work'    },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const scrollY = useScrollPosition();
  const activeSection = useActiveSection(['hero', 'about', 'skills', 'work', 'contact']);
  const [menuOpen, setMenuOpen] = useState(false);

  const isScrolled = scrollY > 40;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-30 transition-all duration-300',
          isScrolled ? 'backdrop-blur-md bg-bg/80 border-b border-primary/10 shadow-sm' : 'bg-transparent'
        )}
      >
        <div className="max-w-site mx-auto px-6 md:px-20 h-16 flex items-center justify-between">
          {/* 로고 */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="font-display text-2xl text-primary tracking-widest hover:text-accent transition-colors"
            aria-label="홈으로"
          >
            LSH
          </a>

          {/* 데스크탑 메뉴 */}
          <nav className="hidden md:flex items-center gap-8" aria-label="메인 내비게이션">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleLinkClick(e, href)}
                className={clsx(
                  'font-mono text-xs tracking-widest transition-colors',
                  activeSection === href.slice(1)
                    ? 'text-accent'
                    : 'text-muted hover:text-primary'
                )}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* 햄버거 버튼 */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
          >
            <span className={clsx('block h-0.5 w-6 bg-primary transition-all duration-300', menuOpen && 'rotate-45 translate-y-2')} />
            <span className={clsx('block h-0.5 w-6 bg-primary transition-all duration-300', menuOpen && 'opacity-0')} />
            <span className={clsx('block h-0.5 w-6 bg-primary transition-all duration-300', menuOpen && '-rotate-45 -translate-y-2')} />
          </button>
        </div>
      </header>

      {/* 모바일 풀스크린 메뉴 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-20 bg-bg flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col items-center gap-10" aria-label="모바일 내비게이션">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={(e) => handleLinkClick(e, href)}
                  className="font-display text-5xl text-primary hover:text-accent transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  {label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
