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

export function withEmbedParams(path: string): string {
  if (!isPortfolioEmbed()) return path;

  const hashIndex = path.indexOf('#');
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : '';
  const pathAndQuery = hashIndex >= 0 ? path.slice(0, hashIndex) : path;

  const queryIndex = pathAndQuery.indexOf('?');
  const pathname = queryIndex >= 0 ? pathAndQuery.slice(0, queryIndex) : pathAndQuery;
  const params = new URLSearchParams(queryIndex >= 0 ? pathAndQuery.slice(queryIndex + 1) : '');
  params.set('embed', 'portfolio');

  const qs = params.toString();
  return `${pathname}?${qs}${hash}`;
}

export function getEmbedHeightSentinel(): HTMLElement | null {
  return document.getElementById('embed-height-sentinel');
}

export function measurePortfolioContentHeight(): number {
  const sentinel = getEmbedHeightSentinel();
  if (sentinel) {
    const docTop = document.documentElement.getBoundingClientRect().top;
    return Math.ceil(sentinel.getBoundingClientRect().bottom - docTop);
  }

  const footer = document.querySelector<HTMLElement>('.layout-footer');
  if (footer) {
    const docTop = document.documentElement.getBoundingClientRect().top;
    return Math.ceil(footer.getBoundingClientRect().bottom - docTop);
  }

  return Math.ceil(document.documentElement.scrollHeight);
}

export function postPortfolioContentHeight(): void {
  if (document.documentElement.getAttribute('data-embed') !== 'portfolio') return;

  const height = Math.max(measurePortfolioContentHeight(), 1);

  window.parent.postMessage({ type: 'portfolio:content-height', height }, '*');
}

export function schedulePortfolioHeightReports(callback: () => void): () => void {
  const timers = [0, 50, 150, 400, 900, 1800, 3000].map((ms) => window.setTimeout(callback, ms));
  return () => timers.forEach(clearTimeout);
}
