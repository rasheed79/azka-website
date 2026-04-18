'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
}

interface ChatWidgetProps {
  locale: string;
}

export default function ChatWidget({ locale }: ChatWidgetProps) {
  const t = useTranslations('chatbot');
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showQuick, setShowQuick] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isRtl = locale === 'ar';

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: 'greeting', role: 'bot', text: t('greeting') }]);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const answersRaw = t.raw('answers') as Record<string, string>;

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setShowQuick(false);

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const answer = answersRaw[text] ?? t('fallback');
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'bot', text: answer },
      ]);
    }, 600);
  };

  const quickReplies = t.raw('quick_replies') as string[];

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className={cn(
          'fixed bottom-6 z-50 w-14 h-14 rounded-full bg-green-700 hover:bg-green-600 text-white shadow-2xl shadow-green-600/30 flex items-center justify-center transition-colors duration-200',
          isRtl ? 'left-6' : 'right-6'
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className={cn(
              'fixed bottom-24 z-50 w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden border border-emerald-200/80 shadow-2xl shadow-slate-900/15 dark:border-transparent flex flex-col dark:shadow-black/40',
              isRtl ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
            )}
            style={{ maxHeight: '480px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-800 to-green-700 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">{t('title')}</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-green-300 text-xs">{t('subtitle')}</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-3 dark:bg-slate-900" style={{ maxHeight: '300px' }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex items-start gap-2.5',
                    msg.role === 'user' ? (isRtl ? 'flex-row' : 'flex-row-reverse') : 'flex-row'
                  )}
                >
                  <div className={cn(
                    'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5',
                    msg.role === 'bot' ? 'bg-green-700' : 'bg-slate-200 dark:bg-slate-700'
                  )}>
                    {msg.role === 'bot' ? <Bot size={14} className="text-white" /> : <User size={14} className="text-slate-600 dark:text-slate-300" />}
                  </div>
                  <div
                    className={cn(
                      'px-4 py-2.5 rounded-2xl text-sm max-w-[80%] chat-message',
                      msg.role === 'bot'
                        ? 'bg-white border border-emerald-100 text-slate-800 dark:border-transparent dark:bg-slate-800 dark:text-slate-200 rounded-tl-sm'
                        : 'bg-green-700 text-white rounded-tr-sm'
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <AnimatePresence>
              {showQuick && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-slate-100 border-t border-emerald-100 dark:bg-slate-900 dark:border-slate-800 px-3 py-2"
                >
                  <p className="text-slate-600 dark:text-slate-500 text-xs mb-2 px-1">{t('quick_title')}</p>
                  <div className="flex flex-wrap gap-1.5 overflow-y-auto" style={{ maxHeight: '80px' }}>
                    {quickReplies.map((reply) => (
                      <button
                        key={reply}
                        onClick={() => sendMessage(reply)}
                        className="px-3 py-1.5 rounded-full bg-white hover:bg-green-700 border border-slate-200 hover:border-green-500 text-slate-700 hover:text-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:text-white text-xs transition-all duration-150 whitespace-nowrap"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="bg-slate-100 border-t border-emerald-100 dark:bg-slate-900 dark:border-slate-800 p-3">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('placeholder')}
                  className="flex-1 px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-500 text-sm focus:outline-none focus:border-green-600 dark:bg-slate-800 dark:border-slate-700 dark:text-white transition-colors"
                  dir={isRtl ? 'rtl' : 'ltr'}
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-xl bg-green-700 hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors flex-shrink-0"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
