import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  bindPortfolioImageLoadReports,
  getEmbedHeightSentinel,
  isPortfolioEmbed,
  MOUNT_HEIGHT_DELAYS_MS,
  reportPortfolioContentHeight,
  ROUTE_HEIGHT_DELAYS_MS,
  scheduleHeightReports,
  setupPortfolioLanguageListener,
} from '../../embed/portfolioEmbed';

function createHeightNotifier() {
  let raf = 0;
  return () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => reportPortfolioContentHeight());
  };
}

export function PortfolioEmbedBridge() {
  const location = useLocation();

  useEffect(() => {
    if (!isPortfolioEmbed()) return;
    return setupPortfolioLanguageListener(() => {
      // Reserved for future i18n wiring from portfolio parent.
    });
  }, []);

  useEffect(() => {
    if (!isPortfolioEmbed()) return;

    const notify = createHeightNotifier();
    notify();
    const cancelDelays = scheduleHeightReports(notify, ROUTE_HEIGHT_DELAYS_MS);

    return () => {
      cancelDelays();
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!isPortfolioEmbed()) return;

    const notify = createHeightNotifier();

    notify();
    window.addEventListener('load', notify);
    window.addEventListener('resize', notify);

    const cancelDelays = scheduleHeightReports(notify, MOUNT_HEIGHT_DELAYS_MS);
    const unbindImages = bindPortfolioImageLoadReports(notify);

    const sentinel = getEmbedHeightSentinel();
    const resizeObserver = new ResizeObserver(notify);
    resizeObserver.observe(document.body);
    if (sentinel) resizeObserver.observe(sentinel);

    return () => {
      window.removeEventListener('load', notify);
      window.removeEventListener('resize', notify);
      cancelDelays();
      unbindImages();
      resizeObserver.disconnect();
    };
  }, []);

  return null;
}
