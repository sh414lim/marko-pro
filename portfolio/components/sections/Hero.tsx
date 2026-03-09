'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Marquee from '@/components/ui/Marquee';
import { profile } from '@/data/profile';

const MARQUEE_ITEMS = ['React', 'Flutter', 'Next.js', 'Node.js', 'TypeScript', 'Supabase'];

const titleWords = ['FULL-', 'STACK', 'DEV'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col bg-bg overflow-hidden"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E\")",
      }}
    >
      {/* 패럴랙스 배경 레이어 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * 2}%, ${mousePos.y * 2}%)`,
          transition: 'transform 0.3s ease',
        }}
      />

      {/* 메인 콘텐츠 */}
      <motion.div
        className="flex-1 grid grid-cols-1 md:grid-cols-3 max-w-site mx-auto w-full px-6 md:px-20 pt-24 pb-16"
        style={{ opacity, y }}
      >
        {/* 좌측: 타이틀 */}
        <div className="md:col-span-1 flex flex-col justify-between">
          <motion.div
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
            initial="hidden"
            animate="visible"
          >
            {titleWords.map((word) => (
              <motion.h1
                key={word}
                className="font-display text-primary leading-none select-none"
                style={{ fontSize: 'clamp(60px, 10vw, 140px)' }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
                }}
              >
                {word}
              </motion.h1>
            ))}
          </motion.div>

          {/* 에디토리얼 넘버링 */}
          <motion.p
            className="font-mono text-6xl md:text-7xl text-primary/10 font-bold leading-none mt-8 md:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            #001
          </motion.p>
        </div>

        {/* 우측: 개인 정보 */}
        <motion.div
          className="md:col-span-2 flex flex-col justify-center md:pl-16 mt-12 md:mt-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
        >
          <p className="font-mono text-xs text-accent tracking-widest mb-4">PORTFOLIO 2026</p>
          <h2 className="font-korean font-bold text-primary leading-tight mb-2"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
            {profile.name}
          </h2>
          <p className="font-korean text-lg text-muted mb-6">{profile.role}</p>

          <div className="w-12 h-0.5 bg-accent mb-6" />

          <p className="font-korean text-base md:text-lg text-primary/70 leading-relaxed max-w-md mb-10">
            {profile.intro}
          </p>

          {/* CTA 버튼 */}
          <div className="flex gap-4 flex-wrap">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-accent text-white font-mono text-sm px-6 py-3 hover:bg-accent-lt transition-colors"
            >
              VIEW WORK →
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 border border-primary text-primary font-mono text-sm px-6 py-3 hover:bg-primary hover:text-white transition-colors"
            >
              CONTACT
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* 마키 */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* 스크롤 인디케이터 */}
      <motion.button
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator"
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-label="아래로 스크롤"
      >
        <span className="font-mono text-xs text-muted tracking-widest">↓ SCROLL</span>
      </motion.button>
    </section>
  );
}
