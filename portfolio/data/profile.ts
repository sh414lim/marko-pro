import type { Profile } from '@/types';

export const profile: Profile = {
  name: '임성환',
  nameEn: 'Lim Sunghwan',
  role: '풀스택 개발자',
  age: 30,
  location: '서울시 강동구 천호동',
  email: 'sh414lim@gmail.com',
  phone: '010-9915-4724',
  intro:
    '기획, 개발, 배포 전 과정을 직접 책임지며, 단순 기능 구현에 그치지 않고 설계 단계부터 적극적으로 참여하는 엔지니어를 지향합니다. 도메인에 대한 깊은 이해와 유저 관점에서의 사고를 바탕으로, 사용자가 실제로 필요로 하는 기능과 편리한 경험을 설계하는 데 가치를 두고 있습니다.',
  careers: [
    {
      company: '주식회사 레오핏테크',
      role: '풀스택 개발자',
      period: '2024.12 ~ 2026.03',
      duration: '1년 4개월',
      current: true,
    },
    {
      company: 'LeoSoft (레오소프트)',
      role: '풀스택 개발자',
      period: '2024.02 ~ 2024.12',
      duration: '10개월',
    },
    {
      company: 'MiceHub (마이스허브)',
      role: '소프트웨어 엔지니어',
      period: '2021.10 ~ 2024.02',
      duration: '2년 5개월',
    },
  ],
};
