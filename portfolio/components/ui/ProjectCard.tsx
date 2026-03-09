'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const PLATFORM_LABEL: Record<Project['platform'], string> = {
  WEB:  'WEB',
  APP:  'APP',
  BOTH: 'WEB + APP',
};

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const maxTags = 3;
  const visibleTags = project.tech.slice(0, maxTags);
  const extraCount = project.tech.length - maxTags;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      whileHover="hover"
      onClick={() => onClick(project)}
      className={clsx(
        'group relative cursor-pointer border border-primary/10 bg-surface p-6 md:p-8 overflow-hidden',
        'transition-colors duration-300 hover:bg-primary',
        project.size === 'large' ? 'col-span-3 md:col-span-2' : 'col-span-3 md:col-span-1'
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(project)}
      aria-label={`${project.name} 프로젝트 상세 보기`}
    >
      {/* 상단: 기간 + 회사 */}
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono text-xs text-muted group-hover:text-white/50 transition-colors">
          {project.period}
        </span>
        <div className="flex items-center gap-2">
          {/* 플랫폼 뱃지 */}
          <span className="font-mono text-xs border border-accent/40 text-accent px-2 py-0.5 group-hover:border-white/30 group-hover:text-white/60 transition-colors">
            {PLATFORM_LABEL[project.platform]}
          </span>
          <span className="font-mono text-xs text-muted group-hover:text-white/50 transition-colors">
            {project.company}
          </span>
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-full h-px bg-primary/10 group-hover:bg-white/10 transition-colors mb-5" />

      {/* 프로젝트명 */}
      <h3 className="font-display leading-none text-primary group-hover:text-white transition-colors mb-1"
        style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}>
        {project.name}
      </h3>
      <p className="font-korean text-sm text-muted group-hover:text-white/60 transition-colors mb-4">
        {project.nameKo}
      </p>

      {/* 핵심 한 줄 */}
      <p className="font-korean text-xs text-primary/60 group-hover:text-white/50 transition-colors mb-5 leading-relaxed">
        · {project.bullets[0]}
      </p>

      {/* 태그 + 기여도 */}
      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs border border-primary/20 text-muted px-2 py-0.5 group-hover:border-white/20 group-hover:text-white/50 transition-colors"
            >
              {tag}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="font-mono text-xs text-muted group-hover:text-white/40 transition-colors px-1">
              +{extraCount}
            </span>
          )}
        </div>
        <span className="font-mono text-xs text-accent group-hover:text-accent-lt transition-colors shrink-0">
          {project.contribution}%
        </span>
      </div>

      {/* VIEW 버튼 — 호버 시 등장 */}
      <motion.div
        className="absolute bottom-6 right-6 md:bottom-8 md:right-8"
        variants={{ hover: { opacity: 1, y: 0 } }}
        initial={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.2 }}
      >
        <span className="font-mono text-xs text-white/70 border border-white/30 px-3 py-1">
          → VIEW
        </span>
      </motion.div>
    </motion.article>
  );
}
