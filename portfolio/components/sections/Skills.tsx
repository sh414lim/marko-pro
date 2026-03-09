'use client';

import { motion } from 'framer-motion';
import FadeInView from '@/components/animations/FadeInView';
import { skills } from '@/data/skills';
import type { Skills } from '@/types';

const LEVELS: Record<string, number> = {
  React: 4, 'Next.js': 4, TypeScript: 4, 'Tailwind CSS': 4, 'Vue.js': 3, 'Vanilla JS': 3,
  Flutter: 4, Dart: 4,
  'Node.js': 3, 'Next.js API Routes': 3, 'Supabase Edge Functions': 3,
  'Supabase (PostgreSQL)': 3, MySQL: 3, Firebase: 3,
};

const PROFICIENCY = [
  { label: 'React / Next.js', dots: 4, tag: '주력' },
  { label: 'Flutter',         dots: 4, tag: '주력' },
  { label: 'Node.js',         dots: 3, tag: '중급' },
];

const CATEGORY_LABELS: Record<keyof Skills, string> = {
  Frontend: 'FRONTEND',
  Mobile:   'MOBILE',
  Backend:  'BACKEND',
  Database: 'DATABASE',
  Tools:    'TOOLS & API',
};

function Dots({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <span className="flex gap-1 items-center">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`inline-block w-2 h-2 rounded-full ${i < filled ? 'bg-accent' : 'bg-accent/20'}`}
        />
      ))}
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-[120px] md:py-[160px] bg-surface">
      <div className="max-w-site mx-auto px-6 md:px-20">
        {/* 섹션 헤더 */}
        <FadeInView className="mb-16">
          <div className="flex items-end gap-4 mb-2">
            <span className="font-display text-primary/10 leading-none" style={{ fontSize: 'clamp(60px, 8vw, 100px)' }}>
              03
            </span>
            <h2 className="font-display text-primary leading-none mb-2" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
              TECH STACK
            </h2>
          </div>
          <div className="w-full h-px bg-primary/10" />
        </FadeInView>

        {/* 카테고리 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {(Object.entries(skills) as [keyof Skills, string[]][]).map(([category, items]) => (
            <FadeInView key={category}>
              <div className="border border-primary/10 p-6 h-full">
                <h3 className="font-mono text-xs text-accent tracking-widest mb-4">
                  {CATEGORY_LABELS[category]}
                </h3>
                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <div key={item} className="flex items-center justify-between">
                      <span className="font-mono text-sm text-primary">{item}</span>
                      {LEVELS[item] !== undefined && <Dots filled={LEVELS[item]} />}
                    </div>
                  ))}
                </div>
              </div>
            </FadeInView>
          ))}
        </div>

        {/* 숙련도 요약 */}
        <FadeInView>
          <h3 className="font-mono text-xs text-accent tracking-widest mb-6">PROFICIENCY</h3>
          <div className="flex flex-col gap-5 mb-8">
            {PROFICIENCY.map(({ label, dots, tag }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="font-mono text-sm text-primary w-40 shrink-0">{label}</span>
                <Dots filled={dots} />
                <span className="font-mono text-xs text-accent">{tag}</span>
              </div>
            ))}
          </div>

          {/* 차별점 */}
          <div className="border-l-2 border-accent pl-4">
            <p className="font-mono text-sm text-primary">
              iOS · Android 양대 마켓 배포 경험 다수
            </p>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
