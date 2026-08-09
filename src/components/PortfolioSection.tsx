import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/agencyData';
import { PortfolioProject, ThemeMode } from '../types';
import { THEME_CONFIGS } from '../data/themeData';
import { Sparkles, TrendingUp, X, Quote, ArrowRight } from 'lucide-react';

interface PortfolioSectionProps {
  onOpenContactWithProject: (projectTitle: string) => void;
  theme: ThemeMode;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenContactWithProject, theme }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);

  const activeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.dark;

  const filters = ['All', 'SEO', 'SMM', 'Web Design', 'PPC'];

  const filteredProjects = selectedFilter === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.serviceCategory === selectedFilter || p.tags.includes(selectedFilter));

  return (
    <section id="portfolio" className={`py-16 sm:py-24 border-b transition-colors relative ${activeConfig.bgClass} ${activeConfig.borderClass} ${activeConfig.textClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-current/10 border border-current/20">
            <Sparkles className="w-3.5 h-3.5" style={{ color: activeConfig.accentColor }} />
            <span>Case Studies & Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tightest">
            Proven Digital Growth Benchmarks
          </h2>
          <p className="text-xs sm:text-sm font-light opacity-80 max-w-2xl mx-auto">
            Explore how Zainab Web Studio engineered custom web applications, dominant Google SEO campaigns, and high-converting paid advertising funnels.
          </p>

          {/* Filters with Mobile Horizontal Touch Scroll */}
          <div className="flex items-center gap-2 pt-4 overflow-x-auto no-scrollbar pb-2 sm:justify-center">
            {filters.map((filter) => {
              const isSelected = selectedFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all whitespace-nowrap min-h-[40px] ${
                    isSelected
                      ? 'text-black font-black shadow-lg'
                      : `${activeConfig.cardClass} ${activeConfig.borderClass} opacity-80 hover:opacity-100`
                  }`}
                  style={{
                    backgroundColor: isSelected ? activeConfig.accentColor : undefined,
                    borderColor: isSelected ? activeConfig.accentColor : undefined
                  }}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`group rounded-3xl border overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${activeConfig.cardClass} ${activeConfig.borderClass}`}
            >
              <div>
                {/* Image & Metric Overlay */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-black">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Metric Badge */}
                  <div className="absolute top-4 right-4 bg-black/90 border border-white/20 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-2xl flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-white" style={{ color: activeConfig.accentColor }} />
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-widest" style={{ color: activeConfig.accentColor }}>{project.keyMetricLabel}</div>
                      <div className="text-xs font-black text-white">{project.keyMetricValue}</div>
                    </div>
                  </div>

                  {/* Industry Badge */}
                  <div 
                    className="absolute bottom-4 left-4 text-black px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest"
                    style={{ backgroundColor: activeConfig.accentColor }}
                  >
                    {project.client} • {project.industry}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 space-y-3">
                  <h3 className="text-xl font-black uppercase tracking-tight transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs opacity-80 leading-relaxed font-normal">
                    {project.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${activeConfig.bgClass} ${activeConfig.borderClass}`}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className={`px-6 sm:px-7 pb-6 sm:pb-7 pt-4 flex items-center justify-between border-t ${activeConfig.borderClass}`}>
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-black uppercase tracking-wider flex items-center gap-1 hover:underline min-h-[40px]"
                  style={{ color: activeConfig.accentColor }}
                >
                  View Strategy
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenContactWithProject(project.title)}
                  className="px-4 py-2.5 rounded-xl text-black text-xs font-black uppercase tracking-wider transition-opacity hover:opacity-90 shadow-md min-h-[40px] active:scale-95"
                  style={{ backgroundColor: activeConfig.accentColor }}
                >
                  Replicate Growth
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className={`relative w-full max-w-2xl border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto ${activeConfig.bgClass} ${activeConfig.borderClass} ${activeConfig.textClass}`}>
            
            <button
              onClick={() => setActiveModalProject(null)}
              className={`absolute top-6 right-6 p-2 rounded-full border ${activeConfig.cardClass} ${activeConfig.borderClass}`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: activeConfig.accentColor }}>
                Case Study • {activeModalProject.client}
              </span>
              <h3 className="text-2xl font-black uppercase">{activeModalProject.title}</h3>
            </div>

            <div 
              className="p-4 rounded-2xl border flex items-center justify-between"
              style={{ backgroundColor: `${activeConfig.accentColor}15`, borderColor: `${activeConfig.accentColor}40` }}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: activeConfig.accentColor }}>{activeModalProject.keyMetricLabel}</span>
                <div className="text-3xl font-black" style={{ color: activeConfig.accentColor }}>{activeModalProject.keyMetricValue}</div>
              </div>
              <TrendingUp className="w-8 h-8" style={{ color: activeConfig.accentColor }} />
            </div>

            <div className="space-y-4 text-xs">
              <div className={`p-4 rounded-xl border space-y-1 ${activeConfig.cardClass} ${activeConfig.borderClass}`}>
                <span className="font-black uppercase tracking-wider" style={{ color: activeConfig.accentColor }}>The Challenge</span>
                <p className="opacity-90">{activeModalProject.challenge}</p>
              </div>
              <div className={`p-4 rounded-xl border space-y-1 ${activeConfig.cardClass} ${activeConfig.borderClass}`}>
                <span className="font-black uppercase tracking-wider" style={{ color: activeConfig.accentColor }}>Zainab Web Studio Strategy</span>
                <p className="opacity-90">{activeModalProject.solution}</p>
              </div>
            </div>

            {activeModalProject.testimonial && (
              <div className={`p-5 rounded-2xl border space-y-2 relative ${activeConfig.cardClass} ${activeConfig.borderClass}`}>
                <Quote className="w-5 h-5 absolute top-4 right-4 opacity-30" style={{ color: activeConfig.accentColor }} />
                <p className="text-xs italic font-serif">"{activeModalProject.testimonial.quote}"</p>
                <div className="text-[11px] font-bold">
                  — {activeModalProject.testimonial.author} ({activeModalProject.testimonial.role})
                </div>
              </div>
            )}

            <button
              onClick={() => {
                const projectTitle = activeModalProject.title;
                setActiveModalProject(null);
                onOpenContactWithProject(projectTitle);
              }}
              className="w-full py-3.5 rounded-xl text-black font-black text-xs uppercase tracking-widest shadow-lg min-h-[44px]"
              style={{ backgroundColor: activeConfig.accentColor }}
            >
              Replicate Similar Results For Your Brand
            </button>

          </div>
        </div>
      )}

    </section>
  );
};
