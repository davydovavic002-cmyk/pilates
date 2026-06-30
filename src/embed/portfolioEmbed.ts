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

  window.parent.postMessage(
    {
      type: 'portfolio:content-height',
      height: document.documentElement.scrollHeight,
    },
    '*',
  );
}
