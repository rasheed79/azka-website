'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, Link } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isRtl = locale === 'ar';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleLocale = () => {
    router.replace(pathname, { locale: locale === 'ar' ? 'en' : 'ar' });
  };

  const navLinks = [
    { href: '#about', label: t('about') },
    { href: '#services', label: t('services') },
    { href: '#stats', label: t('stats') },
    { href: '#contact', label: t('contact') },
  ];

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    // Small delay to allow menu to close before scrolling
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      {/* Header Bar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#0B1A10]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center group flex-shrink-0">
              <Image
              src="/logo-white.png"
                  alt="أزكى لتقنية المعلومات"
                  width={110}
                  height={32}
                  className="h-8 w-auto object-contain group-hover:opacity-85 transition-opacity"
                  priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={toggleLocale}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                <Globe size={15} />
                <span>{t('switchLang')}</span>
              </button>
              <a
                href="#contact"
                className="px-5 py-2 text-sm font-semibold text-white bg-green-700 hover:bg-green-600 rounded-lg transition-all shadow-lg shadow-green-600/20"
              >
                {t('contact')}
              </a>
            </div>

            {/* Mobile Buttons */}
            <div className="flex lg:hidden items-center gap-1">
              <button
                onClick={toggleLocale}
                className="p-2.5 text-slate-300 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                aria-label="Switch language"
              >
                <Globe size={18} />
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2.5 text-slate-300 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu — Full Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: isRtl ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '-100%' : '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={cn(
                'fixed top-0 bottom-0 z-50 w-72 bg-[#0d2414] border-slate-700/50 flex flex-col lg:hidden',
                isRtl ? 'left-0 border-r' : 'right-0 border-l'
              )}
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-white/5">
                <Image
                  src="/logo-white.png"
                  alt="أزكى"
                  width={90}
                  height={26}
                  className="h-7 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="flex items-center gap-3 px-4 py-3.5 text-base text-slate-300 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Bottom Actions */}
              <div className="px-4 pb-8 pt-4 border-t border-white/5 flex flex-col gap-3">
                <button
                  onClick={() => { toggleLocale(); setMobileOpen(false); }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm text-slate-300 hover:text-white rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
                >
                  <Globe size={16} />
                  <span>{t('switchLang')}</span>
                </button>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleLinkClick('#contact'); }}
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-green-700 hover:bg-green-600 rounded-xl transition-all shadow-lg shadow-green-600/20"
                >
                  {t('contact')}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
