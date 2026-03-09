# PORTFOLIO WEBSITE — UI/UX 기획서 및 바이브코딩 개발 가이드

> 임성환 | 풀스택 개발자 | 2026.03

---

## 문서 정보

| 항목 | 내용 |
|------|------|
| 프로젝트명 | 임성환 개인 포트폴리오 홈페이지 |
| 작성 목적 | 바이브코딩 기반 개발을 위한 UI/UX 설계 문서 |
| 타겟 사용자 | 채용 담당자, 클라이언트, 협업 개발자 |
| 기술 스택 | Next.js 14 · TypeScript · Tailwind CSS · Framer Motion |
| 배포 환경 | Vercel |
| 작성일 | 2026.03 |

---

## 01. 프로젝트 개요

### 1.1 목적 및 목표

- 개발 경력과 프로젝트를 직관적으로 전달하는 온라인 포트폴리오 구축
- 채용 담당자가 1분 내에 핵심 역량을 파악할 수 있는 구조 설계
- 기술력과 기획력을 동시에 보여주는 인터랙티브 경험 제공
- 이력서 PDF와 연동되는 디지털 확장판 역할 수행

### 1.2 핵심 컨셉

| 항목 | 내용 |
|------|------|
| 컨셉 키워드 | "Code as Craft" — 개발을 하나의 장인 정신으로 표현 |
| 디자인 톤 | Editorial Brutalist + Refined Minimal |
| 핵심 경험 | 스크롤 기반 스토리텔링 — 방문자가 자연스럽게 경력을 탐색 |
| 기억에 남는 요소 | 타이포그래피 중심의 임팩트 있는 Hero + 매거진식 프로젝트 카드 |

---

## 02. 디자인 시스템

### 2.1 컬러 팔레트

| CSS 변수 | HEX | 사용 위치 |
|----------|-----|----------|
| `--color-primary` | `#0A0F1E` | 메인 텍스트, 헤더 배경, 진한 배경 |
| `--color-accent` | `#1D4ED8` | CTA 버튼, 링크, 강조 텍스트, 섹션 타이틀 |
| `--color-accent-lt` | `#60A5FA` | 호버 상태, 보조 강조, 태그 테두리 |
| `--color-bg` | `#F0F4FF` | 페이지 기본 배경 |
| `--color-surface` | `#FFFFFF` | 카드 배경 |
| `--color-muted` | `#64748B` | 부연 설명, 날짜, 메타 정보 |
| `--color-dark-bg` | `#0A0F1E` | Contact 섹션 다크 배경 |

### 2.2 타이포그래피

| 역할 | 폰트명 | 굵기 | 사용 위치 |
|------|--------|------|----------|
| Display | Bebas Neue | Regular 400 | Hero 타이틀, 섹션 넘버링 (영문 대형) |
| Heading KR | Noto Sans KR | Bold 700 | 섹션 제목, 프로젝트명 (한국어) |
| Body EN | DM Sans | Regular 400 / Medium 500 | 설명 텍스트, 버튼 (영문) |
| Mono | JetBrains Mono | Regular 400 | 기술 스택 태그, 코드, 날짜 |

**Google Fonts — Next.js 14 방식 (`next/font/google` 사용, `@import` 금지):**
```tsx
// app/layout.tsx
import { Bebas_Neue, DM_Sans, Noto_Sans_KR, JetBrains_Mono } from 'next/font/google';
```

### 2.3 타입 스케일

| 이름 | 크기 | 줄 간격 | 사용 예 |
|------|------|---------|---------|
| Hero Display | `clamp(80px, 12vw, 160px)` | 0.9 | FULL-STACK DEV |
| Section Number | `clamp(60px, 8vw, 100px)` | 1.0 | 01, 02, 03... |
| Section Title | `clamp(32px, 5vw, 56px)` | 1.1 | ABOUT, WORK |
| Project Name | `24px – 32px` | 1.2 | DevGym, Bro |
| Body Large | `18px` | 1.7 | 자기소개 텍스트 |
| Body Regular | `15px – 16px` | 1.6 | 불릿 항목 설명 |
| Caption / Tag | `12px – 13px` | 1.4 | 기술 태그, 날짜 |

### 2.4 스페이싱 & 그리드

- 기준 단위: `4px (0.25rem)` — 모든 여백은 4의 배수
- 페이지 최대 너비: `1280px`, 좌우 패딩: `24px` (모바일) / `80px` (데스크탑)
- 섹션 상하 패딩: `120px` (데스크탑) / `80px` (모바일)
- 컴포넌트 간격: `48px` (섹션 내), `16px` (요소 간)

### 2.5 글로벌 CSS 변수

```css
:root {
  --color-primary:   #0A0F1E;
  --color-accent:    #1D4ED8;
  --color-accent-lt: #60A5FA;
  --color-bg:        #F0F4FF;
  --color-surface:   #FFFFFF;
  --color-muted:     #64748B;
  --color-dark-bg:   #0A0F1E;

  --font-display: 'Bebas Neue', sans-serif;
  --font-sans:    'DM Sans', sans-serif;
  --font-korean:  'Noto Sans KR', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  --transition-base: all 0.3s ease;
  --max-width: 1280px;
}
```

---

## 03. 페이지 구조 (Information Architecture)

### 3.1 전체 구조

SPA(Single Page Application) 방식 — 단일 페이지 내 섹션 앵커 스크롤

| 섹션 | 앵커 ID | 한국어 명 | 핵심 목적 |
|------|---------|----------|----------|
| `01 HERO` | `#hero` | 히어로 | 첫인상 — 이름, 직함, 핵심 메시지 전달 |
| `02 ABOUT` | `#about` | 소개 | 자기소개 텍스트 + 경력 타임라인 |
| `03 SKILLS` | `#skills` | 기술 스택 | 보유 기술 시각화 + 카테고리 필터 |
| `04 WORK` | `#work` | 프로젝트 | 전체 프로젝트 카드 그리드 |
| `05 DETAIL` | 모달/패널 | 프로젝트 상세 | 클릭 시 상세 내용 오버레이 |
| `06 CONTACT` | `#contact` | 연락처 | 이메일, 전화, 다크 배경 CTA |

### 3.2 네비게이션 구조

- 고정 상단 Navbar (스크롤 시 배경 `backdrop-blur` 적용)
- 좌측: 로고 또는 이니셜 `LSH`
- 우측: `ABOUT` · `SKILLS` · `WORK` · `CONTACT` 앵커 링크
- 모바일: 햄버거 메뉴 → 풀스크린 오버레이 메뉴
- 현재 섹션 `Intersection Observer`로 감지 → 해당 메뉴 아이템 액티브 표시

---

## 04. 섹션별 상세 UI/UX 기획

---

### SECTION 01 — HERO

> 방문자의 첫인상을 결정하는 풀뷰포트 히어로 섹션. 이름과 직함을 압도적 타이포그래피로 표현.

#### 레이아웃 & 구성요소

```
┌─────────────────────────────────────────────────┐
│  [좌측 1/3]              [우측 2/3]              │
│                                                 │
│  FULL-                   임성환                  │
│  STACK                   풀스택 개발자            │
│  DEV                     ─────────────────      │
│                          기획부터 배포까지        │
│  ────────                전 과정을 책임지는       │
│  #001                    엔지니어                │
│                                                 │
│  [하단 마키] React · Flutter · Next.js · Node.js ▶│
└─────────────────────────────────────────────────┘
```

- 레이아웃: 풀뷰포트(`100vh`) 에디토리얼 스플릿 2컬럼
- 좌측 1/3: 대형 Display 폰트로 `FULL- / STACK / DEV` 수직 배치
- 우측 2/3: 이름(임성환), 직함(풀스택 개발자), 한줄 소개, CTA 버튼
- 좌측 하단: 에디토리얼 넘버링 `#001`
- 배경: 쿨 화이트(`#F0F4FF`) + 미세 노이즈 텍스처 CSS 처리
- 하단 고정: 기술 스택 무한 마키 롤링 텍스트 바 (딥 네이비 배경)
- 마키 내용: `React · Flutter · Next.js · Node.js · TypeScript · Supabase ▶` (반복)
- 스크롤 유도 인디케이터: 하단 중앙 `↓ SCROLL` 바운스 애니메이션

#### 인터랙션 & 애니메이션

- 진입 시: 타이틀 글자 하나씩 스태거 페이드인 (`staggerChildren: 0.08s`)
- 진입 시: 우측 텍스트 블록 아래에서 위로 슬라이드업 (`delay: 0.4s`)
- 마우스 패럴랙스: 배경 레이어 마우스 이동에 따라 2% 오프셋
- 마키 롤링: CSS `animation: infinite linear` (Framer Motion 불필요)
- CTA 버튼 호버: 배경 `#1D4ED8 → #60A5FA`
- 스크롤 다운 시 Hero 텍스트 opacity 0으로 패럴랙스 페이드아웃

---

### SECTION 02 — ABOUT

> 개발자의 철학과 경력 히스토리를 스토리텔링 방식으로 전달. 타임라인으로 경력 흐름 시각화.

#### 레이아웃 & 구성요소

```
┌─────────────────────────────────────────────────┐
│  ABOUT                                          │
│  ───────────────────────────────────────────    │
│                                                 │
│  [좌측 55%]                  [우측 45%]          │
│                                                 │
│  자기소개 텍스트              경력 타임라인        │
│  (3~4줄, 큰 폰트)            ● 레오핏테크        │
│                              │ 2024.12~2026.03  │
│  나이: 30세                  ● 레오소프트        │
│  서울 강동구                  │ 2024.02~2024.12  │
│  sh414lim@gmail.com          ● 마이스허브        │
│                                2021.10~2024.02  │
└─────────────────────────────────────────────────┘
```

- 레이아웃: 비대칭 2컬럼 (좌 55% 텍스트 / 우 45% 타임라인)
- 좌측: 자기소개 텍스트 + 개인정보 인라인 표시
- 우측: 경력 버티컬 타임라인 (3개 점)
- 현재 직장(레오핏테크) 점: Accent 블루 강조

#### 인터랙션 & 애니메이션

- 스크롤 진입 시: 좌측 텍스트 좌에서 우로 슬라이드인
- 스크롤 진입 시: 타임라인 선이 위에서 아래로 `scaleY 0→1` grow 애니메이션
- 타임라인 점: 순서대로 `0.2s` 딜레이 차이를 두고 팝인 (`scale 0→1`)
- 현재 회사 점: 파란 `pulse` 링 애니메이션 (CSS keyframe)

---

### SECTION 03 — SKILLS

> 보유 기술을 카테고리별로 필터링할 수 있는 인터랙티브 기술 스택 섹션.

#### 레이아웃 & 구성요소

```
┌─────────────────────────────────────────────────┐
│  TECH STACK                                     │
│  ───────────────────────────────────────────    │
│                                                 │
│  [All] [Frontend] [Mobile] [Backend] [Database] [Tools]
│                                                 │
│  ┌──────────┐ ┌─────────┐ ┌────────────┐       │
│  │  React   │ │ Next.js │ │ TypeScript │       │
│  └──────────┘ └─────────┘ └────────────┘       │
│  ┌──────────┐ ┌──────────┐ ┌─────────┐         │
│  │ Flutter  │ │ Supabase │ │ Node.js │         │
│  └──────────┘ └──────────┘ └─────────┘         │
│                                                 │
│  숙련도  React/Next.js  ████████░░  90%         │
│          Flutter        ███████░░░  85%         │
│          Node.js        ██████░░░░  70%         │
└─────────────────────────────────────────────────┘
```

- 상단 필터 탭: `[All]` `[Frontend]` `[Mobile]` `[Backend]` `[Database]` `[Tools]`
- 태그 그리드: `flex-wrap` 방식
- 하단: 주요 기술 숙련도 바 3개

#### 인터랙션 & 애니메이션

- 필터 탭 클릭: 해당 태그 외 나머지 `opacity: 0.2` fade (`transition: 0.3s`)
- 태그 호버: 배경 `#1D4ED8`, 텍스트 `white` 전환
- 숙련도 바: 뷰포트 진입 시 `width: 0 → 퍼센트%` 채워짐 (`duration: 1s ease-out`)
- 탭 활성 상태: 배경 `#1D4ED8` + 텍스트 `white`

---

### SECTION 04 — WORK (프로젝트 목록)

> 전체 프로젝트를 매거진 스타일 그리드로 표시. 필터링 + 카드 인터랙션.

#### 레이아웃 & 구성요소

```
┌─────────────────────────────────────────────────┐
│  PROJECTS                     [All][Web][Mobile] │
│  ───────────────────────────────────────────    │
│                                                 │
│  ┌──────────────────────┐  ┌──────────────┐    │
│  │  01                  │  │  02          │    │
│  │  DevGym              │  │  Bro         │    │
│  │  체육관 관리 SaaS     │  │              │    │
│  │  [large 60%]         │  │  [small 40%] │    │
│  │  React · Flutter     │  │  Flutter     │    │
│  └──────────────────────┘  └──────────────┘    │
│                                                 │
│  ┌──────────────┐  ┌──────────────────────┐    │
│  │  03          │  │  04                  │    │
│  │  PlayPlanet  │  │  Golfring            │    │
│  │  [small 40%] │  │  [large 60%]         │    │
│  └──────────────┘  └──────────────────────┘    │
└─────────────────────────────────────────────────┘
```

**카드 내부 구조:**
```
┌──────────────────────────────┐
│  01                  레오핏테크 │  ← 넘버 + 회사명
│  ────────────────────────    │
│  DevGym                      │  ← 프로젝트명 (대형 bold)
│  체육관 관리 SaaS 플랫폼       │  ← 한줄 설명
│  ────────────────────────    │
│  React · Flutter · +2        │  ← 태그 (최대 3개 + N)
│                   [→ VIEW]   │  ← 호버 시만 표시
└──────────────────────────────┘
```

- 대형 카드 (`large`): 가로 60% — DevGym, AboutKorea, Golfring
- 소형 카드 (`small`): 가로 40% — Bro, Wooring, 기타

#### 인터랙션 & 애니메이션

- 카드 호버: 배경 `#0A0F1E`, 텍스트 전체 white 전환 (`transition: 0.3s`)
- 카드 호버: `[→ VIEW]` 버튼 `translateY(0)` 슬라이드업
- 카드 클릭: 프로젝트 상세 사이드 패널 오픈
- 필터 클릭: 해당 카테고리 카드만 남기고 나머지 `fade out + scale 0.95`
- 스크롤 진입: 카드 아래서 위로 stagger 순차 등장 (`0.1s` 딜레이)

---

### SECTION 05 — PROJECT DETAIL (상세 패널)

> 카드 클릭 시 오픈되는 슬라이드 사이드 패널. 프로젝트 상세 정보 표시.

#### 레이아웃 & 구성요소

```
┌────────────────────────────────────────────┐
│ [오버레이 배경 rgba(10,15,30,0.6)]          │
│                    ┌──────────────────────┐│
│                    │ ← 닫기    01 / 10    ││
│                    │ ─────────────────── ││
│                    │ DevGym              ││
│                    │ 체육관 관리 SaaS     ││
│                    │ ─────────────────── ││
│                    │ 역할 · 기간 · 기여도 ││
│                    │                     ││
│                    │ 개요                 ││
│                    │ 텍스트...            ││
│                    │                     ││
│                    │ 주요 기능            ││
│                    │ · 관리자 웹 시스템   ││
│                    │ · 출석 체크 앱       ││
│                    │                     ││
│                    │ Tech Stack          ││
│                    │ [React][Flutter]    ││
│                    │                     ││
│                    │ [← 이전]  [다음 →]  ││
│                    └──────────────────────┘│
└────────────────────────────────────────────┘
```

- 열기 방식: 우측에서 슬라이드인 사이드 패널 (width: `500px~600px`)
- 배경 오버레이: `rgba(10, 15, 30, 0.6)` blur 처리
- 하단: 이전/다음 프로젝트 네비게이션

#### 인터랙션 & 애니메이션

- 패널 오픈: 우측에서 `translateX(100%) → 0` 슬라이드인 (`0.4s ease-out`)
- 오버레이: `opacity 0 → 0.6` 페이드인
- 오버레이 클릭 또는 `ESC`: 패널 닫힘
- 이전/다음 버튼: 콘텐츠 fade 전환
- 모바일: 사이드 패널 대신 풀스크린 오버레이

---

### SECTION 06 — CONTACT

> 강렬한 다크 배경의 연락처 섹션. 방문자가 행동을 취하도록 유도.

#### 레이아웃 & 구성요소

```
┌─────────────────────────────────────────────────┐
│  (배경 #0A0F1E)                                  │
│                                                 │
│  LET'S                                          │
│  WORK                                           │
│  TOGETHER                                       │
│                                                 │
│  ─────────────────────────────────────────      │
│                                                 │
│  📧  sh414lim@gmail.com                         │
│  📱  010-9915-4724                              │
│  📍  서울시 강동구 천호동                         │
│                                                 │
│  [이메일 보내기 →]                               │
│                                                 │
│  ─────────────────────────────────────────      │
│  © 2026 임성환. All rights reserved.            │
└─────────────────────────────────────────────────┘
```

#### 인터랙션 & 애니메이션

- 섹션 진입 시: `LET'S WORK TOGETHER` 각 단어 스태거 등장
- 연락처 항목: 위에서 아래로 순차 페이드인
- CTA 버튼 호버: 배경 `#60A5FA` + `scale(1.03)` 확대
- 이메일/전화 클릭 시 `mailto:` / `tel:` 링크 동작

---

## 05. 컴포넌트 명세

### 5.1 ProjectCard props

| props명 | 타입 | 설명 |
|---------|------|------|
| `id` | `string` | 프로젝트 고유 ID (URL slug용) |
| `number` | `string` | `'01'` ~ `'10'` 형식의 넘버링 |
| `name` | `string` | 프로젝트명 (영문) |
| `nameKo` | `string` | 프로젝트명 (한국어 설명) |
| `company` | `string` | 소속 회사명 |
| `period` | `string` | 개발 기간 (예: `2024.12 ~ 2026.03`) |
| `role` | `string` | 역할 설명 |
| `contribution` | `number` | 기여도 퍼센트 (0~100) |
| `category` | `string[]` | 필터용 카테고리 배열 |
| `tech` | `string[]` | 기술 스택 태그 배열 |
| `bullets` | `string[]` | 주요 기능 불릿 배열 |
| `size` | `'large' \| 'small'` | 카드 크기 (그리드 배치용) |

### 5.2 핵심 컴포넌트 목록

| 컴포넌트 | 역할 및 구현 포인트 |
|---------|------------------|
| `<Navbar />` | 고정 상단 바. `useScrollPosition` 훅으로 스크롤 감지 → `backdrop-blur` 적용. Intersection Observer로 현재 섹션 감지. |
| `<Marquee />` | CSS `animation: infinite linear`. 동일 내용 2번 복제로 끊김 없는 루프. 속도: `30s`. |
| `<FadeInView />` | Framer Motion `whileInView` + `viewport: { once: true }`. 자식 컴포넌트 스크롤 진입 시 애니메이션 래퍼. |
| `<Timeline />` | 세로 선 + 점 + 텍스트 구조. 선: `scaleY 0→1`. 점: `stagger delay 0.2s`. |
| `<SkillFilter />` | `useState`로 활성 카테고리 관리. `AnimatePresence`로 태그 fade 처리. |
| `<ProjectCard />` | `size` prop으로 large/small 분기. 호버 시 Framer Motion `whileHover` 사용. |
| `<ProjectPanel />` | Framer Motion `AnimatePresence` + `x: '100%'` 슬라이드. 배경 오버레이 클릭 닫힘. |
| `<TechTag />` | Tailwind `border` + `hover:bg-accent` 전환. 모노 폰트 적용. |

---

## 06. 데이터 구조

### 6.1 프로젝트 데이터 목록

| No | 프로젝트명 | 소속 | size | 카테고리 |
|----|-----------|------|------|---------|
| 01 | DevGym | 레오핏테크 | large | SaaS, Web, Mobile |
| 02 | Bro | 레오핏테크 | small | Mobile, AI |
| 03 | PlayPlanet | 레오핏테크 | small | Mobile, O2O |
| 04 | Golfring | 레오소프트 | large | Web, Mobile, O2O |
| 05 | AboutKorea | 레오소프트 | large | Web, Mobile, Global |
| 06 | Wooring | 레오소프트 | small | Web, Mobile |
| 07 | 육회한연어 | 레오소프트 | small | Mobile |
| 08 | DuRep | 레오소프트 | small | e-Commerce, Mobile |
| 09 | FSS 랜딩페이지 | 레오소프트 | small | Web, Landing |
| 10 | MICE 결제시스템 | 마이스허브 | large | Web, Payment |
| 11 | MICE CRM 앱 | 마이스허브 | small | Mobile |

### 6.2 TypeScript 인터페이스

```typescript
// types/index.ts

export interface Project {
  id: string;
  number: string;
  name: string;
  nameKo: string;
  company: string;
  period: string;
  role: string;
  contribution: number;
  overview: string;
  category: string[];
  tech: string[];
  bullets: string[];
  size: 'large' | 'small';
  link?: string;
}

export interface Career {
  company: string;
  role: string;
  period: string;
  current?: boolean;
}

export interface Profile {
  name: string;
  nameEn: string;
  role: string;
  age: number;
  location: string;
  email: string;
  phone: string;
  intro: string;
  careers: Career[];
}

export interface Skills {
  Frontend: string[];
  Mobile: string[];
  Backend: string[];
  Database: string[];
  Tools: string[];
}
```

### 6.3 data/ 폴더 구조

```
data/
├── projects.ts   ← 10개 프로젝트 전체 데이터 배열 (Project[])
├── skills.ts     ← { Frontend: [], Mobile: [], Backend: [], Database: [], Tools: [] }
└── profile.ts    ← 이름, 이메일, 전화, 주소, 자기소개, 경력 배열
```

---

## 07. 반응형 설계 (Responsive)

| 브레이크포인트 | 너비 | 주요 변화 |
|--------------|------|----------|
| `mobile` | `< 768px` | 단일 컬럼, 햄버거 메뉴, Hero 폰트 clamp 최소값, 카드 1열 |
| `tablet` | `768px ~ 1024px` | 2열 카드 그리드, About 2컬럼 유지 |
| `desktop` | `> 1024px` | 전체 레이아웃, 2~3열 카드 그리드, 사이드 패널 |
| `wide` | `> 1280px` | 최대 너비 1280px 고정, 좌우 `auto` margin |

### 7.1 Tailwind 브레이크포인트

```typescript
// tailwind.config.ts
theme: {
  screens: {
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
  }
}
```

### 7.2 모바일 특이사항

- Hero: `FULL-STACK DEV` 텍스트 크기 `clamp(48px, 10vw, 160px)`
- About: 타임라인을 하단으로 이동, 단일 컬럼
- Project 카드: 1열 풀 너비
- Project Detail: 사이드 패널 대신 풀스크린 오버레이
- Navbar: 고정 상단 + 햄버거 메뉴 (풀스크린 메뉴 오버레이)

---

## 08. 애니메이션 & 인터랙션 가이드

### 8.1 Framer Motion 패턴

| 패턴 | 사용 위치 및 설정값 |
|------|------------------|
| `staggerChildren` | Hero 타이틀 글자 등장 — `staggerChildren: 0.08`, `delayChildren: 0.2` |
| `whileInView` | 각 섹션 콘텐츠 — `{ opacity: 1, y: 0 }` from `{ opacity: 0, y: 40 }`, `viewport: { once: true }` |
| `AnimatePresence` | 프로젝트 패널 open/close, 필터 태그 show/hide |
| `whileHover` | 카드 — `scale: 1.02` 또는 배경색 변경 |
| `layout` | 필터 적용 후 카드 위치 자동 재배치 |
| `useScroll` | Hero 섹션 스크롤 패럴랙스 — `scrollYProgress → opacity/y transform` |

### 8.2 FadeInView 래퍼 컴포넌트

```tsx
// components/animations/FadeInView.tsx
'use client';
import { motion } from 'framer-motion';

export default function FadeInView({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
```

### 8.3 CSS 전용 애니메이션 (@keyframes)

```css
/* globals.css */

/* 마키 롤링 */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.marquee-inner {
  animation: marquee 30s linear infinite;
  display: flex;
  width: max-content;
}

/* 타임라인 현재 회사 pulse */
@keyframes pulse-ring {
  0%, 100% { box-shadow: 0 0 0 0 rgba(29, 78, 216, 0.4); }
  50%       { box-shadow: 0 0 0 8px rgba(29, 78, 216, 0); }
}
.timeline-current {
  animation: pulse-ring 2s ease infinite;
}

/* 스크롤 유도 바운스 */
@keyframes bounce-y {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(8px); }
}
.scroll-indicator {
  animation: bounce-y 1.5s ease infinite;
}

/* 숙련도 바 */
@keyframes fill-bar {
  from { width: 0; }
  to   { width: var(--target-width); }
}
```

### 8.4 글로벌 트랜지션 규칙

```css
/* 모든 인터랙티브 요소에 적용 */
* { transition: var(--transition-base); }

/* 버튼/링크 커서 */
button, a, [role="button"] { cursor: pointer; }

/* 포커스 스타일 (접근성) */
:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
```

---

## 09. 기술 스택 및 파일 구조

### 9.1 기술 스택

| 분류 | 기술 | 선택 이유 |
|------|------|----------|
| Framework | Next.js 14 (App Router) | SEO, 정적 생성, 파일 기반 라우팅 |
| Language | TypeScript | 타입 안정성, props 명세 자동완성 |
| Styling | Tailwind CSS | 빠른 유틸리티 클래스, 반응형 용이 |
| Animation | Framer Motion 11 | React 친화적, 선언형 애니메이션 |
| Font | Google Fonts | Bebas Neue + DM Sans + Noto Sans KR + JetBrains Mono |
| Hosting | Vercel | Next.js 최적화, 자동 CI/CD, 커스텀 도메인 |
| Analytics | Vercel Analytics (선택) | 방문자 수, 페이지뷰 추적 |

### 9.2 패키지 설치

```bash
npx create-next-app@latest portfolio --typescript --tailwind --app
cd portfolio
npm install framer-motion clsx
```

### 9.3 전체 파일 구조

```
portfolio/
├── app/
│   ├── layout.tsx                    # 루트 레이아웃: 폰트 로드, 메타데이터, Navbar
│   ├── page.tsx                      # 메인 페이지: 전체 섹션 조합
│   └── globals.css                   # CSS 변수 정의, 전역 리셋, @keyframes
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                # 고정 상단 네비게이션
│   │   └── Footer.tsx                # 푸터
│   │
│   ├── sections/
│   │   ├── Hero.tsx                  # 01 히어로 섹션
│   │   ├── About.tsx                 # 02 소개 + 타임라인
│   │   ├── Skills.tsx                # 03 기술 스택 + 필터
│   │   ├── Projects.tsx              # 04 프로젝트 그리드
│   │   └── Contact.tsx               # 06 연락처
│   │
│   ├── ui/
│   │   ├── ProjectCard.tsx           # 프로젝트 카드
│   │   ├── ProjectPanel.tsx          # 프로젝트 상세 사이드 패널
│   │   ├── Marquee.tsx               # 무한 마키 텍스트
│   │   ├── Timeline.tsx              # 경력 타임라인
│   │   └── TechTag.tsx               # 기술 태그 뱃지
│   │
│   └── animations/
│       └── FadeInView.tsx            # 스크롤 트리거 래퍼
│
├── data/
│   ├── projects.ts                   # 10개 프로젝트 데이터
│   ├── skills.ts                     # 기술 스택 카테고리별 데이터
│   └── profile.ts                    # 개인 정보 및 경력 데이터
│
├── types/
│   └── index.ts                      # TypeScript 인터페이스
│
├── hooks/
│   └── useScrollPosition.ts          # 스크롤 위치 감지 커스텀 훅
│
├── public/
│   └── images/
│       └── projects/                 # 프로젝트 스크린샷 (선택)
│
├── tailwind.config.ts
└── tsconfig.json
```

### 9.4 tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:    '#0A0F1E',
        accent:     '#1D4ED8',
        'accent-lt':'#60A5FA',
        bg:         '#F0F4FF',
        surface:    '#FFFFFF',
        muted:      '#64748B',
        dark:       '#0A0F1E',
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        sans:    ['DM Sans', 'sans-serif'],
        korean:  ['Noto Sans KR', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      maxWidth: {
        'site': '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 10. UX 설계 원칙

| 원칙 | 적용 방법 |
|------|----------|
| F-Pattern 스캔 | 좌상단: 이름/직함(가장 중요). 시선이 자연스럽게 좌→우, 위→아래 이동 |
| 점진적 노출 | 스크롤 시 콘텐츠 순차 등장. 한 번에 모든 정보 노출 X → 탐색 욕구 유발 |
| 시각적 계층 | 폰트 크기 4단계: Display → Section → Project → Body |
| 인터랙션 피드백 | 모든 클릭/호버 요소에 `0.3s` 이내 시각적 반응. 버튼 커서 포인터 필수 |
| 1분 룰 | 채용 담당자가 1분 내에 이름, 직함, 핵심 기술, 대표 프로젝트 3개 파악 가능 |
| 접근성 | 색상 대비 WCAG AA 준수. `img alt` 텍스트. 키보드 포커스 스타일 |
| 성능 | `next/image` 최적화. 폰트 `display: swap`. Lighthouse 90점 이상 목표 |

---

## 11. 개인정보 데이터 레퍼런스

```typescript
// data/profile.ts
export const profile: Profile = {
  name:    '임성환',
  nameEn:  'Lim Sunghwan',
  role:    '풀스택 개발자',
  age:     30,
  location:'서울시 강동구 천호동',
  email:   'sh414lim@gmail.com',
  phone:   '010-9915-4724',
  intro:   '기획, 개발, 배포 전 과정을 직접 책임지며, 단순 기능 구현에 그치지 않고 설계 단계부터 적극적으로 참여하는 엔지니어를 지향합니다. 도메인에 대한 깊은 이해와 유저 관점에서의 사고를 바탕으로, 사용자가 실제로 필요로 하는 기능과 편리한 경험을 설계하는 데 가치를 두고 있습니다.',
  careers: [
    { company: '주식회사 레오핏테크', role: '풀스택 개발자', period: '2024.12 ~ 2026.03', current: true },
    { company: 'LeoSoft (레오소프트)',  role: '풀스택 개발자', period: '2024.02 ~ 2024.12' },
    { company: 'MiceHub (마이스허브)', role: '소프트웨어 엔지니어', period: '2021.10 ~ 2024.02' },
  ],
};
```

---

*© 2026 임성환. Portfolio Planning Document.*
