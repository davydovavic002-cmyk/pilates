import { useEffect } from 'react';
import {
  bindPortfolioImageLoadReports,
  isPortfolioEmbed,
  reportPortfolioContentHeight,
  SCHEDULE_HEIGHT_DELAYS_MS,
  scheduleHeightReports,
} from '../../embed/portfolioEmbed';

/**
 * Schedule is shorter than home — parent iframe must receive a lower height
 * after client navigation. Extra reports run only on this route.
 */
export function ScheduleEmbedBridge() {
  useEffect(() => {
    if (!isPortfolioEmbed()) return;

    const notify = () => reportPortfolioContentHeight();

    notify();
    const cancelDelays = scheduleHeightReports(notify, SCHEDULE_HEIGHT_DELAYS_MS);
    const unbindImages = bindPortfolioImageLoadReports(notify);

    const resizeObserver = new ResizeObserver(notify);
    const section = document.querySelector('.schedule-embed-section');
    const notebook = document.querySelector('.schedule-embed-notebook');
    if (section) resizeObserver.observe(section);
    if (notebook) resizeObserver.observe(notebook);

    return () => {
      cancelDelays();
      unbindImages();
      resizeObserver.disconnect();
    };
  }, []);

  return null;
}
