import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, TrendingUp, ShieldCheck } from 'lucide-react';
import { ThemeMode } from '../types';
import { THEME_CONFIGS } from '../data/themeData';

interface QuoteCalculatorProps {
  onOpenContactWithPackage: (packageDetails: string) => void;
  theme: ThemeMode;
}

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ onOpenContactWithPackage, theme }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(['web-design', 'seo', 'ppc']);
  const [adBudget, setAdBudget] = useState<number>(2000);
  const [monthlyTraffic, setMonthlyTraffic] = useState<number>(5000);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(150);

  const activeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.dark;

  const availableServices = [
    { id: 'web-design', name: 'Website Design & Optimization', price: 1200, isMonthly: false, desc: 'Custom high-speed web app or store rebuild' },
    { id: 'seo', name: 'Search Engine Optimization (SEO)', price: 850, isMonthly: true, desc: 'Rank #1 on Google for high-intent terms' },
    { id: 'ppc', name: 'Pay-Per-Click Ads (Google & Meta)', price: 950, isMonthly: true, desc: 'High-ROAS search & social ad funnels' },
    { id: 'smm', name: 'Social Media Marketing (SMM)', price: 750, isMonthly: true, desc: 'Community growth & branded posts on IG/FB/LinkedIn' },
    { id: 'video', name: 'Canva Ads & Video Making', price: 650, isMonthly: true, desc: 'Reels, promo videos, and animated social banners' },
    { id: 'content', name: 'Content Creation & Copywriting', price: 600, isMonthly: true, desc: 'Persuasive landing page copy & blog content' },
  ];

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length === 1) return;
      setSelectedServices(selectedServices.filter(s => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const rawTotal = selectedServices.reduce((sum, serviceId) => {
    const s = availableServices.find(item => item.id === serviceId);
    return sum + (s ? s.price : 0);
  }, 0);

  const isBundle = selectedServices.length >= 3;
  const discountMultiplier = isBundle ? 0.85 : 1;
  const finalPrice = Math.round(rawTotal * discountMultiplier);

  const estimatedNewTraffic = Math.round(monthlyTraffic * (selectedServices.includes('seo') ? 2.8 : 1.4));
  const conversionRate = selectedServices.includes('web-design') ? 0.035 : 0.018;
  const estimatedLeads = Math.round(estimatedNewTraffic * conversionRate);
  const estimatedMonthlyRevenue = Math.round(estimatedLeads * avgOrderValue * (selectedServices.includes('ppc') ? 1.5 : 1));

  const handleApplyPackage = () => {
    const serviceNames = selectedServices
      .map(id => availableServices.find(s => s.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const summary = `Package: [${serviceNames}] | Est. Investment: $${finalPrice} | Ad Budget: $${adBudget}/mo | ROI Target: ~$${estimatedMonthlyRevenue}/mo`;
    onOpenContactWithPackage(summary);
  };

  return (
    <section id="calculator" className={`py-16 sm:py-24 border-b transition-colors relative ${activeConfig.bgClass} ${activeConfig.borderClass} ${activeConfig.textClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-current/10 border border-current/20">
            <Calculator className="w-3.5 h-3.5" style={{ color: activeConfig.accentColor }} />
            <span>Interactive Growth Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tightest">
            Build Your Custom Package
          </h2>
          <p className="text-xs sm:text-sm font-light opacity-80 max-w-2xl mx-auto">
            Select services to calculate transparent investment costs and projected lead ROI.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`rounded-3xl p-6 sm:p-8 border space-y-6 ${activeConfig.cardClass} ${activeConfig.borderClass}`}>
              <h3 className="text-base font-black uppercase flex items-center gap-2">
                <span className="w-6 h-6 rounded-full text-black text-xs flex items-center justify-center font-black" style={{ backgroundColor: activeConfig.accentColor }}>1</span>
                Select Capabilities
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableServices.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 min-h-[110px] flex flex-col justify-between ${
                        isSelected
                          ? 'shadow-md border-2'
                          : `${activeConfig.bgClass} ${activeConfig.borderClass} opacity-90 hover:opacity-100`
                      }`}
                      style={{
                        borderColor: isSelected ? activeConfig.accentColor : undefined,
                        backgroundColor: isSelected ? `${activeConfig.accentColor}10` : undefined
                      }}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="font-bold text-xs uppercase flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-md flex items-center justify-center ${isSelected ? 'text-black' : 'border border-current/30'}`} style={{ backgroundColor: isSelected ? activeConfig.accentColor : undefined }}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span>{service.name}</span>
                          </div>
                        </div>
                        <p className="text-[11px] opacity-70 leading-tight mb-2 pl-6">
                          {service.desc}
                        </p>
                      </div>
                      <div className="text-xs font-black pl-6" style={{ color: activeConfig.accentColor }}>
                        ${service.price} {service.isMonthly ? '/month' : 'one-time'}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sliders */}
              <div className={`space-y-5 pt-4 border-t ${activeConfig.borderClass}`}>
                <h3 className="text-sm font-black uppercase flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full text-black text-xs flex items-center justify-center font-black" style={{ backgroundColor: activeConfig.accentColor }}>2</span>
                  Business Benchmarks
                </h3>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5 uppercase">
                    <span>Monthly Paid Ad Budget</span>
                    <span style={{ color: activeConfig.accentColor }}>${adBudget.toLocaleString()} / mo</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="500"
                    value={adBudget}
                    onChange={(e) => setAdBudget(Number(e.target.value))}
                    className="w-full h-2 rounded-lg cursor-pointer accent-current"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5 uppercase">
                    <span>Current Website Traffic</span>
                    <span style={{ color: activeConfig.accentColor }}>{monthlyTraffic.toLocaleString()} visitors/mo</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={monthlyTraffic}
                    onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
                    className="w-full h-2 rounded-lg cursor-pointer accent-current"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5 uppercase">
                    <span>Average Deal Size / Lead Value</span>
                    <span style={{ color: activeConfig.accentColor }}>${avgOrderValue}</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="1000"
                    step="20"
                    value={avgOrderValue}
                    onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                    className="w-full h-2 rounded-lg cursor-pointer accent-current"
                  />
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className={`rounded-3xl p-6 sm:p-7 border shadow-2xl space-y-6 ${activeConfig.cardClass} ${activeConfig.borderClass}`}>
              
              <div className={`flex items-center justify-between border-b pb-4 ${activeConfig.borderClass}`}>
                <span className="text-xs font-black uppercase tracking-wider">Package Summary</span>
                {isBundle && (
                  <span className="text-[10px] font-black uppercase text-black px-2.5 py-1 rounded-full" style={{ backgroundColor: activeConfig.accentColor }}>
                    15% Bundle Discount
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between opacity-80">
                  <span>Selected Capabilities ({selectedServices.length})</span>
                  <span>${rawTotal}</span>
                </div>
                {isBundle && (
                  <div className="flex justify-between font-bold" style={{ color: activeConfig.accentColor }}>
                    <span>Bundle Savings</span>
                    <span>-${Math.round(rawTotal * 0.15)}</span>
                  </div>
                )}
                <div className={`flex justify-between items-baseline pt-2 border-t ${activeConfig.borderClass}`}>
                  <span className="text-sm font-black uppercase">Estimated Retainer</span>
                  <div className="text-right">
                    <span className="text-3xl font-black" style={{ color: activeConfig.accentColor }}>${finalPrice}</span>
                    <span className="text-[10px] opacity-60 block">/month</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl border space-y-3" style={{ backgroundColor: `${activeConfig.accentColor}15`, borderColor: `${activeConfig.accentColor}40` }}>
                <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider" style={{ color: activeConfig.accentColor }}>
                  <TrendingUp className="w-4 h-4" />
                  Estimated Monthly Impact
                </div>

                <div className="grid grid-cols-2 gap-2 text-left text-xs">
                  <div className={`p-2.5 rounded-xl border ${activeConfig.bgClass} ${activeConfig.borderClass}`}>
                    <div className="text-[9px] uppercase font-bold opacity-60">Traffic Target</div>
                    <div className="text-sm font-black">{estimatedNewTraffic.toLocaleString()}</div>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${activeConfig.bgClass} ${activeConfig.borderClass}`}>
                    <div className="text-[9px] uppercase font-bold opacity-60">Monthly Leads</div>
                    <div className="text-sm font-black" style={{ color: activeConfig.accentColor }}>~{estimatedLeads} leads</div>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${activeConfig.bgClass} ${activeConfig.borderClass}`}>
                  <span>Target Revenue Boost</span>
                  <span style={{ color: activeConfig.accentColor }}>+${estimatedMonthlyRevenue.toLocaleString()}/mo</span>
                </div>
              </div>

              <button
                onClick={handleApplyPackage}
                className="w-full py-4 rounded-xl text-black font-black text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 min-h-[48px] active:scale-95"
                style={{ backgroundColor: activeConfig.accentColor }}
              >
                <span>Request Proposal For This Package</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <div className="text-[10px] font-bold uppercase tracking-widest text-center flex items-center justify-center gap-1.5 opacity-60">
                <ShieldCheck className="w-3.5 h-3.5" style={{ color: activeConfig.accentColor }} />
                Transparent Pricing • Tailored Scope
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
