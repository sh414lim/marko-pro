import type { Metadata } from 'next';
import { Bebas_Neue, DM_Sans, Noto_Sans_KR, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '임성환 — 풀스택 개발자 포트폴리오',
  description:
    '기획부터 배포까지 전 과정을 책임지는 풀스택 개발자 임성환의 포트폴리오입니다. React, Next.js, Flutter, Node.js 기반의 다양한 실서비스 개발 경험을 담았습니다.',
  keywords: ['풀스택 개발자', 'React', 'Next.js', 'Flutter', 'TypeScript', '포트폴리오'],
  openGraph: {
    title: '임성환 — 풀스택 개발자 포트폴리오',
    description: '기획부터 배포까지 전 과정을 책임지는 풀스택 개발자',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${bebasNeue.variable} ${dmSans.variable} ${notoSansKr.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
