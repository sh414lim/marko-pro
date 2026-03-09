'use client';

import FadeInView from '@/components/animations/FadeInView';
import Timeline from '@/components/ui/Timeline';
import { profile } from '@/data/profile';

export default function About() {
  return (
    <section id="about" className="py-[120px] md:py-[160px] bg-bg">
      <div className="max-w-site mx-auto px-6 md:px-20">
        {/* 섹션 헤더 */}
        <FadeInView className="mb-16">
          <div className="flex items-end gap-4 mb-2">
            <span
              className="font-display text-primary/10 leading-none"
              style={{ fontSize: 'clamp(60px, 8vw, 100px)' }}
            >
              02
            </span>
            <h2
              className="font-display text-primary leading-none mb-2"
              style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
            >
              ABOUT
            </h2>
          </div>
          <div className="w-full h-px bg-primary/10" />
        </FadeInView>

        {/* 2컬럼 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-16 md:gap-12">
          {/* 좌측: 자기소개 + 개인정보 */}
          <FadeInView direction="left">
            <p className="font-korean text-lg leading-relaxed text-primary/80 mb-10">
              저는 기획, 개발, 배포 전 과정을 직접 책임지며, 단순 기능 구현에 그치지 않고 설계 단계부터 적극적으로 참여하는 엔지니어를 지향합니다.
            </p>
            <p className="font-korean text-base leading-relaxed text-primary/70 mb-10">
              도메인에 대한 깊은 이해와 유저 관점에서의 사고를 바탕으로, 사용자가 실제로 필요로 하는 기능과 편리한 경험을 설계하는 데 가치를 두고 있습니다. 피트니스, O2O, 글로벌, 커머스, MICE 등 다양한 도메인에서의 실 서비스 개발 경험을 통해 각 산업의 특성과 사용자 니즈를 빠르게 파악하고 반영하는 것을 강점으로 삼고 있습니다.
            </p>

            {/* 개인정보 인라인 */}
            <div className="flex flex-col gap-3">
              {[
                { label: 'AGE',      value: `${profile.age}세` },
                { label: 'LOCATION', value: profile.location },
                { label: 'EMAIL',    value: profile.email, href: `mailto:${profile.email}` },
                { label: 'PHONE',    value: profile.phone, href: `tel:${profile.phone}` },
              ].map(({ label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="font-mono text-xs text-accent w-20 shrink-0">{label}</span>
                  {href ? (
                    <a
                      href={href}
                      className="font-korean text-sm text-primary hover:text-accent transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="font-korean text-sm text-primary">{value}</span>
                  )}
                </div>
              ))}
            </div>
          </FadeInView>

          {/* 우측: 경력 타임라인 */}
          <FadeInView direction="right" delay={0.2}>
            <h3 className="font-mono text-xs text-accent tracking-widest mb-8">CAREER</h3>
            <Timeline careers={profile.careers} />
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
