'use client';

import { motion } from 'framer-motion';
import FadeInView from '@/components/animations/FadeInView';
import { profile } from '@/data/profile';

const contactItems = [
  { label: 'EMAIL',    value: profile.email,    href: `mailto:${profile.email}` },
  { label: 'PHONE',   value: profile.phone,    href: `tel:${profile.phone}` },
  { label: 'LOCATION',value: profile.location, href: undefined },
];

const titleWords = ["LET'S", 'WORK', 'TOGETHER'];

export default function Contact() {
  return (
    <section id="contact" className="py-[120px] md:py-[160px] bg-primary">
      <div className="max-w-site mx-auto px-6 md:px-20">
        {/* 대형 타이틀 */}
        <motion.div
          className="mb-16"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {titleWords.map((word) => (
            <motion.h2
              key={word}
              className="font-display text-white leading-none"
              style={{ fontSize: 'clamp(56px, 10vw, 140px)' }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
              }}
            >
              {word}
            </motion.h2>
          ))}
        </motion.div>

        <div className="w-full h-px bg-white/10 mb-12" />

        {/* 연락처 — 이모지 없이 텍스트 라벨 */}
        <div className="flex flex-col gap-6 mb-12">
          {contactItems.map(({ label, value, href }, i) => (
            <FadeInView key={label} delay={i * 0.1}>
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-white/30 w-20 shrink-0">{label} —</span>
                {href ? (
                  <a
                    href={href}
                    className="font-mono text-base text-white/80 hover:text-white transition-colors"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="font-korean text-base text-white/80">{value}</span>
                )}
              </div>
            </FadeInView>
          ))}
        </div>

        <div className="w-full h-px bg-white/10 mt-4 mb-8" />

        <p className="font-mono text-xs text-white/30 text-center">
          © 2026 임성환. All rights reserved.
        </p>
      </div>
    </section>
  );
}
