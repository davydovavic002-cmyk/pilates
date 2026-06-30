import { motion, AnimatePresence } from 'framer-motion';
import { suggestPricing } from '../../utils/pricingSuggestion';

interface PricingHintProps {
  classCount: number;
}

export function PricingHint({ classCount }: PricingHintProps) {
  const suggestion = suggestPricing(classCount);

  return (
    <AnimatePresence mode="wait">
      {suggestion ? (
        <motion.div
          key={suggestion.planId + classCount}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <div className="mt-5 p-4 rounded-xl bg-sage-light/25 border border-sage/30">
            <p className="text-[10px] tracking-[0.18em] uppercase text-laurel/55 mb-2">
              Suggested for {classCount} class{classCount > 1 ? 'es' : ''}
            </p>
            <div className="flex items-baseline justify-between gap-2 mb-1">
              <p className="font-serif text-lg text-laurel-deep">{suggestion.planName}</p>
              <p className="font-serif text-xl text-laurel-deep">{suggestion.totalLabel}</p>
            </div>
            {suggestion.perClass && (
              <p className="text-xs text-laurel/60">{suggestion.perClass}</p>
            )}
            {suggestion.savings && (
              <p className="text-xs text-laurel font-medium mt-1">{suggestion.savings}</p>
            )}
            <p className="text-xs text-laurel/65 mt-2 leading-relaxed italic">{suggestion.hint}</p>
            <p className="text-[10px] text-laurel/40 mt-2">
              vs €{suggestion.compareDropIn} drop-in total
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.p
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-5 text-xs text-laurel/45 italic leading-relaxed"
        >
          Save classes to see which pack fits your rhythm.
        </motion.p>
      )}
    </AnimatePresence>
  );
}
