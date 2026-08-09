import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Code, ExternalLink, MessageSquare, PhoneCall } from 'lucide-react';
import { ThemeMode } from '../types';
import { THEME_CONFIGS } from '../data/themeData';

interface HeroProps {
  onOpenContact: () => void;
  theme: ThemeMode;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, theme }) => {
  const activeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.dark;

  return (
    <section className={`relative overflow-hidden border-b transition-colors ${activeConfig.bgClass} ${activeConfig.borderClass} ${activeConfig.textClass}`}>
      {/* Container with Vertical Editorial Bar */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-[600px]">
        
        {/* Left Side Vertical Bar */}
        <div className={`hidden lg:flex w-[60px] border-r flex-col items-center py-12 justify-between ${activeConfig.cardClass} ${activeConfig.borderClass}`}>
          <div className="vertical-text text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">
            ESTABLISHED 2024
          </div>
          <div className="w-px h-24 bg-current opacity-20" />
          <div className="vertical-text text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">
            DIGITAL ARCHITECTS
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          
          {/* Top Half: Giant Headline & Strategic Value */}
          <div className={`p-6 sm:p-12 lg:p-16 flex flex-col lg:flex-row border-b justify-between items-stretch gap-10 ${activeConfig.borderClass}`}>
            
            {/* Headline + Value Props */}
            <div className="flex-1 space-y-6 sm:space-y-8">
              
              {/* Developer & Platform Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-black uppercase tracking-wider bg-current/10 border border-current/20">
                <Code className="w-3.5 h-3.5" style={{ color: activeConfig.accentColor }} />
                <span>Engineered by <strong>Muhammad Abdullah Hashmi</strong></span>
              </div>

              {/* High Contrast Editorial Headline */}
              <h1 className="text-4xl sm:text-7xl lg:text-[92px] leading-[0.9] font-black tracking-tightest uppercase">
                WE <span className="italic font-serif-editorial lowercase font-normal" style={{ color: activeConfig.accentColor }}>scale</span>
                <br />
                BRANDS.
              </h1>

              <div className="max-w-xl">
                <p className="text-sm sm:text-lg leading-relaxed font-light opacity-90 border-l-2 pl-4 sm:pl-6" style={{ borderColor: activeConfig.accentColor }}>
                  We promote your brand online, drive targeted traffic, and convert visitors into loyal customers through custom web development, Google #1 SEO, and high-ROAS paid ad systems.
                </p>
              </div>

              {/* Instant Call To Actions - Mobile Touch Optimized */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOpenContact}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl font-black text-xs uppercase tracking-widest text-black transition-all shadow-xl flex items-center justify-center gap-2 min-h-[48px] active:scale-95"
                  style={{ backgroundColor: activeConfig.accentColor }}
                >
                  <PhoneCall className="w-4 h-4 text-black" />
                  <span>Book Strategy Proposal</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>

                <a
                  href="https://wa.me/923324357459"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#25D366] text-black font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 min-h-[48px] active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-black text-black" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href="https://hashmerdev.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full sm:w-auto px-5 py-3.5 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all min-h-[44px] ${activeConfig.cardClass} ${activeConfig.borderClass}`}
                >
                  <span>Dev: hashmerdev.vercel.app</span>
                  <ExternalLink className="w-3.5 h-3.5" style={{ color: activeConfig.accentColor }} />
                </a>
              </div>

              <div className="text-[10px] uppercase tracking-widest font-bold opacity-70 flex flex-wrap items-center gap-3 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" style={{ color: activeConfig.accentColor }} />
                  Custom Web Apps & SEO
                </span>
                <span>•</span>
                <span>Google & Meta Ad Specialists</span>
              </div>

            </div>

            {/* Right Card: Primary Growth Benchmark */}
            <div className={`w-full lg:w-[320px] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden rounded-2xl border ${activeConfig.cardClass} ${activeConfig.borderClass}`}>
              <div className="absolute top-0 right-0 p-6 text-[90px] font-black opacity-5 leading-none select-none">
                01
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold mb-3" style={{ color: activeConfig.accentColor }}>
                  Primary Objective
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif-editorial italic mb-4 leading-tight">
                  High-Converting Organic Traffic
                </h2>
                <p className="text-xs opacity-75 leading-relaxed font-normal">
                  Our SEO strategies secure top Google rankings, turning high-intent searches into revenue-generating relationships for your business.
                </p>
              </div>

              <div className={`pt-6 mt-6 border-t space-y-2.5 text-[11px] font-bold ${activeConfig.borderClass}`}>
                <div className="flex items-center gap-2" style={{ color: activeConfig.accentColor }}>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Custom Speed-Optimized Web Dev</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: activeConfig.accentColor }}>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>#1 Google Search Ranking (SEO)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Grid: 4 Service Capability Cards */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t ${activeConfig.borderClass}`}>
            
            <div className={`p-6 sm:p-8 border-r border-b lg:border-b-0 flex flex-col justify-between transition-all hover:bg-current/5 ${activeConfig.borderClass}`}>
              <div>
                <span className="text-[10px] uppercase font-bold opacity-40 tracking-widest">01 / SMM</span>
                <h3 className="text-base font-black mt-2 uppercase">Social Growth</h3>
              </div>
              <p className="text-[12px] opacity-75 leading-relaxed mt-3">
                Increase brand awareness on Facebook, Instagram, and LinkedIn with targeted visual campaigns.
              </p>
            </div>

            <div className={`p-6 sm:p-8 border-r border-b lg:border-b-0 flex flex-col justify-between transition-all hover:bg-current/5 ${activeConfig.borderClass}`}>
              <div>
                <span className="text-[10px] uppercase font-bold opacity-40 tracking-widest">02 / UI.UX</span>
                <h3 className="text-base font-black mt-2 uppercase">Web Design</h3>
              </div>
              <p className="text-[12px] opacity-75 leading-relaxed mt-3">
                Precision website design focused on high engagement, page speed, and conversion architecture.
              </p>
            </div>

            <div className={`p-6 sm:p-8 border-r border-b lg:border-b-0 flex flex-col justify-between transition-all hover:bg-current/5 ${activeConfig.borderClass}`}>
              <div>
                <span className="text-[10px] uppercase font-bold opacity-40 tracking-widest">03 / PPC</span>
                <h3 className="text-base font-black mt-2 uppercase">Paid Ads Funnel</h3>
              </div>
              <p className="text-[12px] opacity-75 leading-relaxed mt-3">
                Generate instant qualified leads and sales through Google Search Ads and Meta Social Ads with high ROAS.
              </p>
            </div>

            <div 
              className="p-6 sm:p-8 flex flex-col justify-between text-black font-bold"
              style={{ backgroundColor: activeConfig.accentColor }}
            >
              <div>
                <span className="text-[10px] uppercase font-bold opacity-80 tracking-widest">04 / Creative</span>
                <h3 className="text-base font-black mt-2 uppercase">Content Studio</h3>
              </div>
              <p className="text-[12px] leading-relaxed mt-3">
                Canva Ads, Video Production, and Copywriting that commands audience attention and converts.
              </p>
              <div className="mt-6 flex justify-between items-end">
                <span className="text-[36px] font-black tracking-tightest leading-none">→</span>
                <button
                  onClick={onOpenContact}
                  className="text-[10px] uppercase font-black tracking-widest bg-black text-white px-3 py-1.5 rounded-lg shadow-md"
                >
                  Start Here
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
