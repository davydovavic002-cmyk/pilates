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

export function measurePortfolioContentHeight(): number {
  const shell =
    document.querySelector<HTMLElement>('.layout-root') ??
    document.getElementById('root');

  if (!shell) return 0;

  // Content height only — never offsetHeight on html/body (iframe viewport inflates it).
  let height = shell.scrollHeight;

  const last = shell.lastElementChild;
  if (last instanceof HTMLElement) {
    const bottom = last.getBoundingClientRect().bottom + window.scrollY;
    height = Math.max(height, bottom);
  }

  return Math.ceil(height);
}

export function postPortfolioContentHeight(): void {
  if (document.documentElement.getAttribute('data-embed') !== 'portfolio') return;

  const height = measurePortfolioContentHeight();

  window.parent.postMessage({ type: 'portfolio:content-height', height }, '*');
}

export function schedulePortfolioHeightReports(callback: () => void): () => void {
  const timers = [0, 50, 150, 400, 900, 1800, 3000].map((ms) => window.setTimeout(callback, ms));
  return () => timers.forEach(clearTimeout);
}
