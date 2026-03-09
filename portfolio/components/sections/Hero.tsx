'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Marquee from '@/components/ui/Marquee';
import { profile } from '@/data/profile';

const MARQUEE_ITEMS = ['React', 'Flutter', 'Next.js', 'Node.js', 'TypeScript', 'Supabase'];

// 직함 사이클 — FRONTEND 강조
const ROLES = ['FRONTEND', 'FULLSTACK', 'MOBILE'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 직함 3초마다 전환
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

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

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col bg-bg overflow-hidden"
    >
      {/* 배경 장식 — 마우스 패럴랙스 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translate(${mousePos.x * 1.5}%, ${mousePos.y * 1.5}%)`, transition: 'transform 0.6s ease' }}
      >
        {/* 우상단 대형 원 */}
        <motion.div
          className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full border border-accent/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -top-16 -right-16 w-[320px] h-[320px] rounded-full border border-accent/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        />
        {/* 좌하단 점 그리드 */}
        <div className="absolute bottom-32 left-8 grid grid-cols-5 gap-3 opacity-20">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-accent"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.08 }}
            />
          ))}
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <motion.div
        className="flex-1 grid grid-cols-1 md:grid-cols-3 max-w-site mx-auto w-full px-6 md:px-20 pt-24 pb-16"
        style={{ opacity, y }}
      >
        {/* 좌측: 대형 타이틀 */}
        <div className="md:col-span-1 flex flex-col justify-between">
          <div>
            {/* 사이클링 직함 */}
            <div className="mb-2 h-[clamp(60px,10vw,140px)] overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROLES[roleIndex]}
                  className="font-display leading-none select-none block"
                  style={{
                    fontSize: 'clamp(44px, 7vw, 100px)',
                    color: roleIndex === 0 ? '#1D4ED8' : 'transparent',
                    WebkitTextStroke: roleIndex !== 0 ? '1px #0A0F1E' : undefined,
                  }}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* DEV — 고정 */}
            <motion.h1
              className="font-display text-primary leading-none select-none"
              style={{ fontSize: 'clamp(60px, 10vw, 140px)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              DEV.
            </motion.h1>

            {/* 언더라인 애니메이션 */}
            <motion.div
              className="h-1 bg-accent mt-4"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            />
          </div>

          {/* 에디토리얼 넘버링 */}
          <motion.p
            className="font-mono text-primary/10 font-bold leading-none mt-8 md:mt-0"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            #001
          </motion.p>
        </div>

        {/* 우측: 개인 정보 */}
        <motion.div
          className="md:col-span-2 flex flex-col justify-center md:pl-16 mt-12 md:mt-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
        >
          <motion.p
            className="font-mono text-xs text-accent tracking-widest mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            PORTFOLIO 2026
          </motion.p>

          <h2
            className="font-korean font-bold text-primary leading-tight mb-2"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            {profile.name}
          </h2>

          {/* 직함 뱃지 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['Frontend', 'Flutter', 'Node.js'].map((tag, i) => (
              <motion.span
                key={tag}
                className="font-mono text-xs border border-accent/40 text-accent px-3 py-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <div className="w-12 h-0.5 bg-accent mb-6" />

          <p className="font-korean text-base md:text-lg text-primary/70 leading-relaxed max-w-md mb-10">
            {profile.intro}
          </p>

          {/* CTA 버튼 */}
          <motion.div
            className="flex gap-4 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
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
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 마키 */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* 스크롤 인디케이터 */}
      <motion.button
        className="absolute bottom-20 left-1/2 scroll-indicator flex flex-col items-center gap-1"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        aria-label="아래로 스크롤"
      >
        <span className="font-mono text-xs text-muted tracking-widest">↓ SCROLL</span>
      </motion.button>
    </section>
  );
}
