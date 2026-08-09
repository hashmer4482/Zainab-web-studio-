import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { CheckCircle2, ShieldCheck, Sparkles, ArrowRight, UserCheck, Zap } from 'lucide-react';
import { AuthUser, ThemeMode } from '../types';
import { THEME_CONFIGS } from '../data/themeData';

interface SignInSuccessModalProps {
  isOpen: boolean;
  user: AuthUser | null;
  onClose: () => void;
  theme: ThemeMode;
}

export const SignInSuccessModal: React.FC<SignInSuccessModalProps> = ({
  isOpen,
  user,
  onClose,
  theme
}) => {
  const activeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.dark;

  useEffect(() => {
    if (isOpen) {
      // 1. Play synthesized audio chime
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          const ctx = new AudioContext();
          const now = ctx.currentTime;
          const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
          freqs.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.08);

            gain.gain.setValueAtTime(0.001, now + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.08 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.5);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.55);
          });
        }
      } catch {
        // Audio might be blocked by browser policy, ignore gracefully
      }

      // 2. Trigger multi-stage confetti explosion
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#00F2FE', '#4FACFE', '#FFD700', '#10B981', '#EC4899', '#3B82F6']
      });

      const timer1 = setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 60,
          origin: { x: 0.05, y: 0.65 },
          colors: ['#00F2FE', '#FFD700', '#10B981']
        });
      }, 200);

      const timer2 = setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 120,
          spread: 60,
          origin: { x: 0.95, y: 0.65 },
          colors: ['#4FACFE', '#FFD700', '#EC4899']
        });
      }, 400);

      // Auto close after 3.2s
      const timerClose = setTimeout(() => {
        onClose();
      }, 3200);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timerClose);
      };
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          {/* Background Radial Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute w-96 h-96 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: activeConfig.accentColor }}
          />

          {/* Main Success Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border text-center overflow-hidden ${activeConfig.bgClass} ${activeConfig.borderClass} ${activeConfig.textClass}`}
          >
            {/* Top Animated Accent Wave Bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1.5 animate-pulse"
              style={{ backgroundColor: activeConfig.accentColor }}
            />

            {/* Glowing Avatar / Checkmark Badge Container */}
            <div className="relative mx-auto w-24 h-24 mb-5 flex items-center justify-center">
              {/* Outer Pulsing Ring */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: activeConfig.accentColor }}
              />

              {/* Avatar Image or User Icon */}
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || 'User'}
                  className="w-20 h-20 rounded-full object-cover border-2 shadow-xl z-10"
                  style={{ borderColor: activeConfig.accentColor }}
                />
              ) : (
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center border-2 shadow-xl z-10 text-slate-900 font-black text-2xl"
                  style={{ backgroundColor: activeConfig.accentColor, borderColor: activeConfig.accentColor }}
                >
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'G'}
                </div>
              )}

              {/* Success Badge Icon Overlay */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                className="absolute -bottom-1 -right-1 z-20 bg-emerald-500 text-white p-1.5 rounded-full shadow-lg border-2 border-slate-950"
              >
                <CheckCircle2 className="w-5 h-5" />
              </motion.div>
            </div>

            {/* Sparkles & Welcome Heading */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="space-y-1"
            >
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-widest bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-2"
              >
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>{user?.isGuest ? 'Guest Portal Unlocked' : 'Authentication Successful'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                Welcome, <span style={{ color: activeConfig.accentColor }}>{user?.name || 'Explorer'}</span>!
              </h2>

              <p className="text-xs opacity-80 max-w-xs mx-auto pt-1 font-medium leading-relaxed">
                {user?.isGuest
                  ? 'You are now exploring Zainab Web Studio in guest strategy mode.'
                  : `Authenticated via Google Firebase (${user?.email}).`}
              </p>
            </motion.div>

            {/* Feature Highlights Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-6 pt-5 border-t border-current/10 grid grid-cols-2 gap-2 text-[11px]"
            >
              <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${activeConfig.cardClass} ${activeConfig.borderClass}`}>
                <Zap className="w-4 h-4 flex-shrink-0" style={{ color: activeConfig.accentColor }} />
                <span className="font-bold text-left text-[10px] uppercase">AI Assistant Ready</span>
              </div>
              <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${activeConfig.cardClass} ${activeConfig.borderClass}`}>
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-bold text-left text-[10px] uppercase">ROI Tools Active</span>
              </div>
            </motion.div>

            {/* CTA Button & Shimmer Progress Timer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-6 space-y-3"
            >
              <button
                onClick={onClose}
                className="w-full py-3 px-5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg text-slate-950 hover:brightness-110"
                style={{ backgroundColor: activeConfig.accentColor }}
              >
                <span>Enter Studio Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Progress Line */}
              <div className="w-full bg-current/10 h-1 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 3.2, ease: "linear" }}
                  className="h-full"
                  style={{ backgroundColor: activeConfig.accentColor }}
                />
              </div>
            </motion.div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
