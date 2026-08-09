import React, { useState, useEffect } from 'react';
import { ThemeMode } from '../types';
import { THEME_CONFIGS } from '../data/themeData';
import { X, Send, PhoneCall, CheckCircle2, ShieldCheck, Loader2, Globe, Mail, User } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
  prefilledMessage?: string;
  theme: ThemeMode;
}

export const ContactModal: React.FC<ContactModalProps> = ({ 
  isOpen, 
  onClose, 
  prefilledService = '', 
  prefilledMessage = '',
  theme
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [service, setService] = useState(prefilledService || 'Website Design & Optimization');
  const [budget, setBudget] = useState('Discuss Pricing via Email / WhatsApp');
  const [message, setMessage] = useState(prefilledMessage || '');

  const [isLoading, setIsLoading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [error, setError] = useState('');

  const activeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.dark;

  useEffect(() => {
    if (prefilledService) setService(prefilledService);
    if (prefilledMessage) setMessage(prefilledMessage);
  }, [prefilledService, prefilledMessage]);

  if (!isOpen) return null;

  const buildMailtoUrl = () => {
    const subject = `[Zainab Web Studio Request] ${service} - ${name || 'Client Inquiry'}`;
    const body = `Hello Zainab Web Studio Team,

I am submitting a strategy proposal request with the following details:

- Name: ${name || 'Not provided'}
- Email: ${email || 'Not provided'}
- Phone: ${phone || 'Not provided'}
- Website / Business: ${website || 'Not provided'}
- Selected Service: ${service}
- Budget Target: ${budget}
- Notes & Goals:
${message || 'None provided'}

Looking forward to your response!
Direct Email: shakeelammar59@gmail.com
Website: https://zainabwebstudio.online`;

    return `mailto:shakeelammar59@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, website, service, budget, message })
      });

      if (!res.ok) {
        throw new Error('Submission failed');
      }

      const data = await res.json();
      setSubmissionResult(data);

      // Automatically launch mailto client as well
      const mailtoUrl = buildMailtoUrl();
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 600);
    } catch (err: any) {
      setError('Failed to send consultation request. You can send directly via Mail App below.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className={`relative w-full max-w-2xl border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto my-8 ${activeConfig.bgClass} ${activeConfig.borderClass} ${activeConfig.textClass}`}>
        
        <button
          onClick={onClose}
          className={`absolute top-6 right-6 p-2 rounded-full border ${activeConfig.cardClass} ${activeConfig.borderClass}`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className={`flex items-center gap-3.5 border-b pb-5 ${activeConfig.borderClass}`}>
          <div className="p-3.5 rounded-2xl text-black font-black" style={{ backgroundColor: activeConfig.accentColor }}>
            <PhoneCall className="w-6 h-6 text-black" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: activeConfig.accentColor }}>Zainab Web Studio Strategy</div>
            <h3 className="text-2xl font-black uppercase tracking-tightest">Request Growth Proposal</h3>
            <p className="text-xs opacity-80">Custom web development, SEO, PPC ads, and social media scaling.</p>
          </div>
        </div>

        {submissionResult ? (
          <div className="py-8 text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full text-black flex items-center justify-center mx-auto shadow-2xl" style={{ backgroundColor: activeConfig.accentColor }}>
              <CheckCircle2 className="w-10 h-10 text-black" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-black px-3 py-1 rounded-full" style={{ backgroundColor: activeConfig.accentColor }}>
                Ref: {submissionResult.bookingId}
              </span>
              <h4 className="text-2xl font-black uppercase">Request Submitted!</h4>
              <p className="text-xs opacity-80 max-w-md mx-auto leading-relaxed">
                {submissionResult.message}
              </p>
            </div>
            <div className={`p-4 rounded-2xl border text-left text-xs space-y-2 max-w-md mx-auto ${activeConfig.cardClass} ${activeConfig.borderClass}`}>
              <div className="font-black uppercase text-[10px]" style={{ color: activeConfig.accentColor }}>Scope Overview</div>
              <div><strong>Service:</strong> {service}</div>
              <div><strong>Pricing Discussion:</strong> {budget}</div>
              {website && <div><strong>Target Site:</strong> {website}</div>}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <a
                href={buildMailtoUrl()}
                className="flex-1 py-3.5 px-4 rounded-xl border text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/10 transition-colors min-h-[44px]"
                style={{ borderColor: activeConfig.accentColor, color: activeConfig.accentColor }}
              >
                <Mail className="w-4 h-4" />
                <span>Open Mail App (mailto)</span>
              </a>
              <button
                onClick={handleReset}
                className="flex-1 py-3.5 px-4 rounded-xl text-black font-black text-xs uppercase tracking-widest shadow-xl min-h-[44px]"
                style={{ backgroundColor: activeConfig.accentColor }}
              >
                Done & Return
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3.5" style={{ color: activeConfig.accentColor }} />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Zaid Khan"
                    className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none ${activeConfig.cardClass} ${activeConfig.borderClass}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5" style={{ color: activeConfig.accentColor }} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="zaid@company.com"
                    className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none ${activeConfig.cardClass} ${activeConfig.borderClass}`}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Phone (Optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 0000000"
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none ${activeConfig.cardClass} ${activeConfig.borderClass}`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Website / Business</label>
                <div className="relative">
                  <Globe className="w-4 h-4 absolute left-3.5 top-3.5" style={{ color: activeConfig.accentColor }} />
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="e.g. www.mybrand.com"
                    className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none ${activeConfig.cardClass} ${activeConfig.borderClass}`}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Primary Service *</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 cursor-pointer bg-neutral-900 text-white dark:bg-neutral-900 dark:text-white border-neutral-700 shadow-sm appearance-auto font-medium"
                >
                  <option value="Website Design & Optimization" className="bg-neutral-900 text-white font-sans py-1.5 px-2">Website Design & Optimization</option>
                  <option value="Search Engine Optimization (SEO)" className="bg-neutral-900 text-white font-sans py-1.5 px-2">Search Engine Optimization (SEO)</option>
                  <option value="Social Media Marketing (SMM)" className="bg-neutral-900 text-white font-sans py-1.5 px-2">Social Media Marketing (SMM)</option>
                  <option value="Pay-Per-Click (PPC) Advertising" className="bg-neutral-900 text-white font-sans py-1.5 px-2">Pay-Per-Click (PPC) Advertising</option>
                  <option value="Content Creation & Copywriting" className="bg-neutral-900 text-white font-sans py-1.5 px-2">Content Creation & Copywriting</option>
                  <option value="Canva Ads & Video Making" className="bg-neutral-900 text-white font-sans py-1.5 px-2">Canva Ads & Video Making</option>
                  <option value="Full Digital Growth Retainer" className="bg-neutral-900 text-white font-sans py-1.5 px-2">Full Multi-Service Retainer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Pricing & Discussion Channel</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 cursor-pointer bg-neutral-900 text-white dark:bg-neutral-900 dark:text-white border-neutral-700 shadow-sm appearance-auto font-medium"
                >
                  <option value="Discuss Pricing via Email (shakeelammar59@gmail.com)" className="bg-neutral-900 text-white font-sans py-1.5 px-2">Discuss Pricing via Email</option>
                  <option value="Discuss Pricing via WhatsApp Chat (+92 332 4357459)" className="bg-neutral-900 text-white font-sans py-1.5 px-2">Discuss Pricing via WhatsApp Chat</option>
                  <option value="Request Custom Retainer Proposal" className="bg-neutral-900 text-white font-sans py-1.5 px-2">Request Custom Retainer Proposal</option>
                  <option value="Discuss via Phone Call / Virtual Meeting" className="bg-neutral-900 text-white font-sans py-1.5 px-2">Discuss via Phone Call / Meeting</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Project Goals & Notes</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your growth targets or specific requirements..."
                className={`w-full border rounded-xl p-3 text-xs focus:outline-none ${activeConfig.cardClass} ${activeConfig.borderClass}`}
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-950/40 p-3 rounded-xl border border-red-800">{error}</p>
            )}

            <div className="space-y-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl text-black font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 min-h-[48px]"
                style={{ backgroundColor: activeConfig.accentColor }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>Submitting Consultation Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-black" />
                    <span>Submit Request & Trigger Email (Mailto)</span>
                  </>
                )}
              </button>

              <a
                href={buildMailtoUrl()}
                target="_blank"
                rel="noreferrer"
                className={`w-full py-3 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors min-h-[44px] ${activeConfig.cardClass} ${activeConfig.borderClass}`}
              >
                <Mail className="w-4 h-4" style={{ color: activeConfig.accentColor }} />
                <span>Send Directly via Local Email App (Mailto)</span>
              </a>
            </div>

            <div className="text-[10px] font-bold uppercase tracking-widest text-center flex items-center justify-center gap-1.5 pt-1 opacity-70">
              <ShieldCheck className="w-3.5 h-3.5" style={{ color: activeConfig.accentColor }} />
              100% Confidential • We respond within 24 business hours
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
