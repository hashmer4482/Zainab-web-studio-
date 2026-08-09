import React, { useState } from 'react';
import { Mail, ExternalLink, Send, Check, Code, MessageSquare, PhoneCall } from 'lucide-react';
import { ThemeMode } from '../types';
import { THEME_CONFIGS } from '../data/themeData';

interface FooterProps {
  onOpenContact: (service?: string) => void;
  theme: ThemeMode;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, theme }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const activeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.dark;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className={`border-t transition-colors ${activeConfig.bgClass} ${activeConfig.borderClass} ${activeConfig.textClass}`}>
      
      {/* PROMINENT DEVELOPER CREDIT BANNER */}
      <div 
        className="text-[#0F1113] py-8 sm:py-10 px-4 border-b border-black/20 text-center shadow-lg"
        style={{ backgroundColor: activeConfig.accentColor }}
      >
        <div className="max-w-5xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#0F1113] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-2xl">
            <Code className="w-4 h-4 text-white" />
            PLATFORM ARCHITECT & LEAD DEVELOPER
          </div>
          <h2 className="text-2xl sm:text-5xl font-black uppercase tracking-tightest">
            DESIGNED & DEVELOPED BY <span className="underline underline-offset-8">MUHAMMAD ABDULLAH HASHMI</span>
          </h2>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider max-w-2xl mx-auto opacity-90">
            Full-Stack Digital Architect & Growth Systems Engineer. High-Performance Web Applications.
          </p>
          <div className="pt-2">
            <a
              href="https://hashmerdev.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#0F1113] text-white hover:bg-black font-black text-xs uppercase tracking-widest transition-transform hover:scale-105 shadow-2xl border border-white/20 min-h-[48px]"
            >
              <span>Explore Portfolio: hashmerdev.vercel.app</span>
              <ExternalLink className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3.5 group">
              <img
                src="https://i.ibb.co/27Tjmq1y/1786283895523.png"
                alt="Zainab Web Studio Logo"
                className="w-12 h-12 aspect-square object-cover rounded-xl border shadow-lg"
                style={{ borderColor: activeConfig.accentColor }}
              />
              <div className="flex flex-col">
                <div className="text-xl font-black tracking-tightest uppercase">
                  ZAINAB <span style={{ color: activeConfig.accentColor }}>WEB STUDIO</span>
                </div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60">
                  ZainabwebStudio.online
                </span>
              </div>
            </a>

            <p className="text-xs leading-relaxed max-w-sm opacity-80 font-normal">
              We promote your brand online, drive targeted organic traffic, and convert visitors into loyal customers through custom web development and precision digital marketing campaigns.
            </p>

            <div className="space-y-2.5 text-xs font-bold pt-2">
              <div className="flex items-center gap-2.5" style={{ color: activeConfig.accentColor }}>
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                <a href="https://wa.me/923324357459" target="_blank" rel="noreferrer" className="hover:underline">
                  WhatsApp: +923324357459
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 flex-shrink-0" style={{ color: activeConfig.accentColor }} />
                <a href="tel:+923324357459" className="hover:underline">
                  Phone: +923324357459
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: activeConfig.accentColor }} />
                <a href="mailto:shakeelammar59@gmail.com" className="hover:underline">
                  shakeelammar59@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <ExternalLink className="w-4 h-4 flex-shrink-0" style={{ color: activeConfig.accentColor }} />
                <a href="https://zainabwebstudio.online" target="_blank" rel="noreferrer" className="hover:underline">
                  Website: ZainabwebStudio.online
                </a>
              </div>
            </div>
          </div>

          {/* Core Services Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest" style={{ color: activeConfig.accentColor }}>Services</h4>
            <ul className="space-y-2 text-xs font-medium opacity-80">
              <li>
                <button onClick={() => onOpenContact('Search Engine Optimization (SEO)')} className="hover:underline">
                  Search Engine Optimization (SEO)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenContact('Social Media Marketing (SMM)')} className="hover:underline">
                  Social Media Marketing (SMM)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenContact('Website Design & Optimization')} className="hover:underline">
                  Website Design & Optimization
                </button>
              </li>
              <li>
                <button onClick={() => onOpenContact('Pay-Per-Click (PPC) Advertising')} className="hover:underline">
                  Pay-Per-Click (PPC) Ads
                </button>
              </li>
              <li>
                <button onClick={() => onOpenContact('Content Creation & Copywriting')} className="hover:underline">
                  Content Creation & Copywriting
                </button>
              </li>
              <li>
                <button onClick={() => onOpenContact('Canva Ads & Video Making')} className="hover:underline">
                  Canva Ads & Video Production
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest" style={{ color: activeConfig.accentColor }}>Navigation</h4>
            <ul className="space-y-2 text-xs font-medium opacity-80">
              <li>
                <button onClick={() => onOpenContact('Full Digital Growth Retainer')} className="hover:underline text-left">
                  Growth Retainer Proposal
                </button>
              </li>
              <li>
                <a href="#testimonials" className="hover:underline">
                  Client Reviews & FAQs
                </a>
              </li>
              <li>
                <a href="https://hashmerdev.vercel.app" target="_blank" rel="noreferrer" className="font-bold hover:underline" style={{ color: activeConfig.accentColor }}>
                  Developer Portfolio
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest" style={{ color: activeConfig.accentColor }}>Growth Briefings</h4>
            <p className="text-xs opacity-75 leading-relaxed">
              Monthly SEO strategies, web conversion techniques, and campaign insights.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-900/30 border border-emerald-500/40 rounded-xl text-emerald-400 text-xs flex items-center gap-2 font-bold">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Subscribed to Briefings!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none ${activeConfig.cardClass} ${activeConfig.borderClass}`}
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-black font-black text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-md min-h-[42px]"
                  style={{ backgroundColor: activeConfig.accentColor }}
                >
                  <Send className="w-3.5 h-3.5 text-black" />
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Copyright & Developer Credit Bar */}
        <div className={`mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium opacity-80 ${activeConfig.borderClass}`}>
          <div>
            © {new Date().getFullYear()} Zainab Web Studio (ZainabwebStudio.online). All rights reserved.
          </div>
          <div>
            Developer Credit:{' '}
            <a
              href="https://hashmerdev.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="font-black hover:underline"
              style={{ color: activeConfig.accentColor }}
            >
              Muhammad Abdullah Hashmi
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
