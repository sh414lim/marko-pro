'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Marquee from '@/components/ui/Marquee';
import { profile } from '@/data/profile';

const MARQUEE_ITEMS = ['REACT', 'FLUTTER', 'NEXT.JS', 'NODE.JS', 'TYPESCRIPT', 'SUPABASE'];
const titleWords = ['FULL-', 'STACK', 'DEV'];

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef(false);

  return (
    <motion.span
      onViewportEnter={() => {
        if (ref.current) return;
        ref.current = true;
        const controls = animate(0, to, {
          duration: 1.6,
          ease: 'easeOut',
          onUpdate: (v) => setVal(Math.round(v)),
        });
        return controls.stop;
      }}
    >
      {val}{suffix}
    </motion.span>
  );
}

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

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col bg-bg overflow-hidden"
    >
      {/* 배경 장식 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translate(${mousePos.x * 1.5}%, ${mousePos.y * 1.5}%)`, transition: 'transform 0.6s ease' }}
      >
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
        {/* 좌측: FULL- / STACK / DEV */}
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

            {/* accent 언더라인 */}
            <motion.div
              className="h-1 bg-accent mt-3"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            />
          </motion.div>

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

        {/* 우측 */}
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
            className="font-korean font-bold text-primary leading-tight mb-6"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            {profile.name}
          </h2>

          <div className="w-12 h-0.5 bg-accent mb-8" />

          {/* 숫자 스탯 — 설명 대신 숫자로 */}
          <motion.div
            className="flex gap-8 md:gap-12 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {[
              { num: 4, suffix: '년차', label: 'EXPERIENCE' },
              { num: 11, suffix: '개', label: 'SERVICES' },
              { num: 3, suffix: '곳', label: 'COMPANIES' },
            ].map(({ num, suffix, label }) => (
              <div key={label}>
                <p className="font-display text-primary leading-none mb-1"
                  style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                  <CountUp to={num} suffix={suffix} />
                </p>
                <p className="font-mono text-xs text-muted tracking-widest">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* iOS·Android 뱃지 */}
          <motion.p
            className="font-mono text-sm text-accent mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            iOS · Android 양대 마켓 배포 경험
          </motion.p>

        </motion.div>
      </motion.div>

      {/* 마키 */}
      <Marquee items={MARQUEE_ITEMS} separator="/" />

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
