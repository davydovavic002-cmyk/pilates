import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  isPortfolioEmbed,
  postPortfolioContentHeight,
  schedulePortfolioHeightReports,
} from '../../embed/portfolioEmbed';

export function PortfolioEmbedBridge() {
  const location = useLocation();

  useEffect(() => {
    if (!isPortfolioEmbed()) return;

    let raf = 0;
    const notify = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => postPortfolioContentHeight());
    };

    notify();
    const cancelDelays = schedulePortfolioHeightReports(notify);

    return () => {
      cancelAnimationFrame(raf);
      cancelDelays();
    };
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isPortfolioEmbed()) return;

    let raf = 0;
    const notify = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => postPortfolioContentHeight());
    };

    notify();
    window.addEventListener('load', notify);
    const cancelDelays = schedulePortfolioHeightReports(notify);

    const root = document.getElementById('root');
    const observed = [document.documentElement, document.body, root].filter(Boolean) as Element[];

    const resizeObserver = new ResizeObserver(notify);
    observed.forEach((node) => resizeObserver.observe(node));

    const mutationObserver = new MutationObserver(notify);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', notify);
      cancelDelays();
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
