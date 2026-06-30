import { motion } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { SectionFlorals } from '../ui/FloralDecor';
import { HeroMedia } from './HeroMedia';
import { NotebookFlip, type NotebookPage } from '../ui/NotebookFlip';
import { STUDIO } from '../../data/images';
import { useBooking } from '../../context/BookingContext';
import { useNavigate } from 'react-router-dom';

const heroPages: NotebookPage[] = [
  { id: 'address', label: 'Address', value: STUDIO.address, note: 'Two minutes from Trg republike' },
  { id: 'format', label: 'Format', value: 'Women only', note: 'A sanctuary designed for you' },
  { id: 'intro', label: 'Intro', value: '3 classes · €60', note: 'New member offer · 30 days valid' },
  { id: 'phone', label: 'Phone', value: STUDIO.phone, note: 'Call or message us anytime' },
];

export function Hero() {
  const { showBooked } = useBooking();
  const navigate = useNavigate();

  const handleBook = () => {
    showBooked(
      'Almost there!',
      'Pick a class on the schedule — drag it to My Practice to save your spot.'
    );
    navigate('/schedule');
  };

  return (
    <section className="relative overflow-hidden">
      <div className="hero-viewport-media relative w-full h-[42vh] sm:h-[48vh] lg:h-[58vh] -mt-20 lg:-mt-24">
        <HeroMedia />
        <SectionFlorals variant="hero" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-cream to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-16 lg:pb-24 pt-8 lg:pt-12 overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 text-center lg:text-left order-1">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[11px] tracking-[0.32em] uppercase text-laurel/70 mb-4"
            >
              Women's Pilates · {STUDIO.city}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif font-light text-[2.75rem] sm:text-5xl lg:text-6xl xl:text-[4.25rem] leading-[1.08] text-laurel-deep mb-5"
            >
              Stretch
              <span className="italic text-laurel/85"> and </span>
              Chill
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="text-base lg:text-lg text-laurel/75 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Premium reformer pilates in a sun-drenched, women-only studio on Kralja Milana.
              Move with intention. Leave feeling lighter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <MagneticButton variant="plaid" onClick={handleBook}>
                Book a Class
              </MagneticButton>
              <MagneticButton variant="ghost" href="#pricing">
                View Pricing
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="lg:col-span-5 w-full order-2"
          >
            <p className="text-[10px] tracking-[0.2em] uppercase text-laurel/45 mb-3 text-center lg:text-left">
              Studio notes — flip to read
            </p>
            <NotebookFlip pages={heroPages} size="hero" className="max-w-xl mx-auto lg:mx-0 lg:max-w-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
