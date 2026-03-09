'use client';

import { motion } from 'framer-motion';
import type { Career } from '@/types';

interface TimelineProps {
  careers: Career[];
}

export default function Timeline({ careers }: TimelineProps) {
  return (
    <div className="relative pl-8">
      {/* 세로 선 */}
      <motion.div
        className="absolute left-3 top-2 bottom-2 w-px bg-accent/30 origin-top"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      <div className="flex flex-col gap-10">
        {careers.map((career, i) => (
          <motion.div
            key={career.company}
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            {/* 점 */}
            <div className="absolute -left-8 top-1 flex items-center justify-center">
              {career.current ? (
                <span className="relative flex h-6 w-6 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent/40 timeline-current" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
                </span>
              ) : (
                <span className="h-3 w-3 rounded-full bg-muted/60 border-2 border-muted" />
              )}
            </div>

            <div>
              {/* 기간 + 총 재직 기간 */}
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-muted">{career.period}</span>
                <span className="font-mono text-xs text-accent/60 border border-accent/20 px-1.5 py-0.5">
                  {career.duration}
                </span>
              </div>
              <p className="font-korean font-bold text-primary text-base leading-tight">
                {career.company}
              </p>
              <p className="text-sm text-muted mt-0.5">{career.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
