import React, { useState } from 'react';
import { AGENCY_SERVICES } from '../data/agencyData';
import { ServiceItem, ThemeMode } from '../types';
import { THEME_CONFIGS } from '../data/themeData';
import { 
  Search, Share2, Layout, Target, PenTool, Video, 
  ArrowRight, Check, Sparkles, X, ChevronRight, Layers
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceId: string) => void;
  onOpenContactWithService: (serviceTitle: string) => void;
  theme: ThemeMode;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onOpenContactWithService,
  theme
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const activeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.dark;

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return <Search className="w-6 h-6" style={{ color: activeConfig.accentColor }} />;
      case 'Share2': return <Share2 className="w-6 h-6" style={{ color: activeConfig.accentColor }} />;
      case 'Layout': return <Layout className="w-6 h-6" style={{ color: activeConfig.accentColor }} />;
      case 'Target': return <Target className="w-6 h-6" style={{ color: activeConfig.accentColor }} />;
      case 'PenTool': return <PenTool className="w-6 h-6" style={{ color: activeConfig.accentColor }} />;
      case 'Video': return <Video className="w-6 h-6" style={{ color: activeConfig.accentColor }} />;
      default: return <Layers className="w-6 h-6" style={{ color: activeConfig.accentColor }} />;
    }
  };

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'web-design', label: 'Web Development' },
    { id: 'seo', label: 'SEO & Search' },
    { id: 'smm', label: 'Social Media (SMM)' },
    { id: 'ppc', label: 'PPC Ads' },
    { id: 'video', label: 'Canva Video & Copy' },
  ];

  const filteredServices = selectedCategory === 'all'
    ? AGENCY_SERVICES
    : AGENCY_SERVICES.filter(s => s.id === selectedCategory || (selectedCategory === 'video' && (s.id === 'video' || s.id === 'content')));

  return (
    <section id="services" className={`py-16 sm:py-24 border-b transition-colors relative ${activeConfig.bgClass} ${activeConfig.borderClass} ${activeConfig.textClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-current/10 border border-current/20">
            <Sparkles className="w-3.5 h-3.5" style={{ color: activeConfig.accentColor }} />
            <span>Digital Systems & Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tightest">
            Comprehensive Web & Growth Services
          </h2>
          <p className="text-xs sm:text-sm font-light opacity-80 max-w-2xl mx-auto">
            End-to-end digital architectures engineered to scale your brand, command organic search rankings, and maximize conversion rates.
          </p>

          {/* Filter Pills with touch scrolling on mobile */}
          <div className="flex items-center gap-2 pt-4 overflow-x-auto no-scrollbar pb-2 sm:justify-center">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all whitespace-nowrap min-h-[40px] ${
                    isSelected
                      ? 'text-black shadow-lg font-black'
                      : `${activeConfig.cardClass} ${activeConfig.borderClass} opacity-80 hover:opacity-100`
                  }`}
                  style={{
                    backgroundColor: isSelected ? activeConfig.accentColor : undefined,
                    borderColor: isSelected ? activeConfig.accentColor : undefined
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`group relative rounded-2xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${activeConfig.cardClass} ${activeConfig.borderClass}`}
            >
              {/* Top Row: Icon & Badge */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3.5 rounded-2xl border ${activeConfig.bgClass} ${activeConfig.borderClass}`}>
                    {getServiceIcon(service.iconName)}
                  </div>
                  {service.badge && (
                    <span 
                      className="text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full text-black shadow-sm"
                      style={{ backgroundColor: activeConfig.accentColor }}
                    >
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:opacity-90 transition-opacity">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs opacity-80 mb-6 font-normal leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Key Features */}
                <div className="space-y-2 mb-6 text-xs font-medium">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: activeConfig.accentColor }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className={`pt-6 border-t space-y-3 ${activeConfig.borderClass}`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="opacity-60 font-medium">Starting from</span>
                  <span className="font-black text-sm" style={{ color: activeConfig.accentColor }}>
                    ${service.basePrice}<span className="text-[10px] opacity-60 font-normal">/proj</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1 min-h-[42px] ${activeConfig.bgClass} ${activeConfig.borderClass}`}
                  >
                    Details
                    <ChevronRight className="w-3.5 h-3.5" style={{ color: activeConfig.accentColor }} />
                  </button>
                  <button
                    onClick={() => onOpenContactWithService(service.title)}
                    className="w-full py-2.5 px-3 rounded-xl text-black text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-1 shadow-md min-h-[42px] active:scale-95"
                    style={{ backgroundColor: activeConfig.accentColor }}
                  >
                    Start
                    <ArrowRight className="w-3.5 h-3.5 text-black" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Custom Service Callout Bar */}
        <div className={`mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 ${activeConfig.cardClass} ${activeConfig.borderClass}`}>
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-black uppercase">Need a multi-service digital growth package?</h4>
            <p className="text-xs opacity-80">Combine Web Development, SEO, PPC Ads, and Canva Video Ads into a single retainership.</p>
          </div>
          <a
            href="#calculator"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-black font-black text-xs uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg whitespace-nowrap min-h-[44px]"
            style={{ backgroundColor: activeConfig.accentColor }}
          >
            Launch Package Estimator
            <ArrowRight className="w-4 h-4 text-black" />
          </a>
        </div>

      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className={`relative w-full max-w-2xl border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto ${activeConfig.bgClass} ${activeConfig.borderClass} ${activeConfig.textClass}`}>
            
            <button
              onClick={() => setActiveModalService(null)}
              className={`absolute top-6 right-6 p-2 rounded-full border ${activeConfig.cardClass} ${activeConfig.borderClass}`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5">
              <div className="p-3.5 rounded-2xl text-black font-black" style={{ backgroundColor: activeConfig.accentColor }}>
                {getServiceIcon(activeModalService.iconName)}
              </div>
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: activeConfig.accentColor }}>Service Specifications</span>
                <h3 className="text-2xl font-black uppercase">{activeModalService.title}</h3>
              </div>
            </div>

            <p className="text-xs leading-relaxed opacity-90 font-normal">
              {activeModalService.fullDesc}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: activeConfig.accentColor }}>Key Features Included</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeModalService.features.map((feat, idx) => (
                  <div key={idx} className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs ${activeConfig.cardClass} ${activeConfig.borderClass}`}>
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: activeConfig.accentColor }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: activeConfig.accentColor }}>Monthly Deliverables</h4>
              <ul className={`space-y-1.5 text-xs list-disc list-inside p-4 rounded-xl border ${activeConfig.cardClass} ${activeConfig.borderClass}`}>
                {activeModalService.deliverables.map((del, idx) => (
                  <li key={idx}>{del}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl border flex items-center justify-between" style={{ backgroundColor: `${activeConfig.accentColor}15`, borderColor: `${activeConfig.accentColor}40` }}>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: activeConfig.accentColor }}>Performance Benchmark</span>
              <span className="text-xs font-black" style={{ color: activeConfig.accentColor }}>{activeModalService.impactMetric}</span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  const serviceTitle = activeModalService.title;
                  setActiveModalService(null);
                  onOpenContactWithService(serviceTitle);
                }}
                className="w-full py-3.5 rounded-xl text-black font-black text-xs uppercase tracking-widest shadow-lg min-h-[44px]"
                style={{ backgroundColor: activeConfig.accentColor }}
              >
                Request Custom Proposal for {activeModalService.title}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
