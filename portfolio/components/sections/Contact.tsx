'use client';

import { motion } from 'framer-motion';
import FadeInView from '@/components/animations/FadeInView';
import { profile } from '@/data/profile';

const contactItems = [
  { icon: '✉', label: 'Email',   value: profile.email,    href: `mailto:${profile.email}` },
  { icon: '📱', label: 'Phone',   value: profile.phone,    href: `tel:${profile.phone}` },
  { icon: '📍', label: 'Address', value: profile.location, href: undefined },
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

        {/* 구분선 */}
        <div className="w-full h-px bg-white/10 mb-12" />

        {/* 연락처 항목 */}
        <div className="flex flex-col gap-6 mb-12">
          {contactItems.map(({ icon, label, value, href }, i) => (
            <FadeInView key={label} delay={i * 0.1}>
              <div className="flex items-center gap-4">
                <span className="text-xl w-8 shrink-0">{icon}</span>
                <div>
                  <p className="font-mono text-xs text-white/30 mb-0.5">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="font-korean text-base text-white/80 hover:text-white transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="font-korean text-base text-white/80">{value}</p>
                  )}
                </div>
              </div>
            </FadeInView>
          ))}
        </div>

        {/* CTA 버튼 */}
        <FadeInView delay={0.4}>
          <motion.a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-3 bg-accent text-white font-mono text-sm px-8 py-4"
            whileHover={{ backgroundColor: '#60A5FA', scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            이메일 보내기 →
          </motion.a>
        </FadeInView>

        {/* 구분선 */}
        <div className="w-full h-px bg-white/10 mt-16 mb-8" />

        {/* 푸터 카피라이트 */}
        <p className="font-mono text-xs text-white/30 text-center">
          © 2026 임성환. All rights reserved.
        </p>
      </div>
    </section>
  );
}
