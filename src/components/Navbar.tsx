import React, { useState } from 'react';
import { Menu, X, PhoneCall, Palette, Code, ExternalLink, MessageSquare } from 'lucide-react';
import { ThemeMode } from '../types';
import { THEME_CONFIGS } from '../data/themeData';

interface NavbarProps {
  onOpenContact: (service?: string) => void;
  onOpenThemeSelector: () => void;
  activeSection: string;
  theme: ThemeMode;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenContact,
  onOpenThemeSelector,
  activeSection,
  theme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.dark;

  const navLinks = [
    { name: 'Strategy', href: '#services' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'FAQs', href: '#faqs' },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-colors">
      {/* Top Prominent Developer Credit Banner */}
      <div 
        className="text-[#0F1113] px-4 py-1.5 text-[11px] font-black uppercase tracking-widest flex items-center justify-between border-b border-black/20 shadow-md"
        style={{ backgroundColor: activeConfig.accentColor }}
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Code className="w-3.5 h-3.5 text-[#0F1113]" />
            <span>
              Architected & Developed by <strong className="underline underline-offset-2 font-black">Muhammad Abdullah Hashmi</strong>
            </span>
          </div>
          <a
            href="https://hashmerdev.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:opacity-90 transition-opacity bg-[#0F1113] text-white px-2.5 py-0.5 rounded font-extrabold text-[10px]"
          >
            <span>Portfolio: hashmerdev.vercel.app</span>
            <ExternalLink className="w-3 h-3 text-white" />
          </a>
        </div>
      </div>

      {/* Main Editorial Navbar */}
      <div className={`w-full border-b transition-colors backdrop-blur-md ${activeConfig.bgClass}/90 ${activeConfig.borderClass} ${activeConfig.textClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo & Text Badge */}
            <a href="#" className="flex items-center gap-3.5 group">
              <img
                src="https://i.ibb.co/27Tjmq1y/1786283895523.png"
                alt="Zainab Web Studio Logo"
                className="w-11 h-11 aspect-square object-cover rounded-xl border shadow-lg group-hover:scale-105 transition-transform"
                style={{ borderColor: activeConfig.accentColor }}
              />

              <div className="flex flex-col">
                <div className="text-xl font-black tracking-tightest uppercase flex items-center gap-1.5">
                  ZAINAB <span className="italic font-serif lowercase" style={{ color: activeConfig.accentColor }}>Studio</span>
                </div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60">
                  Digital Architects & Growth Systems
                </span>
              </div>
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-bold">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className={`transition-colors ${
                    activeSection === link.href.substring(1)
                      ? 'border-b-2 pb-1'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    borderColor: activeSection === link.href.substring(1) ? activeConfig.accentColor : 'transparent',
                    color: activeSection === link.href.substring(1) ? activeConfig.accentColor : undefined
                  }}
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Controls: Theme Selector, Proposal */}
            <div className="hidden sm:flex items-center gap-3">
              
              {/* Theme Palette Modal Button */}
              <button
                onClick={onOpenThemeSelector}
                className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider ${activeConfig.cardClass} ${activeConfig.borderClass}`}
                title="Select Theme"
              >
                <Palette className="w-4 h-4" style={{ color: activeConfig.accentColor }} />
                <span className="hidden xl:inline text-[11px]">{activeConfig.name}</span>
              </button>

              {/* WhatsApp Quick Chat */}
              <a
                href="https://wa.me/923324357459"
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-[#25D366] text-black hover:bg-emerald-400 transition-all shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-black text-black" />
                <span>WhatsApp</span>
              </a>

              {/* Primary Proposal CTA */}
              <button
                onClick={() => onOpenContact()}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl text-black hover:opacity-90 shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: activeConfig.accentColor }}
              >
                <PhoneCall className="w-3.5 h-3.5 text-black" />
                <span>Proposal</span>
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-3 rounded-xl border min-h-[44px] min-w-[44px] flex items-center justify-center ${activeConfig.cardClass} ${activeConfig.borderClass}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-b px-4 pt-3 pb-8 space-y-5 animate-fadeIn ${activeConfig.bgClass} ${activeConfig.borderClass}`}>
            
            {/* Nav Links */}
            <div className="flex flex-col space-y-1 text-xs uppercase tracking-widest font-bold">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className={`text-left py-3 px-4 rounded-xl transition-colors min-h-[44px] flex items-center ${activeConfig.cardClass}`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col gap-3">
              {/* Theme Selector Trigger */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenThemeSelector();
                }}
                className={`w-full py-3 px-3 rounded-xl border text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 min-h-[44px] ${activeConfig.cardClass} ${activeConfig.borderClass}`}
              >
                <Palette className="w-4 h-4" style={{ color: activeConfig.accentColor }} />
                <span>Theme Studio ({activeConfig.name})</span>
              </button>

              {/* WhatsApp Quick Link */}
              <a
                href="https://wa.me/923324357459"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-black uppercase tracking-widest rounded-xl bg-[#25D366] text-black min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4 fill-black text-black" />
                <span>Chat on WhatsApp Direct</span>
              </a>

              {/* Request Proposal Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-black uppercase tracking-widest rounded-xl text-black min-h-[44px]"
                style={{ backgroundColor: activeConfig.accentColor }}
              >
                Request Custom Proposal
              </button>
            </div>

          </div>
        )}
      </div>
    </header>
  );
};
