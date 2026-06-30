export const PORTFOLIO_HEIGHT_MESSAGE = 'portfolio:content-height' as const;
export const PORTFOLIO_LANG_MESSAGE = 'portfolio:set-language' as const;

export const MOUNT_HEIGHT_DELAYS_MS = [0, 50, 150, 400, 900, 1800, 2800] as const;
export const ROUTE_HEIGHT_DELAYS_MS = [0, 100, 300, 600, 1200, 2000] as const;
export const SCHEDULE_HEIGHT_DELAYS_MS = [0, 150, 400, 800, 1500, 2500, 3500] as const;

export function isPortfolioEmbed(search?: string): boolean {
  if (typeof window === 'undefined') return false;

  const params = new URLSearchParams(search ?? window.location.search);
  if (params.get('embed') === 'portfolio') return true;

  return document.documentElement.getAttribute('data-embed') === 'portfolio';
}

export function applyPortfolioEmbedAttribute(): void {
  if (isPortfolioEmbed()) {
    document.documentElement.setAttribute('data-embed', 'portfolio');
  }
}

export function preserveEmbedParams(url: string): string {
  if (!isPortfolioEmbed()) return url;

  try {
    const target = new URL(url, window.location.href);
    if (target.origin !== window.location.origin) return url;

    target.searchParams.set('embed', 'portfolio');
    const lang = new URLSearchParams(window.location.search).get('lang');
    if (lang) target.searchParams.set('lang', lang);

    return target.pathname + target.search + target.hash;
  } catch {
    return url;
  }
}

/** @deprecated use preserveEmbedParams */
export const withEmbedParams = preserveEmbedParams;

export function getEmbedHeightSentinel(): HTMLElement | null {
  return document.getElementById('embed-height-sentinel');
}

function measureElementBottom(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  return Math.ceil(rect.bottom + window.scrollY);
}

export function measureContentHeight(): number {
  const heights: number[] = [];

  const sentinel = getEmbedHeightSentinel();
  if (sentinel) heights.push(measureElementBottom(sentinel));

  const footer = document.querySelector<HTMLElement>('.layout-footer');
  if (footer) heights.push(measureElementBottom(footer));

  heights.push(Math.ceil(document.documentElement.scrollHeight));

  return Math.max(...heights, 1);
}

export function reportPortfolioContentHeight(): void {
  if (document.documentElement.getAttribute('data-embed') !== 'portfolio') return;

  const height = measureContentHeight();

  window.parent.postMessage({ type: PORTFOLIO_HEIGHT_MESSAGE, height }, '*');
}

/** @deprecated use reportPortfolioContentHeight */
export const postPortfolioContentHeight = reportPortfolioContentHeight;

export function measurePortfolioContentHeight(): number {
  return measureContentHeight();
}

export function scheduleHeightReports(
  callback: () => void,
  delays: readonly number[] = MOUNT_HEIGHT_DELAYS_MS,
): () => void {
  const timers = delays.map((ms) => window.setTimeout(callback, ms));
  return () => timers.forEach(clearTimeout);
}

/** @deprecated use scheduleHeightReports */
export const schedulePortfolioHeightReports = scheduleHeightReports;

export function bindPortfolioImageLoadReports(callback: () => void): () => void {
  const onLoad = () => callback();

  const bindImages = () => {
    document.querySelectorAll('img').forEach((img) => {
      if (img.complete) return;
      img.addEventListener('load', onLoad, { once: true });
      img.addEventListener('error', onLoad, { once: true });
    });
  };

  bindImages();

  const observer = new MutationObserver(bindImages);
  observer.observe(document.body, { childList: true, subtree: true });

  return () => observer.disconnect();
}

export function setupPortfolioLanguageListener(
  onLanguage: (language: string) => void,
): () => void {
  const handler = (event: MessageEvent) => {
    if (event.data?.type !== PORTFOLIO_LANG_MESSAGE) return;
    const language = event.data.language;
    if (typeof language === 'string' && language.length > 0) {
      onLanguage(language);
    }
  };

  window.addEventListener('message', handler);
  return () => window.removeEventListener('message', handler);
}
