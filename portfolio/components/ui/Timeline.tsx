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
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            {/* 점 */}
            <div className="absolute left-0 flex items-center justify-center" style={{ top: 0 }}>
              {career.current ? (
                <span className="relative flex h-6 w-6 items-center justify-center -left-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent/40 timeline-current" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
                </span>
              ) : (
                <span className="h-3 w-3 rounded-full bg-muted/60 border-2 border-muted mt-1.5" />
              )}
            </div>

            <div className="ml-2">
              <p className="font-mono text-xs text-muted mb-1">{career.period}</p>
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
