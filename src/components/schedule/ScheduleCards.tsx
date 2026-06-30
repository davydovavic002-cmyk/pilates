import { motion } from 'framer-motion';
import type { ClassItem } from '../../data/schedule';

interface ScheduleCardProps {
  item: ClassItem;
  index: number;
  isSaved?: boolean;
  onAdd?: () => void;
}

export function ScheduleCard({
  item,
  index,
  isSaved = false,
  onAdd,
}: ScheduleCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.35 }}
      className={`
        group flex items-center gap-4 lg:gap-5 p-4 lg:px-5 lg:py-4 rounded-xl
        bg-cream/70 hover:bg-misty/25 transition-colors duration-300
        ${isSaved ? 'opacity-55' : ''}
      `}
    >
      <div className="shrink-0 w-14 lg:w-16 text-center border-r border-misty/30 pr-4">
        <p className="text-[10px] tracking-[0.15em] uppercase text-laurel/55">{item.day}</p>
        <p className="font-serif text-xl text-laurel-deep">{item.time}</p>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-sans text-sm lg:text-base font-medium text-laurel-deep">{item.name}</p>
        <p className="text-xs text-laurel/55 mt-0.5">{item.level} · {item.type}</p>
      </div>
      <button
        type="button"
        onClick={onAdd}
        disabled={isSaved}
        aria-label={isSaved ? 'Already added' : `Add ${item.name}`}
        className={`
          shrink-0 w-9 h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center
          text-lg font-light transition-all duration-300
          ${isSaved
            ? 'bg-sage/40 text-laurel/50 cursor-default'
            : 'bg-laurel text-cream hover:bg-laurel-deep hover:scale-105 shadow-soft'
          }
        `}
      >
        {isSaved ? '✓' : '+'}
      </button>
    </motion.div>
  );
}

interface StickyNoteProps {
  id: string;
  label: string;
  meta?: string;
  index: number;
  onRemove: () => void;
}

export function StickyNote({ label, meta, index, onRemove }: StickyNoteProps) {
  const tilts = [-2, 1.5, -1, 2, -1.5, 1];
  const tilt = tilts[index % tilts.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85, rotate: tilt }}
      animate={{ opacity: 1, scale: 1, rotate: tilt }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      whileHover={{ scale: 1.03, rotate: 0 }}
      className="relative group"
    >
      <div className="relative bg-plaid-soft px-4 py-3.5 rounded-sm shadow-[3px_3px_0_rgba(90,115,85,0.08),0_8px_24px_rgba(232,196,204,0.22)]">
        <div className="absolute top-1.5 right-3 w-3 h-3 rounded-full bg-cream/55 shadow-inner" aria-hidden />
        <p className="font-sans text-sm text-laurel-deep leading-snug pr-4">{label}</p>
        {meta && <p className="text-[10px] text-laurel/55 mt-1">{meta}</p>}
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-laurel/15 text-laurel-deep text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
        aria-label="Remove note"
      >
        ×
      </button>
    </motion.div>
  );
}

export function formatClassLabel(item: ClassItem) {
  return `${item.day} ${item.time} — ${item.name}`;
}

export function formatClassMeta(item: ClassItem) {
  return `${item.level} · ${item.type}`;
}
