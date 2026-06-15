export interface KPIStat {
  id: string;
  metric: string;
  label: string;
  sublabel?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  location?: string;
  achievements: string[];
  skillsUsed: string[];
}

export interface SkillItem {
  name: string;
  proficiency?: number; // 0-100 indicating performance level
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface Achievement {
  id: string;
  value: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  industry: string;
  challenge: string;
  strategy: string;
  results: string;
  toolsUsed: string[];
  imageUrl: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  perks: string[];
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  feedback: string;
  imageUrl: string;
  companyLogo?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  badgeColor: string;
}
