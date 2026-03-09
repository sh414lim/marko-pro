"use client";

import FadeInView from "@/components/animations/FadeInView";
import Timeline from "@/components/ui/Timeline";
import { profile } from "@/data/profile";

const STATS = [
  { num: "04", label: "YEARS", desc: "경력" },
  { num: "11", label: "APPS", desc: "배포 완료" },
  { num: "03", label: "COMPANIES", desc: "근무 경험" },
];

export default function About() {
  return (
    <section id="about" className="py-[120px] md:py-[160px] bg-bg">
      <div className="max-w-site mx-auto px-6 md:px-20">
        {/* 섹션 헤더 */}
        <FadeInView className="mb-16">
          <div className="flex items-end gap-4 mb-2">
            <span
              className="font-display text-primary/10 leading-none"
              style={{ fontSize: "clamp(60px, 8vw, 100px)" }}
            >
              02
            </span>
            <h2
              className="font-display text-primary leading-none mb-2"
              style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
            >
              ABOUT
            </h2>
          </div>
          <div className="w-full h-px bg-primary/10" />
        </FadeInView>

        {/* 스탯 블록 */}
        <FadeInView className="mb-16">
          <div className="grid grid-cols-3 gap-4 md:gap-0 border border-primary/10">
            {STATS.map(({ num, label, desc }, i) => (
              <div
                key={label}
                className={`p-8 md:p-10 ${i < STATS.length - 1 ? "border-r border-primary/10" : ""}`}
              >
                <p
                  className="font-display text-primary leading-none mb-1"
                  style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
                >
                  {num}
                </p>
                <p className="font-mono text-xs text-accent tracking-widest mb-1">
                  {label}
                </p>
                <p className="font-korean text-sm text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </FadeInView>

        {/* 2컬럼 */}
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-16 md:gap-12">
          {/* 좌측 */}
          <FadeInView direction="left">
            <p
              className="font-korean leading-relaxed text-primary mb-4"
              style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
            >
              피트니스부터 글로벌 서비스까지.
            </p>
            <p
              className="font-korean leading-relaxed text-primary/70 mb-10"
              style={{ fontSize: "clamp(18px, 2vw, 24px)" }}
            >
              웹과 앱, 기획부터 배포까지
            </p>

            {/* 개인정보 — AGE 제거 */}
            <div className="flex flex-col gap-3">
              {[
                {
                  label: "EMAIL",
                  value: profile.email,
                  href: `mailto:${profile.email}`,
                },
                {
                  label: "PHONE",
                  value: profile.phone,
                  href: `tel:${profile.phone}`,
                },
                { label: "LOCATION", value: profile.location, href: undefined },
              ].map(({ label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="font-mono text-xs text-accent w-20 shrink-0">
                    {label}
                  </span>
                  {href ? (
                    <a
                      href={href}
                      className="font-mono text-sm text-primary hover:text-accent transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="font-korean text-sm text-primary">
                      {value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </FadeInView>

          {/* 우측: 타임라인 */}
          <FadeInView direction="right" delay={0.2}>
            <h3 className="font-mono text-xs text-accent tracking-widest mb-8">
              CAREER
            </h3>
            <Timeline careers={profile.careers} />
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
