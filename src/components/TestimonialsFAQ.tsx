import React, { useState } from 'react';
import { AGENCY_TESTIMONIALS, AGENCY_FAQS, AGENCY_STATS } from '../data/agencyData';
import { ThemeMode } from '../types';
import { THEME_CONFIGS } from '../data/themeData';
import { Sparkles, Star, ChevronDown, ChevronUp, Globe, TrendingUp, Users, Zap, Quote } from 'lucide-react';

interface TestimonialsFAQProps {
  theme: ThemeMode;
}

export const TestimonialsFAQ: React.FC<TestimonialsFAQProps> = ({ theme }) => {
  const [openFaqId, setOpenFaqId] = useState<string>('f1');

  const activeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.dark;

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? '' : id);
  };

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5" style={{ color: activeConfig.accentColor }} />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" style={{ color: activeConfig.accentColor }} />;
      case 'Users': return <Users className="w-5 h-5" style={{ color: activeConfig.accentColor }} />;
      case 'Zap': return <Zap className="w-5 h-5" style={{ color: activeConfig.accentColor }} />;
      default: return <Sparkles className="w-5 h-5" style={{ color: activeConfig.accentColor }} />;
    }
  };

  return (
    <section id="testimonials" className={`py-16 sm:py-24 border-b transition-colors relative ${activeConfig.bgClass} ${activeConfig.borderClass} ${activeConfig.textClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {AGENCY_STATS.map((stat, idx) => (
            <div
              key={idx}
              className={`p-5 sm:p-6 rounded-3xl border flex flex-col items-center text-center space-y-2 shadow-xl ${activeConfig.cardClass} ${activeConfig.borderClass}`}
            >
              <div className={`p-3 rounded-2xl border ${activeConfig.bgClass} ${activeConfig.borderClass}`}>
                {getStatIcon(stat.icon)}
              </div>
              <div className="text-2xl sm:text-4xl font-black tracking-tight" style={{ color: activeConfig.accentColor }}>
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs uppercase tracking-wider font-bold opacity-70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="space-y-10 sm:space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-current/10 border border-current/20">
              <Sparkles className="w-3.5 h-3.5" style={{ color: activeConfig.accentColor }} />
              <span>Verified Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tightest">
              Trusted By Scaling Brands
            </h2>
            <p className="text-xs sm:text-sm font-light opacity-80">
              Hear directly from founders and growth executives who partnered with Zainab Web Studio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {AGENCY_TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className={`rounded-3xl p-6 sm:p-7 border shadow-xl flex flex-col justify-between relative space-y-6 ${activeConfig.cardClass} ${activeConfig.borderClass}`}
              >
                <Quote className="w-8 h-8 absolute top-6 right-6 opacity-15" style={{ color: activeConfig.accentColor }} />

                <div className="space-y-4">
                  <div className="flex gap-1" style={{ color: activeConfig.accentColor }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs leading-relaxed italic font-serif opacity-90">
                    "{t.quote}"
                  </p>
                </div>

                <div className={`pt-4 border-t flex items-center justify-between ${activeConfig.borderClass}`}>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border-2"
                      style={{ borderColor: activeConfig.accentColor }}
                    />
                    <div>
                      <div className="text-xs font-bold uppercase">{t.name}</div>
                      <div className="text-[10px] opacity-60">{t.role}, {t.company}</div>
                    </div>
                  </div>

                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full text-black" style={{ backgroundColor: activeConfig.accentColor }}>
                    {t.metric}
                  </span>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div id="faqs" className="max-w-4xl mx-auto space-y-8 pt-4">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-current/10 border border-current/20">
              <span>Got Questions?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tightest">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm font-light opacity-80">
              Clear answers regarding our custom web development process, SEO benchmarks, and ad management.
            </p>
          </div>

          <div className="space-y-3">
            {AGENCY_FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border overflow-hidden transition-colors ${activeConfig.cardClass} ${activeConfig.borderClass}`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-black text-xs uppercase tracking-wider hover:opacity-90 transition-opacity min-h-[50px]"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: activeConfig.accentColor }} />
                    ) : (
                      <ChevronDown className="w-4 h-4 opacity-60 flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className={`px-4 sm:px-5 pb-5 pt-1 text-xs leading-relaxed border-t font-normal opacity-90 ${activeConfig.borderClass}`}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
