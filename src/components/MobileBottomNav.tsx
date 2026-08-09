import React from 'react';
import { Phone, MessageSquare, Send, Palette, Calculator } from 'lucide-react';
import { ThemeMode } from '../types';
import { THEME_CONFIGS } from '../data/themeData';

interface MobileBottomNavProps {
  onOpenContact: () => void;
  onOpenThemeSelector: () => void;
  theme: ThemeMode;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenContact,
  onOpenThemeSelector,
  theme
}) => {
  const activeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.dark;

  const scrollToCalculator = () => {
    const el = document.querySelector('#calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-xl px-2 py-2 transition-colors ${activeConfig.bgClass}/95 ${activeConfig.borderClass}`}>
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
        
        {/* Call Direct Button */}
        <a
          href="tel:+923324357459"
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all active:scale-95 ${activeConfig.cardClass} ${activeConfig.borderClass} border`}
        >
          <Phone className="w-4 h-4 mb-1" style={{ color: activeConfig.accentColor }} />
          <span className="text-[10px] font-black uppercase tracking-tight">Call Us</span>
        </a>

        {/* WhatsApp Direct Chat */}
        <a
          href="https://wa.me/923324357459?text=Hello%20Zainab%20Web%20Studio!%20I%20am%20interested%20in%20scaling%20my%20brand%20online."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#25D366] text-black font-black transition-all active:scale-95 shadow-md"
        >
          <MessageSquare className="w-4 h-4 mb-1 text-black fill-black" />
          <span className="text-[10px] font-black uppercase tracking-tight">WhatsApp</span>
        </a>

        {/* Get Proposal / Contact Modal */}
        <button
          onClick={onOpenContact}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl font-black text-black transition-all active:scale-95 shadow-md"
          style={{ backgroundColor: activeConfig.accentColor }}
        >
          <Send className="w-4 h-4 mb-1 text-black" />
          <span className="text-[10px] font-black uppercase tracking-tight">Proposal</span>
        </button>

        {/* Theme Switcher Modal Trigger */}
        <button
          onClick={onOpenThemeSelector}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all active:scale-95 ${activeConfig.cardClass} ${activeConfig.borderClass} border`}
        >
          <Palette className="w-4 h-4 mb-1" style={{ color: activeConfig.accentColor }} />
          <span className="text-[10px] font-black uppercase tracking-tight">Themes</span>
        </button>

      </div>
    </div>
  );
};
