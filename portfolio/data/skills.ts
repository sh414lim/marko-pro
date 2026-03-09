import type { Skills, ProficiencyBar } from '@/types';

export const skills: Skills = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'Vanilla JS'],
  Mobile: ['Flutter', 'Dart'],
  Backend: ['Node.js', 'Next.js API Routes', 'Supabase Edge Functions'],
  Database: ['Supabase (PostgreSQL)', 'MySQL', 'Firebase'],
  Tools: ['Python', 'Selenium', 'Git', 'Vercel', 'AWS (EC2/S3)', 'ChatGPT API', 'Google Maps/Vision', 'Kakao API', 'Naver Cloud TTS', 'Slack Webhook', 'NICEPAY/PASS'],
};

export const proficiencyBars: ProficiencyBar[] = [
  { label: 'React / Next.js', percent: 90 },
  { label: 'Flutter', percent: 85 },
  { label: 'Node.js', percent: 70 },
];
