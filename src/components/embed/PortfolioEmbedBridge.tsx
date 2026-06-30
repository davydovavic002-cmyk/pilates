import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isPortfolioEmbed, postPortfolioContentHeight } from '../../embed/portfolioEmbed';

export function PortfolioEmbedBridge() {
  const location = useLocation();

  useEffect(() => {
    if (!isPortfolioEmbed()) return;
    postPortfolioContentHeight();
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isPortfolioEmbed()) return;

    const notify = () => postPortfolioContentHeight();

    notify();
    window.addEventListener('load', notify);

    const observer = new ResizeObserver(notify);
    observer.observe(document.documentElement);
    observer.observe(document.body);

    return () => {
      window.removeEventListener('load', notify);
      observer.disconnect();
    };
  }, []);

  return null;
}
