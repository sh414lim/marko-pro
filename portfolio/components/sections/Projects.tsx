'use client';

import { useState } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { clsx } from 'clsx';
import FadeInView from '@/components/animations/FadeInView';
import ProjectCard from '@/components/ui/ProjectCard';
import ProjectPanel from '@/components/ui/ProjectPanel';
import { projects } from '@/data/projects';
import type { Project } from '@/types';

type FilterKey = 'All' | 'Web' | 'Mobile' | 'SaaS' | 'e-Commerce';

const FILTER_TABS: FilterKey[] = ['All', 'Web', 'Mobile', 'SaaS', 'e-Commerce'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter));

  return (
    <section id="work" className="py-[120px] md:py-[160px] bg-bg">
      <div className="max-w-site mx-auto px-6 md:px-20">
        {/* 섹션 헤더 */}
        <FadeInView className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-2">
            <div className="flex items-end gap-4">
              <span
                className="font-display text-primary/10 leading-none"
                style={{ fontSize: 'clamp(60px, 8vw, 100px)' }}
              >
                04
              </span>
              <h2
                className="font-display text-primary leading-none mb-2"
                style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
              >
                PROJECTS
              </h2>
            </div>

            {/* 필터 탭 */}
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
          </div>
          <div className="w-full h-px bg-primary/10" />
        </FadeInView>

        {/* 프로젝트 그리드 */}
        <LayoutGroup>
          <div className="grid grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </div>

      {/* 프로젝트 상세 패널 */}
      <ProjectPanel
        project={selectedProject}
        projects={filtered}
        onClose={() => setSelectedProject(null)}
        onNavigate={setSelectedProject}
      />
    </section>
  );
}
