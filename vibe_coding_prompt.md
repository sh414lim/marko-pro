# 포트폴리오 홈페이지 바이브코딩 프롬프트

---

## 🧠 역할 부여

너는 시니어 프론트엔드 개발자이자 UI/UX 전문가야.
내 개인 포트폴리오 홈페이지를 처음부터 끝까지 완성해줘.
아래 기획서와 이력서 데이터를 완벽하게 반영해서 실제 배포 가능한 수준으로 만들어.

---

## 📁 첨부 파일

- `portfolio_plan.md` — UI/UX 기획서 (디자인 시스템, 섹션별 상세 명세, 컴포넌트, 애니메이션 가이드 포함)
- `resume_lim_sunghwan.md` — 이력서 원본 데이터 (모든 텍스트 콘텐츠는 이 파일 기준)

> 두 파일을 반드시 끝까지 읽고 시작해. 임의로 내용을 만들거나 생략하지 마.

---

## 🛠 기술 스택 (변경 금지)

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Font:** Google Fonts via `next/font/google` (Bebas Neue · DM Sans · Noto Sans KR · JetBrains Mono) — `@import` CSS 방식 사용 금지
- **Hosting:** Vercel

---

## 📐 디자인 원칙 (반드시 준수)

- 컨셉: **"Code as Craft"** — Editorial Brutalist + Refined Minimal
- 컬러: Primary `#0A0F1E` · Accent `#1D4ED8` · Accent Light `#60A5FA` · BG `#F0F4FF`
- 모든 CSS 값은 `globals.css`의 CSS 변수(`--color-*`, `--font-*`)로 관리
- 폰트 크기는 `clamp()` 사용 (Hero Display 기준: `clamp(80px, 12vw, 160px)`)
- 스페이싱 기준 단위: `4px` (모든 여백은 4의 배수)
- `transition: all 0.3s ease` 전역 적용

---

## 📋 구현 순서 (이 순서대로 진행해)

### STEP 1 — 프로젝트 세팅

```bash
npx create-next-app@latest portfolio --typescript --tailwind --app
cd portfolio
npm install framer-motion clsx
```

`tailwind.config.ts`, `globals.css`, `types/index.ts` 먼저 완성해.

---

### STEP 2 — 데이터 파일 작성

`data/profile.ts`, `data/projects.ts`, `data/skills.ts` 3개 파일을
`resume_lim_sunghwan.md` 내용 그대로 TypeScript 데이터로 변환해서 작성해.
절대 내용을 요약하거나 생략하지 마.

---

### STEP 3 — 공통 컴포넌트

아래 순서로 만들어:

1. `hooks/useScrollPosition.ts` — 스크롤 위치 감지 커스텀 훅
2. `components/animations/FadeInView.tsx` — 스크롤 트리거 래퍼
3. `components/ui/TechTag.tsx` — 기술 태그 뱃지
4. `components/ui/Marquee.tsx` — 무한 마키 롤링
5. `components/ui/Timeline.tsx` — 경력 타임라인
6. `components/ui/ProjectCard.tsx` — 프로젝트 카드 (large/small)
7. `components/ui/ProjectPanel.tsx` — 프로젝트 상세 사이드 패널
8. `components/layout/Navbar.tsx` — 고정 상단 네비게이션
9. `components/layout/Footer.tsx` — 푸터

---

### STEP 4 — 섹션 컴포넌트

아래 순서로 만들어:

1. `components/sections/Hero.tsx`
2. `components/sections/About.tsx`
3. `components/sections/Skills.tsx`
4. `components/sections/Projects.tsx`
5. `components/sections/Contact.tsx`

---

### STEP 5 — 페이지 조합 및 마무리

`app/layout.tsx`, `app/page.tsx` 완성 후 전체 동작 확인.

---

## 🎨 섹션별 핵심 요구사항

### Hero
- 풀뷰포트(`100vh`) 2컬럼 레이아웃
- 좌측: Bebas Neue로 `FULL- / STACK / DEV` 수직 대형 타이틀
- 좌측 하단: 에디토리얼 넘버링 `#001`
- 우측: 이름, 직함, 자기소개 한 줄, CTA 버튼
- 하단: 기술 스택 무한 마키 (딥 네이비 배경, `React · Flutter · Next.js · Node.js · TypeScript · Supabase ▶`)
- 진입 애니메이션: 글자 stagger 페이드인 (`staggerChildren: 0.08`)
- 스크롤 인디케이터: `↓ SCROLL` 바운스

### About
- 비대칭 2컬럼 (좌 55% / 우 45%)
- 좌측: 자기소개 텍스트 + 개인정보 인라인
- 우측: 경력 버티컬 타임라인 (레오핏테크 → 레오소프트 → 마이스허브)
- 현재 직장 점: pulse 애니메이션 + Accent 블루
- 타임라인 선: 스크롤 진입 시 `scaleY 0→1`

### Skills
- 상단 필터 탭: `[All]` `[Frontend]` `[Mobile]` `[Backend]` `[Database]` `[Tools]`
- 태그 그리드 + 하단 숙련도 바 3개 (React/Next.js 90% · Flutter 85% · Node.js 70%)
- 숙련도 바: 뷰포트 진입 시 `width 0→%` 애니메이션

### Projects
- 불규칙 매거진 그리드 (large 60% / small 40%)
- 카드 호버: 배경 `#0A0F1E`, 텍스트 white 전환
- 카드 클릭: ProjectPanel 사이드 패널 오픈
- 필터 탭: `[All]` `[Web]` `[Mobile]` `[SaaS]` `[e-Commerce]`
- Framer Motion `layout` prop으로 필터 시 카드 재배치

### Contact
- 풀 너비 다크 배경 (`#0A0F1E`)
- 대형 타이틀: `LET'S / WORK / TOGETHER` (Bebas Neue 3줄)
- 이메일, 전화, 주소 + CTA 버튼 `[이메일 보내기 →]`
- Footer: `© 2026 임성환. All rights reserved.`

---

## ✅ 반드시 지켜야 할 규칙

- [ ] 이력서에 있는 모든 프로젝트(11개) 빠짐없이 구현 (MICE CRM 앱 포함)
- [ ] 이력서에 있는 모든 텍스트 내용 그대로 사용 (임의 수정 금지)
- [ ] TypeScript 인터페이스 완전히 정의 (`types/index.ts`)
- [ ] 모든 컴포넌트 `'use client'` 여부 명확히 구분
- [ ] 반응형: 모바일(`< 768px`) / 태블릿(`768px~`) / 데스크탑(`1024px~`) 3단계
- [ ] 모바일에서 ProjectPanel은 풀스크린 오버레이
- [ ] 모바일 Navbar는 햄버거 메뉴
- [ ] `next/image` 사용 (이미지 최적화)
- [ ] `ESC` 키로 ProjectPanel 닫힘 처리
- [ ] `mailto:` / `tel:` 링크 동작
- [ ] 포커스 스타일 (`outline: 2px solid #1D4ED8`) 접근성 처리

---

## ❌ 하지 말아야 할 것

- CSS 인라인 스타일 남발 (Tailwind 클래스로)
- `any` 타입 사용
- 컴포넌트 하나에 모든 로직 몰아넣기
- 데이터 하드코딩 (반드시 `data/` 폴더에서 import)
- 이미지 없다고 섹션 생략하기 (placeholder 처리)
- 애니메이션 빠뜨리기 (기획서의 애니메이션 명세 모두 구현)

---

## 🚀 시작 방법

위 내용을 모두 숙지했으면 **STEP 1부터 순서대로** 시작해.
각 STEP이 끝날 때마다 다음 STEP으로 넘어간다고 알려줘.
코드는 전체 파일 단위로 완성해서 보여줘. 생략(`// ...`) 하지 마.
