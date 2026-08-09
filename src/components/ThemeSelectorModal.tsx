import React from 'react';
import { ThemeMode } from '../types';
import { THEME_CONFIGS } from '../data/themeData';
import { Palette, X, Check, Sparkles } from 'lucide-react';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme
}) => {
  if (!isOpen) return null;

  const activeConfig = THEME_CONFIGS[currentTheme] || THEME_CONFIGS.dark;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-lg border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 ${activeConfig.bgClass} ${activeConfig.borderClass} ${activeConfig.textClass}`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-6 right-6 p-2 rounded-full border opacity-80 hover:opacity-100 transition-opacity ${activeConfig.cardClass} ${activeConfig.borderClass}`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-current/10 border border-current/20">
            <Palette className="w-3.5 h-3.5" style={{ color: activeConfig.accentColor }} />
            <span>Visual Theme Engine</span>
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tightest">Choose Your Aesthetic</h3>
          <p className="text-xs opacity-80">
            Select a tailored editorial visual theme optimized for both high-contrast desktop presentation and mobile glare reduction.
          </p>
        </div>

        {/* Theme Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {Object.values(THEME_CONFIGS).map((config) => {
            const isSelected = currentTheme === config.id;
            return (
              <button
                key={config.id}
                onClick={() => {
                  onSelectTheme(config.id);
                  onClose();
                }}
                className={`group relative p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between overflow-hidden hover:scale-[1.02] active:scale-[0.98] ${
                  isSelected
                    ? 'ring-2 shadow-2xl'
                    : 'opacity-85 hover:opacity-100'
                } ${config.bgClass} ${config.borderClass}`}
                style={{
                  borderColor: isSelected ? config.accentColor : undefined,
                  boxShadow: isSelected ? `0 10px 30px -10px ${config.accentColor}40` : undefined
                }}
              >
                {/* Accent Color Strip */}
                <div
                  className="h-1.5 w-full rounded-full mb-3"
                  style={{ backgroundColor: config.accentColor }}
                />

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm uppercase tracking-tight">{config.name}</span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-black font-black text-xs" style={{ backgroundColor: config.accentColor }}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] opacity-70 leading-tight">
                    {config.subtitle}
                  </p>
                </div>

                {/* Color Swatches */}
                <div className="flex items-center gap-1.5 pt-4">
                  <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: config.bgClass.replace('bg-[', '').replace(']', '') }} title="Background" />
                  <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: config.cardClass.replace('bg-[', '').replace(']', '') }} title="Card Surface" />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: config.accentColor }} title="Accent Color" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="pt-2 text-[10px] uppercase tracking-widest font-bold opacity-60 text-center flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" style={{ color: activeConfig.accentColor }} />
          <span>Real-time instant layout restyling</span>
        </div>

      </div>
    </div>
  );
};
