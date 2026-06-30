import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface NotebookPage {
  id: string;
  label: string;
  value: string;
  note?: string;
}

interface NotebookFlipProps {
  pages: NotebookPage[];
  className?: string;
  size?: 'default' | 'compact' | 'hero';
}

const btnBase =
  'flex items-center justify-center font-sans font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-laurel/40';

const sizeConfig = {
  compact: {
    binder: 'w-11 py-5',
    pageMinH: 'min-h-[128px]',
    pagePad: 'px-5 py-4',
    value: 'text-xl sm:text-2xl',
    rounded: 'rounded-r-xl',
  },
  hero: {
    binder: 'w-12 py-6',
    pageMinH: 'min-h-[152px] sm:min-h-[168px]',
    pagePad: 'px-6 py-5',
    value: 'text-2xl sm:text-[1.65rem]',
    rounded: 'rounded-r-2xl',
  },
  default: {
    binder: 'w-12 py-6',
    pageMinH: 'min-h-[160px]',
    pagePad: 'px-6 py-5 lg:px-8 lg:py-6',
    value: 'text-2xl lg:text-3xl',
    rounded: 'rounded-r-2xl',
  },
};

export function NotebookFlip({ pages, className = '', size = 'default' }: NotebookFlipProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (next: number) => {
    if (next < 0 || next >= pages.length) return;
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };

  const page = pages[index];
  const cfg = sizeConfig[size];
  const canPrev = index > 0;
  const canNext = index < pages.length - 1;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-stretch w-full">
        {/* Binder dots */}
        <div
          className={`shrink-0 flex flex-col items-center justify-center bg-sage-light/25 rounded-l-xl border border-r-0 border-misty/40 ${cfg.binder}`}
        >
          <div className="flex flex-col gap-2.5">
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to page ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                className={`
                  rounded-full transition-all duration-300
                  ${i === index
                    ? 'w-3.5 h-3.5 bg-laurel ring-2 ring-laurel/30 ring-offset-2 ring-offset-cream scale-110'
                    : 'w-2.5 h-2.5 bg-laurel/30 hover:bg-laurel/60 hover:scale-125'
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* Page — flex column, no overlapping absolutes */}
        <div
          className={`relative flex-1 min-w-0 flex flex-col bg-dotted-paper floral-border overflow-hidden ${cfg.rounded} ${cfg.pageMinH}`}
        >
          {/* Header row */}
          <div className="flex items-center justify-between px-4 pt-3 pb-0 shrink-0">
            <span className="text-[10px] tracking-[0.22em] uppercase text-laurel/50 font-sans">
              {page.label}
            </span>
            <span className="text-[10px] tracking-widest text-laurel/45 uppercase font-medium">
              {index + 1} / {pages.length}
            </span>
          </div>

          {/* Animated content — clipped */}
          <div className="relative flex-1 overflow-hidden mx-1">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`${cfg.pagePad} pt-2 pb-1 flex flex-col justify-center h-full`}
              >
                <p className={`font-serif text-laurel-deep leading-tight ${cfg.value}`}>
                  {page.value}
                </p>
                {page.note && (
                  <p className="text-xs sm:text-sm text-laurel/55 mt-2 italic leading-relaxed">
                    {page.note}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev / Next — own row, never overlaps text */}
          <div className="flex justify-end gap-1.5 px-3 pb-3 pt-2 shrink-0 border-t border-misty/20">
            <button
              type="button"
              onClick={() => go(index - 1)}
              disabled={!canPrev}
              aria-label="Previous page"
              className={`
                ${btnBase} rounded-full px-4 py-2 text-[10px] tracking-[0.1em] uppercase
                ${canPrev
                  ? 'bg-misty/70 text-laurel-deep border border-misty hover:bg-misty shadow-soft'
                  : 'bg-misty/25 text-laurel/30 cursor-not-allowed'
                }
              `}
            >
              ‹ Prev
            </button>
            <motion.button
              type="button"
              onClick={() => go(index + 1)}
              disabled={!canNext}
              whileHover={canNext ? { scale: 1.04 } : {}}
              whileTap={canNext ? { scale: 0.96 } : {}}
              aria-label="Next page"
              className={`
                ${btnBase} rounded-full px-4 py-2 text-[10px] tracking-[0.1em] uppercase
                ${canNext
                  ? 'bg-plaid-soft text-laurel-deep border border-misty/50 shadow-soft hover:shadow-dreamy'
                  : 'bg-misty/25 text-laurel/30 cursor-not-allowed'
                }
              `}
            >
              Next ›
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function useNotebookPages(pages: NotebookPage[]) {
  const [index, setIndex] = useState(0);
  const next = useCallback(() => setIndex((i) => Math.min(i + 1, pages.length - 1)), [pages.length]);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);
  return { index, setIndex, next, prev, page: pages[index] };
}
