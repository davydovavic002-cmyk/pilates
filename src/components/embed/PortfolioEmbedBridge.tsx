import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getEmbedHeightSentinel,
  isPortfolioEmbed,
  postPortfolioContentHeight,
  resetPortfolioHeightCache,
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

    resetPortfolioHeightCache();
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
    let debounce = 0;
    const notify = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        window.clearTimeout(debounce);
        debounce = window.setTimeout(() => postPortfolioContentHeight(), 32);
      });
    };

    notify();
    window.addEventListener('load', notify);
    window.addEventListener('resize', notify);
    const cancelDelays = schedulePortfolioHeightReports(notify);

    const sentinel = getEmbedHeightSentinel();
    const main = document.querySelector('main.layout-main');
    const resizeObserver = new ResizeObserver(notify);
    if (main) resizeObserver.observe(main);
    if (sentinel) resizeObserver.observe(sentinel);

    const mutationObserver = new MutationObserver(notify);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(debounce);
      window.removeEventListener('load', notify);
      window.removeEventListener('resize', notify);
      cancelDelays();
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
