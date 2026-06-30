import { Link } from 'react-router-dom';
import { SectionFlorals } from '../ui/FloralDecor';
import { MagneticButton } from '../ui/MagneticButton';
import { STUDIO } from '../../data/images';
import { legalLinks } from '../../data/legal';
import { withEmbedParams } from '../../embed/portfolioEmbed';

interface FooterProps {
  compact?: boolean;
}

export function Footer({ compact = false }: FooterProps) {
  if (compact) {
    return (
      <footer className="layout-footer layout-footer--embed relative border-t border-misty/30 overflow-hidden">
        <div className="layout-footer-inner relative z-10 max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-center sm:text-left">
            <p className="font-serif text-lg text-laurel-deep">{STUDIO.name}</p>
            <address className="not-italic text-sm text-laurel/75 leading-relaxed">
              {STUDIO.address}, {STUDIO.city}
            </address>
            <a
              href={`tel:${STUDIO.phoneHref}`}
              className="text-sm text-laurel/75 hover:text-laurel-deep transition-colors"
            >
              {STUDIO.phone}
            </a>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="layout-footer relative border-t border-misty/30 bg-cream/80 backdrop-blur-sm overflow-hidden">
      <SectionFlorals variant="footer" />

      <div className="layout-footer-inner relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-serif text-2xl lg:text-3xl text-laurel-deep mb-3">{STUDIO.name}</p>
            <p className="text-sm text-laurel/70 leading-relaxed max-w-sm">
              Premium women's pilates on Kralja Milana, Belgrade.
              Reformer · Mat · Private sessions.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[10px] tracking-[0.2em] uppercase text-laurel/50 mb-4">Visit</p>
            <address className="not-italic text-sm text-laurel/75 leading-relaxed">
              {STUDIO.address}<br />
              {STUDIO.city}<br />
              <a
                href={`tel:${STUDIO.phoneHref}`}
                className="hover:text-laurel-deep transition-colors mt-1 inline-block"
              >
                {STUDIO.phone}
              </a>
            </address>
          </div>

          <div className="lg:col-span-4 flex flex-col lg:items-end justify-between gap-6">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-laurel/50 mb-4 lg:text-right">
                Hours
              </p>
              <p className="text-sm text-laurel/75 lg:text-right">
                Mon–Fri 8:00–20:00<br />
                Sat 9:00–16:00
              </p>
            </div>
            <MagneticButton to={withEmbedParams('/schedule')} variant="ghost">
              View Schedule
            </MagneticButton>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-misty/25 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <p className="text-[11px] tracking-[0.12em] text-laurel/45 text-center lg:text-left">
            © {new Date().getFullYear()} {STUDIO.name} · All rights reserved
          </p>
          <nav className="flex flex-wrap justify-center lg:justify-end gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.to}
                to={withEmbedParams(link.to)}
                className="text-[11px] tracking-[0.08em] text-laurel/45 hover:text-laurel-deep transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
