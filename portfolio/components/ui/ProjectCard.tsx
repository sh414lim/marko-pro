'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import type { Project } from '@/types';
import TechTag from './TechTag';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

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
        'group relative cursor-pointer border border-primary/10 bg-surface p-8 overflow-hidden',
        'transition-colors duration-300 hover:bg-primary',
        project.size === 'large' ? 'col-span-3 md:col-span-2' : 'col-span-3 md:col-span-1'
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(project)}
      aria-label={`${project.name} 프로젝트 상세 보기`}
    >
      {/* 상단 메타 */}
      <div className="flex items-start justify-between mb-6">
        <span className="font-mono text-xs text-muted group-hover:text-white/50 transition-colors">
          {project.number}
        </span>
        <span className="font-mono text-xs text-muted group-hover:text-white/50 transition-colors">
          {project.company}
        </span>
      </div>

      {/* 프로젝트명 */}
      <h3 className="font-display text-4xl md:text-5xl leading-none text-primary group-hover:text-white transition-colors mb-2">
        {project.name}
      </h3>
      <p className="font-korean text-sm text-muted group-hover:text-white/60 transition-colors mb-6">
        {project.nameKo}
      </p>

      {/* 구분선 */}
      <div className="w-12 h-px bg-primary/20 group-hover:bg-white/20 transition-colors mb-6" />

      {/* 태그 */}
      <div className="flex flex-wrap gap-2">
        {visibleTags.map((tag) => (
          <TechTag key={tag} label={tag} variant="default" className="group-hover:border-white/40 group-hover:text-white/70" />
        ))}
        {extraCount > 0 && (
          <span className="inline-block font-mono text-xs px-3 py-1 text-muted group-hover:text-white/50 transition-colors">
            +{extraCount}
          </span>
        )}
      </div>

      {/* VIEW 버튼 — 호버 시 등장 */}
      <motion.div
        className="absolute bottom-8 right-8"
        variants={{
          hover: { opacity: 1, y: 0 },
        }}
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
