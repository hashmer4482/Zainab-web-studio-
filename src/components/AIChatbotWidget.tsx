import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Loader2, Bot, User, ExternalLink } from 'lucide-react';
import Markdown from 'react-markdown';
import { ChatMessage, ThemeMode } from '../types';
import { THEME_CONFIGS } from '../data/themeData';

interface AIChatbotWidgetProps {
  theme: ThemeMode;
}

export const AIChatbotWidget: React.FC<AIChatbotWidgetProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: "Hello! Welcome to Zainab Web Studio. I'm your AI Strategy Assistant. Ask me anything about our Web Development, SEO, SMM, PPC, or Canva video ad services!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS.dark;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, conversationHistory: history })
      });

      if (!res.ok) throw new Error('Chat server error');

      const data = await res.json();
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || "I'm happy to help you with our growth packages. Would you like to schedule a strategy call?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "Zainab Web Studio is ready to scale your business! You can contact us directly on WhatsApp at +923324357459 or email shakeelammar59@gmail.com.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-16 lg:bottom-6 right-4 sm:right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full text-black font-black uppercase text-xs tracking-widest shadow-2xl transition-all transform hover:scale-105 active:scale-95 border border-white/20 min-h-[44px]"
          style={{ backgroundColor: activeConfig.accentColor }}
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-black" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
          </div>
          <span>AI Assistant</span>
          <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-md font-bold ml-1">
            24/7
          </span>
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className={`w-[340px] sm:w-[380px] h-[480px] sm:h-[520px] rounded-3xl shadow-2xl flex flex-col border overflow-hidden transition-all animate-fadeIn ${activeConfig.bgClass} ${activeConfig.borderClass} ${activeConfig.textClass}`}>
          
          {/* Header */}
          <div className="text-black p-4 flex items-center justify-between" style={{ backgroundColor: activeConfig.accentColor }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center" style={{ color: activeConfig.accentColor }}>
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-tightest">Zainab Web Studio AI</div>
                <div className="text-[10px] font-bold opacity-80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-900 inline-block" />
                  Live Strategy Assistant
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-black/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Info Bar */}
          <div className={`px-4 py-2 text-[10px] uppercase tracking-wider font-bold border-b flex justify-between items-center ${activeConfig.cardClass} ${activeConfig.borderClass}`}>
            <span>WhatsApp: +923324357459</span>
            <a
              href="https://wa.me/923324357459"
              target="_blank"
              rel="noreferrer"
              className="hover:underline flex items-center gap-0.5 font-black"
              style={{ color: activeConfig.accentColor }}
            >
              Direct Chat <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg text-black flex items-center justify-center flex-shrink-0 font-bold" style={{ backgroundColor: activeConfig.accentColor }}>
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'text-black font-medium rounded-tr-none shadow-md'
                      : `${activeConfig.cardClass} ${activeConfig.borderClass} border rounded-tl-none`
                  }`}
                  style={{
                    backgroundColor: m.sender === 'user' ? activeConfig.accentColor : undefined
                  }}
                >
                  <div className="markdown-body leading-relaxed text-xs">
                    <Markdown
                      components={{
                        p: ({ children }) => <p className="mb-1.5 last:mb-0 leading-relaxed">{children}</p>,
                        strong: ({ children }) => <strong className="font-bold opacity-100">{children}</strong>,
                        em: ({ children }) => <em className="italic opacity-90">{children}</em>,
                        ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-1.5 pl-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-1.5 pl-1">{children}</ol>,
                        li: ({ children }) => <li className="leading-snug">{children}</li>,
                        h1: ({ children }) => <h1 className="text-sm font-black uppercase mt-2 mb-1">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-xs font-black uppercase mt-2 mb-1">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-xs font-bold uppercase mt-1.5 mb-0.5">{children}</h3>,
                        code: ({ children, inline }: any) => 
                          inline ? (
                            <code className="px-1 py-0.5 rounded text-[10px] font-mono bg-black/20 font-bold">{children}</code>
                          ) : (
                            <pre className="p-2 rounded-lg text-[10px] font-mono bg-black/30 overflow-x-auto my-1.5">
                              <code>{children}</code>
                            </pre>
                          ),
                        a: ({ href, children }) => (
                          <a href={href} target="_blank" rel="noreferrer" className="underline font-bold hover:opacity-80">
                            {children}
                          </a>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-2 border-current/40 pl-2 italic my-1.5 opacity-90">
                            {children}
                          </blockquote>
                        )
                      }}
                    >
                      {m.text}
                    </Markdown>
                  </div>
                  <span className={`block text-[9px] mt-1 ${
                    m.sender === 'user' ? 'text-black/70 text-right font-bold' : 'opacity-60'
                  }`}>
                    {m.timestamp}
                  </span>
                </div>
                {m.sender === 'user' && (
                  <div className={`w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 font-bold ${activeConfig.cardClass} ${activeConfig.borderClass}`}>
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center opacity-70">
                <div className="w-7 h-7 rounded-lg text-black flex items-center justify-center" style={{ backgroundColor: activeConfig.accentColor }}>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                </div>
                <span className="text-[11px] italic font-serif">Analyzing strategy response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Pills */}
          <div className={`p-2 overflow-x-auto flex gap-1.5 border-t text-[10px] ${activeConfig.cardClass} ${activeConfig.borderClass}`}>
            <button
              onClick={() => handleSendMessage("What SEO plans do you offer?")}
              className="px-2.5 py-1 rounded-full border border-current/30 hover:opacity-100 whitespace-nowrap font-medium"
              style={{ color: activeConfig.accentColor }}
            >
              SEO Plans?
            </button>
            <button
              onClick={() => handleSendMessage("How much for a custom website?")}
              className="px-2.5 py-1 rounded-full border border-current/30 hover:opacity-100 whitespace-nowrap font-medium"
              style={{ color: activeConfig.accentColor }}
            >
              Web Pricing?
            </button>
            <button
              onClick={() => handleSendMessage("Who engineered this website?")}
              className="px-2.5 py-1 rounded-full border border-current/30 hover:opacity-100 whitespace-nowrap font-medium"
              style={{ color: activeConfig.accentColor }}
            >
              Developer Info?
            </button>
          </div>

          {/* Input Area */}
          <div className={`p-3 border-t flex items-center gap-2 ${activeConfig.bgClass} ${activeConfig.borderClass}`}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about SEO, Web Design, PPC..."
              className={`flex-1 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none border ${activeConfig.cardClass} ${activeConfig.borderClass}`}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputText.trim()}
              className="p-2.5 rounded-xl text-black disabled:opacity-40 transition-opacity"
              style={{ backgroundColor: activeConfig.accentColor }}
            >
              <Send className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
