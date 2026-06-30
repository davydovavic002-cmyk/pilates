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

/** Bottom marker — only reliable height source in a sized iframe. */
export function getEmbedHeightSentinel(): HTMLElement | null {
  return document.getElementById('embed-height-sentinel');
}

export function measurePortfolioContentHeight(): number {
  const sentinel = getEmbedHeightSentinel();
  if (sentinel) {
    const docTop = document.documentElement.getBoundingClientRect().top;
    return Math.ceil(sentinel.getBoundingClientRect().bottom - docTop);
  }

  const shell = document.querySelector<HTMLElement>('.layout-root');
  if (!shell) return 0;

  let maxBottom = 0;
  const docTop = document.documentElement.getBoundingClientRect().top;
  shell.querySelectorAll<HTMLElement>('header, main, footer, section').forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.height > 0) {
      maxBottom = Math.max(maxBottom, rect.bottom - docTop);
    }
  });

  return Math.ceil(maxBottom || shell.getBoundingClientRect().height);
}

let lastPostedHeight = 0;

export function resetPortfolioHeightCache(): void {
  lastPostedHeight = 0;
}

function lockEmbedDocumentHeight(height: number): void {
  const px = `${height}px`;

  for (const el of [document.documentElement, document.body]) {
    el.style.height = px;
    el.style.minHeight = '0';
    el.style.maxHeight = px;
    el.style.overflow = 'hidden';
  }

  const root = document.getElementById('root');
  if (root) {
    root.style.height = px;
    root.style.minHeight = '0';
    root.style.maxHeight = px;
    root.style.overflow = 'hidden';
  }

  const shell = document.querySelector<HTMLElement>('.layout-root');
  if (shell) {
    shell.style.minHeight = '0';
    shell.style.maxHeight = px;
    shell.style.height = 'auto';
    shell.style.overflow = 'hidden';
  }
}

export function postPortfolioContentHeight(): void {
  if (document.documentElement.getAttribute('data-embed') !== 'portfolio') return;

  const height = Math.max(measurePortfolioContentHeight(), 1);
  if (height === lastPostedHeight) return;

  lastPostedHeight = height;
  lockEmbedDocumentHeight(height);

  window.parent.postMessage({ type: 'portfolio:content-height', height }, '*');
}

export function schedulePortfolioHeightReports(callback: () => void): () => void {
  const timers = [0, 50, 150, 400, 900, 1800, 3000].map((ms) => window.setTimeout(callback, ms));
  return () => timers.forEach(clearTimeout);
}
