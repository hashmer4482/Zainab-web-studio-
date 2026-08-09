import React, { useState } from 'react';
import { X, User, LogIn, LogOut, Loader2, AlertCircle } from 'lucide-react';
import { AuthUser, ThemeMode } from '../types';
import { THEME_CONFIGS } from '../data/themeData';
import { signInWithGoogle } from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AuthUser | null;
  onLoginGoogleSuccess: (email: string, name: string, avatar?: string, uid?: string) => void;
  onContinueGuest: () => void;
  onLogout: () => void;
  theme: ThemeMode;
  isInitialGate?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onLoginGoogleSuccess,
  onContinueGuest,
  onLogout,
  theme,
  isInitialGate = false
}) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const activeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.dark;

  if (!isOpen) return null;

  const handleGoogleSignInClick = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    try {
      const fbUser = await signInWithGoogle();
      if (fbUser) {
        onLoginGoogleSuccess(
          fbUser.email || '', 
          fbUser.displayName || 'Google User', 
          fbUser.photoURL || undefined,
          fbUser.uid
        );
      }
    } catch (err: any) {
      console.error("Google Auth error:", err);
      let msg = "Google Sign-In failed. Please try again or continue as Guest.";
      if (err.code === 'auth/popup-closed-by-user') {
        msg = "Sign-in popup was closed before completion.";
      } else if (err.code === 'auth/cancelled-popup-request') {
        msg = "Authentication request was cancelled.";
      } else if (err.message) {
        msg = err.message;
      }
      setAuthError(msg);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fadeIn">
      <div className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all ${activeConfig.bgClass} ${activeConfig.borderClass} ${activeConfig.textClass}`}>
        
        {/* Close Button - hidden if initial gate requires choice */}
        {!isInitialGate && (
          <button
            onClick={onClose}
            className={`absolute top-6 right-6 p-2 rounded-full border ${activeConfig.cardClass} ${activeConfig.borderClass}`}
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <img
            src="https://i.ibb.co/27Tjmq1y/1786283895523.png"
            alt="Zainab Web Studio Logo"
            className="w-12 h-12 aspect-square object-cover rounded-xl border shadow-md flex-shrink-0"
            style={{ borderColor: activeConfig.accentColor }}
          />
          <div>
            <div className="text-[10px] uppercase tracking-widest font-bold" style={{ color: activeConfig.accentColor }}>
              Zainab Web Studio Hub
            </div>
            <h3 className="text-xl font-black uppercase tracking-tightest">
              {isInitialGate ? 'Welcome! Select Sign In Mode' : 'Account Authentication'}
            </h3>
          </div>
        </div>

        {/* Welcome Notice Banner */}
        {isInitialGate && !user?.name && !user?.isGuest && (
          <div className={`p-4 rounded-2xl border mb-5 text-xs space-y-1 ${activeConfig.cardClass} ${activeConfig.borderClass}`}>
            <div className="font-bold uppercase text-[10px]" style={{ color: activeConfig.accentColor }}>
              Access Platform
            </div>
            <p className="opacity-90 leading-relaxed font-medium">
              Please choose how you would like to experience Zainab Web Studio today. Select <strong>Sign In With Google</strong> or <strong>Continue As Guest</strong> to enter.
            </p>
          </div>
        )}

        {/* Auth Error Banner */}
        {authError && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <span>{authError}</span>
          </div>
        )}

        {/* If User is already signed in or guest (and not currently on initial gate asking to sign in) */}
        {!isInitialGate && (user?.name || user?.isGuest) ? (
          <div className="space-y-6">
            <div className={`p-5 rounded-2xl border space-y-3 ${activeConfig.cardClass} ${activeConfig.borderClass}`}>
              <div className="flex items-center gap-3">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name || 'User'} 
                    className="w-12 h-12 rounded-full border object-cover"
                    style={{ borderColor: activeConfig.accentColor }}
                  />
                ) : (
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center font-black text-black text-base border"
                    style={{ backgroundColor: activeConfig.accentColor, borderColor: activeConfig.accentColor }}
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : 'G'}
                  </div>
                )}
                <div>
                  <div className="text-sm font-bold">{user.name || 'Guest Explorer'}</div>
                  <div className="text-xs opacity-70">
                    {user.email || 'Browsing in Guest Strategy Mode'}
                  </div>
                  <span className="inline-block mt-1 text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded text-black" style={{ backgroundColor: activeConfig.accentColor }}>
                    {user.isGuest ? 'Guest Access' : 'Firebase Verified Google User'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={onLogout}
                className="w-full py-3 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all min-h-[44px]"
              >
                <LogOut className="w-4 h-4" />
                Sign Out / Switch Mode
              </button>
            </div>
          </div>
        ) : (
          /* Primary Action Buttons: Google Sign In OR Guest */
          <div className="space-y-4">
            <button
              onClick={handleGoogleSignInClick}
              disabled={isSigningIn}
              className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-slate-100 disabled:opacity-70 text-slate-900 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-3 border border-slate-300 transition-all active:scale-95 min-h-[48px]"
            >
              {isSigningIn ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-slate-900" />
                  <span>Connecting to Firebase Google Auth...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Sign In With Google</span>
                </>
              )}
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t opacity-20" style={{ borderColor: activeConfig.accentColor }}></div>
              <span className="flex-shrink mx-4 text-[10px] uppercase tracking-widest opacity-60 font-bold">
                OR
              </span>
              <div className="flex-grow border-t opacity-20" style={{ borderColor: activeConfig.accentColor }}></div>
            </div>

            <button
              onClick={() => {
                onContinueGuest();
                onClose();
              }}
              disabled={isSigningIn}
              className={`w-full py-3.5 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all min-h-[48px] active:scale-95 ${activeConfig.cardClass} ${activeConfig.borderClass}`}
            >
              <User className="w-4 h-4" style={{ color: activeConfig.accentColor }} />
              <span>Continue As Guest Explorer</span>
            </button>
          </div>
        )}

        {/* Developer Credit Note */}
        <div className="mt-8 pt-4 border-t border-current/10 text-[10px] text-center opacity-60">
          Engineered by{' '}
          <a
            href="https://hashmerdev.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="font-bold hover:underline"
            style={{ color: activeConfig.accentColor }}
          >
            Muhammad Abdullah Hashmi
          </a>
        </div>
      </div>
    </div>
  );
};
