'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import FadeInView from '@/components/animations/FadeInView';
import TechTag from '@/components/ui/TechTag';
import { skills, proficiencyBars } from '@/data/skills';
import type { Skills } from '@/types';

type FilterKey = 'All' | keyof Skills;

const FILTER_TABS: FilterKey[] = ['All', 'Frontend', 'Mobile', 'Backend', 'Database', 'Tools'];

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('All');

  const allSkills = Object.entries(skills).flatMap(([category, items]) =>
    (items as string[]).map((name: string) => ({ name, category: category as keyof Skills }))
  );

  const filtered =
    activeFilter === 'All'
      ? allSkills
      : allSkills.filter((s) => s.category === activeFilter);

  return (
    <section id="skills" className="py-[120px] md:py-[160px] bg-surface">
      <div className="max-w-site mx-auto px-6 md:px-20">
        {/* 섹션 헤더 */}
        <FadeInView className="mb-16">
          <div className="flex items-end gap-4 mb-2">
            <span
              className="font-display text-primary/10 leading-none"
              style={{ fontSize: 'clamp(60px, 8vw, 100px)' }}
            >
              03
            </span>
            <h2
              className="font-display text-primary leading-none mb-2"
              style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
            >
              TECH STACK
            </h2>
          </div>
          <div className="w-full h-px bg-primary/10" />
        </FadeInView>

        {/* 필터 탭 */}
        <FadeInView className="mb-10">
          <div className="flex flex-wrap gap-2">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={clsx(
                  'font-mono text-xs px-4 py-2 border transition-colors duration-300',
                  activeFilter === tab
                    ? 'bg-accent text-white border-accent'
                    : 'border-primary/20 text-muted hover:border-accent hover:text-accent'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </FadeInView>

        {/* 태그 그리드 */}
        <div className="flex flex-wrap gap-3 mb-16 min-h-[80px]">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => (
              <motion.div
                key={`${skill.category}-${skill.name}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <TechTag label={skill.name} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 숙련도 바 */}
        <FadeInView>
          <h3 className="font-mono text-xs text-accent tracking-widest mb-8">PROFICIENCY</h3>
          <div className="flex flex-col gap-6">
            {proficiencyBars.map((bar) => (
              <ProficiencyBar key={bar.label} label={bar.label} percent={bar.percent} />
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

function ProficiencyBar({ label, percent }: { label: string; percent: number }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-mono text-sm text-primary">{label}</span>
        <span className="font-mono text-sm text-accent">{percent}%</span>
      </div>
      <div className="h-1.5 bg-primary/10 rounded-full overflow-hidden">
        <motion.div
          ref={ref}
          className="h-full bg-accent rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  );
}
