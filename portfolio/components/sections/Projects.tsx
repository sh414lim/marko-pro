'use client';

import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { clsx } from 'clsx';
import FadeInView from '@/components/animations/FadeInView';
import ProjectCard from '@/components/ui/ProjectCard';
import ProjectPanel from '@/components/ui/ProjectPanel';
import { projectsByCompany, projects } from '@/data/projects';
import type { Project } from '@/types';

const COMPANY_FULL: Record<string, string> = {
  '레오핏테크': '주식회사 레오핏테크',
  '레오소프트': 'LeoSoft (레오소프트)',
  '마이스허브': 'MiceHub (마이스허브)',
};

const COMPANY_PERIOD: Record<string, string> = {
  '레오핏테크': '2024.12 ~ 2026.03',
  '레오소프트': '2024.02 ~ 2024.12',
  '마이스허브': '2021.10 ~ 2024.02',
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-[120px] md:py-[160px] bg-bg">
      <div className="max-w-site mx-auto px-6 md:px-20">
        {/* 섹션 헤더 */}
        <FadeInView className="mb-16">
          <div className="flex items-end gap-4 mb-2">
            <span className="font-display text-primary/10 leading-none" style={{ fontSize: 'clamp(60px, 8vw, 100px)' }}>
              04
            </span>
            <h2 className="font-display text-primary leading-none mb-2" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
              PROJECTS
            </h2>
          </div>
          <div className="w-full h-px bg-primary/10" />
        </FadeInView>

        {/* 회사별 그룹 */}
        <div className="flex flex-col gap-20">
          {projectsByCompany.map(({ company, projects: companyProjects }) => (
            <FadeInView key={company}>
              {/* 회사 구분선 */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                <span className="font-mono text-xs text-accent tracking-widest">
                  {COMPANY_FULL[company] ?? company}
                </span>
                <span className="font-mono text-xs text-muted">
                  {COMPANY_PERIOD[company]}
                </span>
                <div className="flex-1 h-px bg-primary/10" />
              </div>

              {/* 카드 그리드 */}
              <LayoutGroup id={company}>
                <div className="grid grid-cols-3 gap-4">
                  <AnimatePresence mode="popLayout">
                    {companyProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={setSelectedProject}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </LayoutGroup>
            </FadeInView>
          ))}
        </div>
      </div>

      {/* 프로젝트 상세 패널 */}
      <ProjectPanel
        project={selectedProject}
        projects={projects}
        onClose={() => setSelectedProject(null)}
        onNavigate={setSelectedProject}
      />
    </section>
  );
}
