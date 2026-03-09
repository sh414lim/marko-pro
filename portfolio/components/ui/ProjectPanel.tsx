'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/types';
import TechTag from './TechTag';

interface ProjectPanelProps {
  project: Project | null;
  projects: Project[];
  onClose: () => void;
  onNavigate: (project: Project) => void;
}

export default function ProjectPanel({
  project,
  projects,
  onClose,
  onNavigate,
}: ProjectPanelProps) {
  const currentIndex = projects.findIndex((p) => p.id === project?.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* 오버레이 */}
          <motion.div
            className="fixed inset-0 z-40 bg-primary/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />

          {/* 패널 */}
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 w-full md:w-[560px] bg-surface overflow-y-auto flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            role="dialog"
            aria-label={`${project.name} 프로젝트 상세`}
          >
            {/* 헤더 */}
            <div className="sticky top-0 bg-surface z-10 flex items-center justify-between px-8 py-5 border-b border-primary/10">
              <button
                onClick={onClose}
                className="font-mono text-xs text-muted hover:text-primary transition-colors flex items-center gap-2"
                aria-label="패널 닫기"
              >
                ← 닫기
              </button>
              <span className="font-mono text-xs text-muted">
                {project.number} / {String(projects.length).padStart(2, '0')}
              </span>
            </div>

            {/* 본문 */}
            <div className="flex-1 px-8 py-10">
              {/* 타이틀 */}
              <div className="mb-8">
                <span className="font-mono text-xs text-accent mb-2 block">{project.company}</span>
                <h2 className="font-display text-5xl md:text-6xl text-primary leading-none mb-2">
                  {project.name}
                </h2>
                <p className="font-korean text-base text-muted">{project.nameKo}</p>
              </div>

              {/* 메타 정보 */}
              <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-bg rounded-sm">
                <div>
                  <p className="font-mono text-xs text-muted mb-1">ROLE</p>
                  <p className="font-korean text-sm text-primary">{project.role}</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-muted mb-1">PERIOD</p>
                  <p className="font-mono text-sm text-primary">{project.period}</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-muted mb-1">CONTRIBUTION</p>
                  <p className="font-mono text-sm text-accent font-bold">{project.contribution}%</p>
                </div>
              </div>

              {/* 구분선 */}
              <div className="w-full h-px bg-primary/10 mb-8" />

              {/* 개요 */}
              <section className="mb-8">
                <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-3">
                  Overview
                </h3>
                <p className="font-korean text-base text-primary/80 leading-relaxed">
                  {project.overview}
                </p>
              </section>

              {/* 주요 기능 */}
              <section className="mb-8">
                <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
                  Key Features
                </h3>
                <ul className="flex flex-col gap-2">
                  {project.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-3 font-korean text-sm text-primary/80 leading-relaxed">
                      <span className="text-accent shrink-0 mt-0.5">·</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 기술 스택 */}
              <section>
                <h3 className="font-mono text-xs text-accent uppercase tracking-widest mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tag) => (
                    <TechTag key={tag} label={tag} />
                  ))}
                </div>
              </section>
            </div>

            {/* 이전/다음 내비게이션 */}
            <div className="sticky bottom-0 bg-surface border-t border-primary/10 px-8 py-4 flex justify-between">
              <button
                onClick={() => prevProject && onNavigate(prevProject)}
                disabled={!prevProject}
                className="font-mono text-xs text-muted hover:text-primary disabled:opacity-30 transition-colors"
              >
                ← {prevProject?.name ?? '처음'}
              </button>
              <button
                onClick={() => nextProject && onNavigate(nextProject)}
                disabled={!nextProject}
                className="font-mono text-xs text-muted hover:text-primary disabled:opacity-30 transition-colors"
              >
                {nextProject?.name ?? '마지막'} →
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
