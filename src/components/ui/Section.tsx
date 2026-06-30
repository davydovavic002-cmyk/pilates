import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { isPortfolioEmbed } from '../../embed/portfolioEmbed';

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
  align = 'center',
  dark = false,
}: SectionProps) {
  const embed = isPortfolioEmbed();
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <section id={id} className={`relative py-20 lg:py-28 px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <motion.header
          initial={embed ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          {...(!embed && {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: '-80px' },
          })}
          transition={{ duration: embed ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`mb-12 lg:mb-16 max-w-2xl ${alignClass} ${align === 'center' ? '' : ''}`}
        >
          {eyebrow && (
            <p className="text-[11px] tracking-[0.32em] uppercase text-laurel/65 mb-3">
              {eyebrow}
            </p>
          )}
          <h2
            className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-tight ${
              dark ? 'text-cream' : 'text-laurel-deep'
            }`}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`mt-4 text-base lg:text-lg leading-relaxed ${
                dark ? 'text-cream/75' : 'text-laurel/70'
              } ${align === 'center' ? 'mx-auto' : ''} max-w-xl`}
            >
              {subtitle}
            </p>
          )}
        </motion.header>
        {children}
      </div>
    </section>
  );
}

export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-7xl mx-auto px-6 lg:px-8 ${className}`}>{children}</div>
  );
}
