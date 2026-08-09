export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  badge?: string;
  features: string[];
  deliverables: string[];
  platforms: string[];
  impactMetric: string;
  basePrice: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  industry: string;
  serviceCategory: 'SEO' | 'SMM' | 'Web Design' | 'PPC' | 'Content' | 'Video';
  keyMetricLabel: string;
  keyMetricValue: string;
  summary: string;
  imageUrl: string;
  tags: string[];
  challenge: string;
  solution: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface CalculatorState {
  selectedServices: string[];
  monthlyAdBudget: number;
  expectedOrderValue: number;
  monthlyTraffic: number;
  includeVideoAds: boolean;
  includeCopywriting: boolean;
  timelineMonths: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  metric: string;
  serviceUsed: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Services' | 'Process' | 'Pricing';
}

export type ThemeMode = 'dark' | 'light' | 'cyber' | 'emerald';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  subtitle: string;
  accentColor: string;
  bgClass: string;
  cardClass: string;
  textClass: string;
  borderClass: string;
  previewGradient: string;
}

export interface AuthUser {
  isGuest: boolean;
  name?: string;
  email?: string;
  avatar?: string;
  googleId?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
