import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';
import { UNSPLASH_LICENSE_URL } from '@/lib/systems';

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function TwitterXIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const tContact = useTranslations('contact');
  const tNav = useTranslations('nav');

  const navLinks = [
    { href: '#about', label: tNav('about') },
    { href: '#services', label: tNav('services') },
    { href: '#stats', label: tNav('stats') },
    { href: '#contact', label: tNav('contact') },
  ];

  const systemLinks = [
    { href: `/${locale}/systems/hr`, label: locale === 'ar' ? 'الموارد البشرية' : 'Human Resources' },
    { href: `/${locale}/systems/attendance`, label: locale === 'ar' ? 'الحضور والانصراف' : 'Attendance' },
    { href: `/${locale}/systems/financial`, label: locale === 'ar' ? 'النظام المالي' : 'Financial System' },
    { href: `/${locale}/systems/archiving`, label: locale === 'ar' ? 'الأرشفة الإلكترونية' : 'E-Archiving' },
    { href: `/${locale}/systems/mobile`, label: locale === 'ar' ? 'تطبيقات الجوال' : 'Mobile Apps' },
    { href: `/${locale}/systems/integration`, label: locale === 'ar' ? 'الربط والتكامل' : 'Integration' },
  ];

  return (
    <footer className="bg-emerald-100/80 border-t border-emerald-200/90 dark:bg-[#060F08] dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Image
                src="/logo-white.png"
                alt="أزكى لتقنية المعلومات"
                width={150}
                height={44}
                className="h-11 w-auto object-contain brightness-0 dark:brightness-100"
              />
            </div>
            <p className="text-green-400 text-sm font-medium mb-3">{t('tagline')}</p>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">{t('description')}</p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
                { icon: TwitterXIcon, href: '#', label: 'Twitter/X' },
                { icon: InstagramIcon, href: '#', label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white hover:bg-green-700 border border-emerald-200 hover:border-green-500 dark:bg-slate-800 dark:border-slate-700 flex items-center justify-center text-slate-600 hover:text-white dark:text-slate-400 dark:hover:text-white transition-all duration-200 hover:scale-105"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              {t('links_title')}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-green-700 dark:text-slate-400 dark:hover:text-green-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              {t('services_title')}
            </h3>
            <ul className="space-y-3">
              {systemLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-green-700 dark:text-slate-400 dark:hover:text-green-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              {t('contact_title')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{tContact('info_address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-green-400 flex-shrink-0" />
                <a href="tel:+96612600223" className="text-slate-600 hover:text-green-900 dark:text-slate-400 dark:hover:text-white text-sm transition-colors" dir="ltr">
                  {tContact('info_phone')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-green-400 flex-shrink-0" />
                <a href="mailto:connect@azka.com" className="text-slate-600 hover:text-green-900 dark:text-slate-400 dark:hover:text-white text-sm transition-colors">
                  {tContact('info_email')}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  <div>{tContact('hours_weekdays')}: {tContact('hours_weekdays_time')}</div>
                  <div>{tContact('hours_saturday')}: {tContact('hours_saturday_time')}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-emerald-200/90 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 dark:text-slate-500 text-sm text-center">
            © {new Date().getFullYear()} {t('rights')}
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-600 dark:text-slate-500 text-xs">
              {locale === 'ar' ? 'الموقع يعمل بشكل طبيعي' : 'All systems operational'}
            </span>
          </div>
        </div>

        <p className="mt-8 text-center text-[11px] text-slate-500 dark:text-slate-500 leading-relaxed max-w-3xl mx-auto px-4">
          {t('photo_credit')}{' '}
          <a
            href={UNSPLASH_LICENSE_URL}
            className="text-green-700 underline decoration-green-600/40 underline-offset-2 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('photo_credit_license')}
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
