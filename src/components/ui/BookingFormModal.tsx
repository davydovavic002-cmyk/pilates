import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Lily, Strawberry } from './FloralDecor';

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  consent: boolean;
}

interface BookingFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: BookingFormData) => void;
  classSummary: string;
  pricingHint?: string;
}

export function BookingFormModal({
  open,
  onClose,
  onSubmit,
  classSummary,
  pricingHint,
}: BookingFormModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (!consent) {
      setError('Please accept the Privacy Policy to continue.');
      return;
    }
    setError('');
    onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim(), consent });
    setName('');
    setEmail('');
    setPhone('');
    setConsent(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-laurel-deep/25 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-form-title"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[301] w-[min(440px,calc(100vw-2rem))]"
          >
            <form
              onSubmit={handleSubmit}
              className="relative glass rounded-2xl p-6 lg:p-8 shadow-dreamy border border-misty/40"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-3 right-4 opacity-35 pointer-events-none">
                <Lily size={26} />
              </div>
              <div className="absolute bottom-2 left-4 opacity-30 pointer-events-none">
                <Strawberry size={20} />
              </div>

              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full glass text-laurel/60 hover:text-laurel-deep text-sm z-10"
                aria-label="Close"
              >
                ×
              </button>

              <h2 id="booking-form-title" className="font-serif text-2xl text-laurel-deep mb-1 pr-8">
                Book your class
              </h2>
              <p className="text-sm text-laurel/65 mb-1 leading-relaxed">{classSummary}</p>
              {pricingHint && (
                <p className="text-xs text-laurel/55 mb-5 italic">{pricingHint}</p>
              )}
              {!pricingHint && <div className="mb-5" />}

              <div className="space-y-4">
                <label className="block">
                  <span className="text-[10px] tracking-[0.18em] uppercase text-laurel/55 mb-1.5 block">
                    Full name
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-cream/80 border border-misty/40 text-sm text-laurel-deep outline-none focus:ring-2 focus:ring-laurel/25"
                    placeholder="Ana Petrović"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] tracking-[0.18em] uppercase text-laurel/55 mb-1.5 block">
                    Email
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-cream/80 border border-misty/40 text-sm text-laurel-deep outline-none focus:ring-2 focus:ring-laurel/25"
                    placeholder="you@email.com"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] tracking-[0.18em] uppercase text-laurel/55 mb-1.5 block">
                    Phone
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-cream/80 border border-misty/40 text-sm text-laurel-deep outline-none focus:ring-2 focus:ring-laurel/25"
                    placeholder="+381 60 123 4567"
                  />
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 accent-laurel"
                  />
                  <span className="text-xs text-laurel/65 leading-relaxed">
                    I agree to the{' '}
                    <Link to="/legal/privacy" className="text-laurel-deep underline underline-offset-2" onClick={onClose}>
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link to="/legal/terms" className="text-laurel-deep underline underline-offset-2" onClick={onClose}>
                      Terms of Service
                    </Link>
                    .
                  </span>
                </label>
              </div>

              {error && <p className="mt-3 text-xs text-red-600/80">{error}</p>}

              <button
                type="submit"
                className="mt-6 w-full px-8 py-3.5 rounded-full bg-plaid-soft text-laurel-deep font-sans text-sm font-medium tracking-[0.15em] uppercase shadow-dreamy hover:opacity-90 transition-opacity"
              >
                Confirm booking
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
