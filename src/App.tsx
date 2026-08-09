import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsFAQ } from './components/TestimonialsFAQ';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import { AIChatbotWidget } from './components/AIChatbotWidget';
import { ThemeSelectorModal } from './components/ThemeSelectorModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ThemeMode } from './types';
import { THEME_CONFIGS } from './data/themeData';
import { Code, ExternalLink } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactPrefilledService, setContactPrefilledService] = useState('');
  const [contactPrefilledMessage, setContactPrefilledMessage] = useState('');

  const activeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.dark;

  // Synchronize document dark class or styles
  useEffect(() => {
    if (theme === 'dark' || theme === 'cyber' || theme === 'emerald') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleOpenContact = (serviceName = '', customMessage = '') => {
    setContactPrefilledService(serviceName);
    setContactPrefilledMessage(customMessage);
    setIsContactModalOpen(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans pb-16 lg:pb-0 ${activeConfig.bgClass} ${activeConfig.textClass}`}>
      
      {/* Top Prominent Developer Credit Banner */}
      <div 
        className="text-[#0F1113] py-2 px-4 text-center font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 border-b border-[#0F1113]/20 shadow-md z-50 relative"
        style={{ backgroundColor: activeConfig.accentColor }}
      >
        <Code className="w-4 h-4 text-[#0F1113]" />
        <span>Engineered & Developed by <strong className="underline underline-offset-2">Muhammad Abdullah Hashmi</strong></span>
        <a
          href="https://hashmerdev.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 px-2.5 py-0.5 rounded bg-[#0F1113] text-white hover:bg-black transition-colors flex items-center gap-1 text-[10px]"
        >
          <span>Portfolio</span>
          <ExternalLink className="w-2.5 h-2.5 text-white" />
        </a>
      </div>

      {/* Top Navbar */}
      <Navbar
        onOpenContact={(service) => handleOpenContact(service)}
        onOpenThemeSelector={() => setIsThemeModalOpen(true)}
        activeSection="services"
        theme={theme}
      />

      {/* Main Content Area */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenContact={() => handleOpenContact()}
          theme={theme}
        />

        {/* Core Services Section */}
        <ServicesSection
          onOpenContactWithService={(serviceTitle) => handleOpenContact(serviceTitle)}
          theme={theme}
        />

        {/* Client Testimonials & FAQs */}
        <TestimonialsFAQ theme={theme} />
      </main>

      {/* Footer */}
      <Footer
        onOpenContact={(service) => handleOpenContact(service)}
        theme={theme}
      />

      {/* Mobile Bottom Quick Actions Bar */}
      <MobileBottomNav
        onOpenContact={() => handleOpenContact()}
        onOpenThemeSelector={() => setIsThemeModalOpen(true)}
        theme={theme}
      />

      {/* Theme Selector Modal (Multiple Themes) */}
      <ThemeSelectorModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={theme}
        onSelectTheme={(newTheme) => setTheme(newTheme)}
      />

      {/* Interactive AI Chatbot Widget */}
      <AIChatbotWidget theme={theme} />

      {/* Consultation Booking & Lead Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        prefilledService={contactPrefilledService}
        prefilledMessage={contactPrefilledMessage}
        theme={theme}
      />

      {/* Persistent Floating Prominent Developer Badge */}
      <div className="fixed bottom-4 left-4 z-40 hidden md:block">
        <a
          href="https://hashmerdev.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 bg-[#0F1113] text-white border-2 px-3.5 py-2 rounded-2xl shadow-2xl hover:scale-105 transition-all text-xs font-black uppercase tracking-wider"
          style={{ borderColor: activeConfig.accentColor }}
        >
          <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: activeConfig.accentColor }} />
          <span>Dev: <strong>Muhammad Abdullah Hashmi</strong></span>
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" style={{ color: activeConfig.accentColor }} />
        </a>
      </div>

    </div>
  );
}
