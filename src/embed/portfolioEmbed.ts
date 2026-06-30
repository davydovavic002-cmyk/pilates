export function isPortfolioEmbed(search = window.location.search): boolean {
  return new URLSearchParams(search).get('embed') === 'portfolio';
}

export function applyPortfolioEmbedAttribute(): void {
  if (isPortfolioEmbed()) {
    document.documentElement.setAttribute('data-embed', 'portfolio');
  }
}

export function postPortfolioContentHeight(): void {
  if (document.documentElement.getAttribute('data-embed') !== 'portfolio') return;

  const root = document.getElementById('root');
  const height = Math.ceil(
    Math.max(
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight,
      document.body.scrollHeight,
      document.body.offsetHeight,
      root?.scrollHeight ?? 0,
      root?.offsetHeight ?? 0,
    ),
  );

  window.parent.postMessage({ type: 'portfolio:content-height', height }, '*');
}

export function schedulePortfolioHeightReports(callback: () => void): () => void {
  const timers = [0, 50, 150, 400, 900, 1800].map((ms) => window.setTimeout(callback, ms));
  return () => timers.forEach(clearTimeout);
}
