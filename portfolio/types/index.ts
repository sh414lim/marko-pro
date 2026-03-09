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

export interface Skill {
  name: string;
  category: 'Frontend' | 'Mobile' | 'Backend' | 'Database' | 'Tools';
}

export interface Skills {
  Frontend: string[];
  Mobile: string[];
  Backend: string[];
  Database: string[];
  Tools: string[];
}

export interface ProficiencyBar {
  label: string;
  percent: number;
}
