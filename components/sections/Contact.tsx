'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle, Send } from 'lucide-react';

// Replace YOUR_FORM_ID with your actual Formspree form ID from formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const contactItems = [
    { icon: MapPin, label: t('info_address'), href: undefined },
    { icon: Phone, label: t('info_phone'), href: `tel:${t('info_phone').replace(/\s|\(|\)/g, '')}` },
    { icon: Mail, label: t('info_email'), href: `mailto:${t('info_email')}` },
  ];

  return (
    <section id="contact" className="py-16 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-600/10 border border-green-500/20 text-green-400 text-xs font-medium uppercase tracking-wider mb-6">
            {t('badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">{t('title')}</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">{t('subtitle')}</p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <AnimatedSection delay={0.1} className="lg:col-span-2 space-y-6">
            {/* Info Cards */}
            {contactItems.map(({ icon: Icon, label, href }) => (
              <div key={label} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                <div className="w-10 h-10 rounded-xl bg-green-600/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-green-400" />
                </div>
                {href ? (
                  <a href={href} className="text-slate-300 hover:text-white text-sm leading-relaxed transition-colors" dir="ltr">
                    {label}
                  </a>
                ) : (
                  <p className="text-slate-300 text-sm leading-relaxed">{label}</p>
                )}
              </div>
            ))}

            {/* Working Hours */}
            <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Clock size={18} className="text-amber-400" />
                </div>
                <h4 className="text-white font-semibold">{t('hours_title')}</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>{t('hours_weekdays')}</span>
                  <span className="text-slate-300" dir="ltr">{t('hours_weekdays_time')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>{t('hours_saturday')}</span>
                  <span className="text-slate-300" dir="ltr">{t('hours_saturday_time')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>{t('hours_friday')}</span>
                  <span className="text-rose-400">{t('hours_friday_time')}</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={0.2} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="p-5 sm:p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">{t('form_name')}</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-600/50 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">{t('form_email')}</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-600/50 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all text-sm"
                    dir="ltr"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">{t('form_subject')}</label>
                <input
                  type="text"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-600/50 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">{t('form_message')}</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-600/50 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all text-sm resize-none"
                />
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"
                >
                  <CheckCircle2 size={18} />
                  {t('form_success')}
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm"
                >
                  <AlertCircle size={18} />
                  {t('form_error')}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-full flex items-center justify-center gap-2 py-4 text-base font-semibold text-white bg-green-700 hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl transition-all duration-200 shadow-lg shadow-green-600/20 hover:shadow-green-600/30"
              >
                <Send size={18} />
                {status === 'loading' ? t('form_sending') : t('form_submit')}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
