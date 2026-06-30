import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Lily, Strawberry } from '../components/ui/FloralDecor';

interface Toast {
  id: number;
  title: string;
  message: string;
}

interface BookingContextValue {
  showBooked: (title?: string, message?: string) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}

function BookingToast({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] w-[min(420px,calc(100vw-2rem))]"
      role="status"
      aria-live="polite"
    >
      <div className="relative glass rounded-2xl px-6 py-5 shadow-dreamy border border-misty/40 overflow-hidden">
        <div className="absolute top-2 right-3 opacity-40 pointer-events-none">
          <Lily size={28} />
        </div>
        <div className="absolute bottom-1 left-4 opacity-35 pointer-events-none">
          <Strawberry size={22} />
        </div>
        <p className="font-serif text-xl text-laurel-deep mb-1">{toast.title}</p>
        <p className="text-sm text-laurel/70 leading-relaxed pr-6">{toast.message}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 text-[10px] tracking-[0.18em] uppercase text-laurel/55 hover:text-laurel-deep transition-colors"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);

  const showBooked = useCallback((title = "You're booked!", message = "We've saved your spot. See you at the studio — grip socks ready.") => {
    const id = Date.now();
    setToast({ id, title, message });
    window.setTimeout(() => setToast((t) => (t?.id === id ? null : t)), 6000);
  }, []);

  return (
    <BookingContext.Provider value={{ showBooked }}>
      {children}
      <AnimatePresence>
        {toast && (
          <BookingToast key={toast.id} toast={toast} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>
    </BookingContext.Provider>
  );
}
