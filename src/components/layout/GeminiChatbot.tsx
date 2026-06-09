"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ArrowRight, MessageSquare, Bot, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "model";
  content: string;
}

const SUGGESTIONS = [
  "How does Pay-When-You-Win work?",
  "What services do you offer?",
  "Are you DVBE/SB certified?",
  "How do I download your capabilities statement?"
];

export default function GeminiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: "Hi! I'm Gemini, your AI Assistant. Ask me anything about government contracts, open bids in your industry, or if you want us to manage your entire bid pipeline!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  // Formatter for simple markdown (bold and bullets)
  const formatText = (text: string) => {
    return text.split("\n").map((line, lineIdx) => {
      let content = line;
      
      // Parse bold **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(content)) !== null) {
        if (match.index > lastIndex) {
          parts.push(content.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="font-extrabold text-slate-900 dark:text-white">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      
      if (lastIndex < content.length) {
        parts.push(content.substring(lastIndex));
      }

      // Check if it's a bullet point
      const isBullet = line.trim().startsWith("* ") || line.trim().startsWith("- ");
      if (isBullet) {
        const bulletText = line.replace(/^[\*\-]\s+/, "");
        return (
          <li key={lineIdx} className="ml-4 list-disc mb-1 text-slate-700 dark:text-slate-300">
            {parts.length > 0 ? parts : bulletText}
          </li>
        );
      }

      return (
        <p key={lineIdx} className="mb-2 last:mb-0 leading-relaxed text-slate-700 dark:text-slate-300">
          {parts.length > 0 ? parts : content}
        </p>
      );
    });
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to fetch response");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [...prev, { role: "model", content: data.text }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "model", content: `Connection error: ${err.message || "Unknown error"}. Please check that the GEMINI_API_KEY environment variable is configured in the Vercel dashboard.` }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isDismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
      <AnimatePresence initial={false}>
        {!isOpen ? (
          /* Collapsed State: Compact Premium Pill Button matching site CTAs */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 bg-brand-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2.5 shadow-lg shadow-blue-500/20 border border-blue-500/20 hover:scale-105 transition-all cursor-pointer font-bold text-xs uppercase tracking-wider select-none"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white flex-shrink-0 animate-pulse">
                <path
                  d="M12 3c.13 2.87 1.13 3.87 4 4-2.87.13-3.87 1.13-4 4-.13-2.87-1.13-3.87-4-4 2.87-.13 3.87-1.13 4-4zm0 13c.07 1.43.57 1.93 2 2-1.43.07-1.93.57-2 2-.07-1.43-.57-1.93-2-2 1.43-.07 1.93-.57 2-2zm6-4c.03.72.28.97 1 1-.72.03-.97.28-1 1-.03-.72-.28-.97-1-1 .72-.03.97-.28 1-1z"
                  fill="currentColor"
                />
              </svg>
              <span>Ask Gemini</span>
            </button>

            <button
              onClick={() => setIsDismissed(true)}
              className="flex items-center justify-center w-9 h-9 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-full shadow-lg transition-colors cursor-pointer"
              aria-label="Dismiss chatbot"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          /* Expanded State: Chat Window */
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, type: "spring", damping: 25 }}
            className="w-[360px] md:w-[400px] h-[540px] bg-white dark:bg-brand-navy-900 border border-gray-200 dark:border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-[#0B1526] text-white flex items-center justify-between border-b border-white/5 relative">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-24 h-full bg-brand-blue-600/20 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 border border-slate-700">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5">
                    <path
                      d="M12 3c.13 2.87 1.13 3.87 4 4-2.87.13-3.87 1.13-4 4-.13-2.87-1.13-3.87-4-4 2.87-.13 3.87-1.13 4-4zm0 13c.07 1.43.57 1.93 2 2-1.43.07-1.93.57-2 2-.07-1.43-.57-1.93-2-2 1.43-.07 1.93-.57 2-2z"
                      fill="url(#geminiGradHeader)"
                    />
                    <defs>
                      <linearGradient id="geminiGradHeader" x1="4" y1="3" x2="20" y2="21">
                        <stop offset="0%" stopColor="#4f86ff" />
                        <stop offset="50%" stopColor="#9b51e0" />
                        <stop offset="100%" stopColor="#f2994a" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-xs uppercase tracking-widest text-slate-100">Ask Gemini</h3>
                  <p className="text-[9px] font-semibold text-slate-400 mt-0.5 uppercase tracking-wide">StrongerBuilt Assistant</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5 cursor-pointer"
                aria-label="Collapse chatbot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 scrollbar-thin dark:bg-[#070e1b]/40">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex flex-col max-w-[85%] text-xs md:text-sm",
                    m.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-3 rounded-2xl shadow-sm leading-relaxed",
                      m.role === "user"
                        ? "bg-brand-blue-600 text-white rounded-br-none"
                        : "bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-white/5 rounded-bl-none"
                    )}
                  >
                    {m.role === "user" ? <p>{m.content}</p> : formatText(m.content)}
                  </div>
                </div>
              ))}

              {/* Suggestions (only displayed on start / when history is short) */}
              {messages.length === 1 && (
                <div className="pt-2 space-y-2 max-w-[90%]">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Suggested Questions</span>
                  </div>
                  {SUGGESTIONS.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(s)}
                      className="block w-full text-left px-4 py-2.5 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50/50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 text-[11px] font-bold text-slate-600 dark:text-slate-300 transition-all cursor-pointer hover:translate-x-1"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex items-center justify-center mr-auto max-w-[85%]">
                  <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-white/5 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-4 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-brand-navy-900 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our services, pricing..."
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 dark:bg-slate-950 text-xs md:text-sm focus:outline-none focus:border-brand-blue-600 dark:focus:border-brand-blue-500 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex items-center justify-center w-9 h-9 bg-brand-blue-600 hover:bg-blue-700 disabled:bg-slate-100 dark:disabled:bg-white/5 text-white disabled:text-slate-400 rounded-xl transition-all cursor-pointer hover:scale-102 flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
