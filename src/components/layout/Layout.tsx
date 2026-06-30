import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PageTransition } from '../ui/MotionWrappers';
import { FloralLayer } from '../ui/FloralDecor';
import { Footer } from './Footer';
import { PortfolioEmbedBridge } from '../embed/PortfolioEmbedBridge';
import { isPortfolioEmbed, withEmbedParams } from '../../embed/portfolioEmbed';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/schedule', label: 'Schedule' },
];

const hashLinks = [
  { href: '/#pricing', label: 'Pricing', hash: '#pricing' },
  { href: '/#classes', label: 'Classes', hash: '#classes' },
  { href: '/#team', label: 'Team', hash: '#team' },
];

const linkClass =
  'relative block w-full px-4 py-3 text-sm tracking-[0.12em] uppercase transition-colors duration-300 rounded-xl';

function EmbedCompactNavLinks() {
  return (
    <div className="embed-nav-links flex items-center gap-0.5 min-w-0 flex-1 justify-end overflow-x-auto scrollbar-thin">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={withEmbedParams(link.to)}
          end={link.end}
          onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
          className={({ isActive }) =>
            `shrink-0 px-2 py-1 text-[9px] sm:text-[10px] tracking-[0.08em] uppercase rounded-full whitespace-nowrap transition-colors ${
              isActive ? 'bg-misty/50 text-laurel-deep' : 'text-laurel/65 hover:text-laurel-deep'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
      {hashLinks.map((link) => (
        <a
          key={link.href}
          href={withEmbedParams(link.href)}
          className="shrink-0 px-2 py-1 text-[9px] sm:text-[10px] tracking-[0.08em] uppercase text-laurel/65 hover:text-laurel-deep rounded-full whitespace-nowrap"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function DesktopNavLinks() {
  return (
    <div className="hidden lg:flex items-center gap-1">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={withEmbedParams(link.to)}
          end={link.end}
          onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
          className={({ isActive }) =>
            `relative px-4 py-2 text-xs tracking-[0.1em] uppercase transition-colors duration-300 rounded-full whitespace-nowrap ${
              isActive ? 'text-laurel-deep' : 'text-laurel/65 hover:text-laurel-deep'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-misty/50 rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {link.label}
            </>
          )}
        </NavLink>
      ))}
      {hashLinks.map((link) => (
        <a
          key={link.href}
          href={withEmbedParams(link.href)}
          className="px-4 py-2 text-xs tracking-[0.1em] uppercase text-laurel/65 hover:text-laurel-deep transition-colors rounded-full whitespace-nowrap"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function MobileNavLinks({ onNavigate }: { onNavigate: () => void }) {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-0.5">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={withEmbedParams(link.to)}
          end={link.end}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
            onNavigate();
          }}
          className={({ isActive }) =>
            `${linkClass} ${isActive ? 'bg-misty/50 text-laurel-deep' : 'text-laurel/70 hover:bg-misty/30 hover:text-laurel-deep'}`
          }
        >
          {link.label}
        </NavLink>
      ))}
      {hashLinks.map((link) => {
        const isActive = location.pathname === '/' && location.hash === link.hash;
        return (
          <a
            key={link.href}
            href={withEmbedParams(link.href)}
            onClick={onNavigate}
            className={`${linkClass} ${
              isActive ? 'bg-misty/50 text-laurel-deep' : 'text-laurel/70 hover:bg-misty/30 hover:text-laurel-deep'
            }`}
          >
            {link.label}
          </a>
        );
      })}
    </div>
  );
}

function EmbedNavigation() {
  return (
    <header className="layout-nav static z-10 px-3 py-2">
      <div className="max-w-7xl mx-auto">
        <nav className="layout-nav-inner flex items-center gap-2 glass rounded-full px-2.5 py-1.5 min-w-0">
          <NavLink to={withEmbedParams('/')} className="group flex items-center gap-1.5 shrink-0 max-w-[42%] min-w-0">
            <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-laurel" />
            <span className="font-serif text-xs font-light tracking-wide text-laurel-deep truncate">
              Stretch & Chill
            </span>
          </NavLink>
          <EmbedCompactNavLinks />
        </nav>
      </div>
    </header>
  );
}

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const embed = isPortfolioEmbed();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (embed) return;
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, embed]);

  if (embed) {
    return <EmbedNavigation />;
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="layout-nav fixed top-0 inset-x-0 z-50 px-4 lg:px-8 py-4 lg:py-5"
    >
      <div className="max-w-7xl mx-auto relative">
        <nav className="flex items-center justify-between gap-3 glass rounded-full px-4 sm:px-5 lg:px-8 py-2.5 lg:py-3 min-w-0">
          <NavLink
            to={withEmbedParams('/')}
            onClick={() => setMenuOpen(false)}
            className="group flex items-center gap-2 min-w-0 shrink"
          >
            <span className="w-2 h-2 shrink-0 rounded-full bg-laurel group-hover:scale-125 transition-transform duration-300" />
            <span className="font-serif text-base sm:text-lg lg:text-xl font-light tracking-wide text-laurel-deep truncate">
              Stretch and Chill
            </span>
          </NavLink>

          <DesktopNavLinks />

          <button
            type="button"
            className="lg:hidden shrink-0 flex flex-col items-center justify-center w-10 h-10 rounded-full text-laurel-deep hover:bg-misty/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-laurel/40"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            <span
              className={`block w-5 h-px bg-current transition-all duration-300 ${
                menuOpen ? 'translate-y-[5px] rotate-45' : '-translate-y-1'
              }`}
            />
            <span
              className={`block w-5 h-px bg-current transition-all duration-300 ${
                menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-5 h-px bg-current transition-all duration-300 ${
                menuOpen ? '-translate-y-[5px] -rotate-45' : 'translate-y-1'
              }`}
            />
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 top-0 bg-laurel-deep/10 lg:hidden"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              />
              <motion.div
                id="mobile-nav"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden absolute top-[calc(100%+0.5rem)] left-0 right-0 glass rounded-2xl p-3 shadow-dreamy border border-misty/30 z-10"
              >
                <MobileNavLinks onNavigate={() => setMenuOpen(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isLegal = location.pathname.startsWith('/legal');
  const embed = isPortfolioEmbed();

  useEffect(() => {
    if (document.documentElement.getAttribute('data-embed') !== 'portfolio') return;

    const params = new URLSearchParams(location.search);
    if (params.get('embed') === 'portfolio') return;

    params.set('embed', 'portfolio');
    const lang = new URLSearchParams(window.location.search).get('lang');
    if (lang) params.set('lang', lang);
    navigate(
      { pathname: location.pathname, hash: location.hash, search: `?${params.toString()}` },
      { replace: true },
    );
  }, [location.pathname, location.hash, location.search, navigate]);

  useEffect(() => {
    if (embed) return;

    if (location.pathname !== '/') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    if (location.hash) {
      requestAnimationFrame(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash, embed]);

  return (
    <div
      className={`layout-root bg-dreamy-gradient relative overflow-x-hidden ${
        embed ? 'h-auto' : 'min-h-screen'
      }`}
    >
      <PortfolioEmbedBridge />
      {!embed && <FloralLayer />}
      <Navigation />
      <main
        className={`layout-main relative z-[2] ${
          embed ? '' : isHome ? 'pt-20 lg:pt-24' : 'pt-20 lg:pt-28'
        }`}
      >
        {embed ? (
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        ) : (
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        )}
      </main>
      {!embed && !isHome && !isLegal && <Footer />}
      {embed && (
        <>
          <Footer compact />
          <div
            id="embed-height-sentinel"
            className="embed-height-sentinel block h-0 w-full overflow-hidden pointer-events-none"
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}
