import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scheduleData, type ClassItem } from '../../data/schedule';
import { BinderSpine } from './BinderSpine';
import {
  ScheduleCard,
  StickyNote,
  formatClassLabel,
  formatClassMeta,
} from './ScheduleCards';
import { Section } from '../ui/Section';
import { SectionFlorals } from '../ui/FloralDecor';
import { MagneticButton } from '../ui/MagneticButton';
import { BookingFormModal, type BookingFormData } from '../ui/BookingFormModal';
import { useBooking } from '../../context/BookingContext';
import { PricingHint } from './PricingHint';
import { suggestPricing } from '../../utils/pricingSuggestion';

interface SavedNote {
  id: string;
  classId: string;
  label: string;
  meta: string;
}

export function NotebookSchedule() {
  const { showBooked } = useBooking();
  const [saved, setSaved] = useState<SavedNote[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [formOpen, setFormOpen] = useState(false);

  const savedIds = new Set(saved.map((s) => s.classId));

  const filtered = scheduleData.filter((item) => {
    if (filter === 'all') return true;
    return item.level.toLowerCase().includes(filter) || item.type.toLowerCase() === filter;
  });

  const addClass = useCallback((item: ClassItem) => {
    setSaved((prev) => {
      if (prev.some((s) => s.classId === item.id)) return prev;
      return [
        ...prev,
        {
          id: `saved-${item.id}`,
          classId: item.id,
          label: formatClassLabel(item),
          meta: formatClassMeta(item),
        },
      ];
    });
  }, []);

  const removeNote = (id: string) => {
    setSaved((prev) => prev.filter((n) => n.id !== id));
  };

  const openBookingForm = () => {
    if (saved.length === 0) return;
    setFormOpen(true);
  };

  const handleFormSubmit = (data: BookingFormData) => {
    const suggestion = suggestPricing(saved.length);
    setFormOpen(false);
    showBooked(
      "You're booked!",
      `Thank you, ${data.name}! ${saved.length} class${saved.length > 1 ? 'es' : ''} confirmed${
        suggestion ? ` · ${suggestion.planName} (${suggestion.totalLabel})` : ''
      }. We'll email ${data.email} shortly.`
    );
  };

  const classSummary =
    saved.length === 0
      ? ''
      : saved.map((n) => n.label).join(' · ');

  const pricingHint = (() => {
    const s = suggestPricing(saved.length);
    return s ? `${s.planName} — ${s.totalLabel}${s.savings ? ` · ${s.savings}` : ''}` : undefined;
  })();

  return (
    <Section
      eyebrow="Your planner"
      title="Weekly schedule"
      subtitle="Tap + to add a class to My Practice, then book when you're ready"
      align="center"
      className="pb-24 lg:pb-32"
    >
      <BookingFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        classSummary={classSummary}
        pricingHint={pricingHint}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-8 xl:gap-10 items-start">
        <div className="relative">
          <SectionFlorals variant="schedule" />
          <div className="bg-dotted-paper floral-border rounded-2xl lg:rounded-3xl shadow-dreamy overflow-hidden">
            <div className="flex flex-col lg:flex-row min-h-[560px] lg:min-h-[640px]">
              <div className="flex-1 p-6 lg:p-10 lg:border-r border-misty/25">
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="font-serif text-2xl text-laurel-deep">This week</h2>
                    <p className="text-xs text-laurel/55 mt-1">{filtered.length} classes available</p>
                  </div>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    aria-label="Filter classes"
                    className="text-[11px] tracking-wide uppercase bg-cream/90 backdrop-blur-sm rounded-full px-4 py-2 text-laurel/70 border-0 outline-none focus:ring-2 focus:ring-laurel/20"
                  >
                    <option value="all">All</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="reformer">Reformer</option>
                    <option value="mat">Mat</option>
                  </select>
                </div>

                <div className="space-y-2 max-h-[480px] lg:max-h-[520px] overflow-y-auto pr-1 scrollbar-thin">
                  {filtered.map((item, index) => (
                    <ScheduleCard
                      key={item.id}
                      item={item}
                      index={index}
                      isSaved={savedIds.has(item.id)}
                      onAdd={() => addClass(item)}
                    />
                  ))}
                </div>
              </div>

              <div className="hidden lg:flex">
                <BinderSpine />
              </div>

              <div className="hidden lg:block flex-1 p-10 bg-sage-light/15">
                <h2 className="font-serif text-2xl text-laurel-deep mb-6">Good to know</h2>
                <ul className="space-y-5 text-sm text-laurel/75 leading-relaxed">
                  {[
                    'Arrive 10 minutes early for your first visit',
                    'Grip socks required — available at reception',
                    'Cancel free up to 12 hours before class',
                    'Intro pack: 3 classes for €60',
                  ].map((note) => (
                    <li key={note} className="flex gap-3">
                      <span className="text-blush shrink-0 mt-0.5">✿</span>
                      {note}
                    </li>
                  ))}
                </ul>
                <p className="mt-12 text-xs text-laurel/45 italic leading-relaxed">
                  Tap + on any class to add it →
                </p>
              </div>
            </div>
          </div>
        </div>

        <motion.aside
          layout
          className="glass rounded-2xl lg:rounded-3xl p-6 lg:p-8 sticky top-28"
        >
          <h2 className="font-serif text-2xl text-laurel-deep">My Practice</h2>
          <p className="text-xs text-laurel/55 mt-1 mb-4">Saved classes</p>

          <PricingHint classCount={saved.length} />

          <div className="min-h-[240px] lg:min-h-[400px] rounded-xl p-4 space-y-3 border border-dashed border-misty/45">
            <AnimatePresence mode="popLayout">
              {saved.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-laurel/45 italic text-center py-12 lg:py-20"
                >
                  Tap + on any class to add it here
                </motion.p>
              ) : (
                saved.map((note, i) => (
                  <StickyNote
                    key={note.id}
                    id={note.id}
                    label={note.label}
                    meta={note.meta}
                    index={i}
                    onRemove={() => removeNote(note.id)}
                  />
                ))
              )}
            </AnimatePresence>
          </div>

          {saved.length > 0 && (
            <div className="mt-6">
              <MagneticButton
                variant="plaid"
                className="w-full !px-4 !py-3 text-[11px]"
                onClick={openBookingForm}
              >
                Book {saved.length} class{saved.length > 1 ? 'es' : ''}
              </MagneticButton>
            </div>
          )}
        </motion.aside>
      </div>
    </Section>
  );
}
