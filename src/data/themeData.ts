import { ThemeMode, ThemeConfig } from '../types';

export const THEME_CONFIGS: Record<ThemeMode, ThemeConfig> = {
  dark: {
    id: 'dark',
    name: 'Dark Luxury',
    subtitle: 'Editorial Onyx & Flame Orange',
    accentColor: '#FF4D00',
    bgClass: 'bg-[#0F1113]',
    cardClass: 'bg-[#141618]',
    textClass: 'text-[#E6E1D6]',
    borderClass: 'border-white/10',
    previewGradient: 'from-[#0F1113] via-[#141618] to-[#FF4D00]'
  },
  light: {
    id: 'light',
    name: 'Light Studio',
    subtitle: 'Editorial Warm Cream & Slate',
    accentColor: '#FF4D00',
    bgClass: 'bg-[#F4F1EA]',
    cardClass: 'bg-[#EAE6DC]',
    textClass: 'text-[#111315]',
    borderClass: 'border-black/10',
    previewGradient: 'from-[#F4F1EA] via-[#EAE6DC] to-[#FF4D00]'
  },
  cyber: {
    id: 'cyber',
    name: 'Cyber Sunset',
    subtitle: 'Midnight Violet & Neon Coral',
    accentColor: '#FF2A6D',
    bgClass: 'bg-[#0B0813]',
    cardClass: 'bg-[#151026]',
    textClass: 'text-[#E9E4F8]',
    borderClass: 'border-purple-500/20',
    previewGradient: 'from-[#0B0813] via-[#151026] to-[#FF2A6D]'
  },
  emerald: {
    id: 'emerald',
    name: 'Forest Executive',
    subtitle: 'Deep Emerald & Royal Gold',
    accentColor: '#E2A93B',
    bgClass: 'bg-[#061410]',
    cardClass: 'bg-[#0C221B]',
    textClass: 'text-[#E2EFEB]',
    borderClass: 'border-emerald-500/20',
    previewGradient: 'from-[#061410] via-[#0C221B] to-[#E2A93B]'
  }
};

export const getThemeStyles = (theme: ThemeMode) => {
  const config = THEME_CONFIGS[theme] || THEME_CONFIGS.dark;
  return {
    bg: config.bgClass,
    card: config.cardClass,
    text: config.textClass,
    border: config.borderClass,
    accent: config.accentColor,
    isDark: theme !== 'light'
  };
};
