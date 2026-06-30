import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { SectionFlorals } from '../ui/FloralDecor';
import { pricingPlans, studioPerks } from '../../data/content';
import { MagneticButton } from '../ui/MagneticButton';
import { useBooking } from '../../context/BookingContext';

export function PricingSection() {
  const { showBooked } = useBooking();

  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title="Simple, transparent rates"
      subtitle="No hidden fees. All reformer classes include equipment, towels, and post-class herbal tea in our lounge."
      className="relative bg-gradient-to-b from-misty/15 via-transparent to-sage-light/20"
    >
      <SectionFlorals variant="dense" />

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6 mb-14 lg:mb-16">
        {pricingPlans.map((plan, i) => (
          <motion.article
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className={`relative glass rounded-2xl p-6 lg:p-7 flex flex-col ${
              plan.featured ? 'ring-2 ring-laurel/25 shadow-dreamy' : ''
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.15em] uppercase bg-laurel text-cream px-3 py-1 rounded-full">
                Best value
              </span>
            )}
            <h3 className="font-serif text-xl text-laurel-deep mb-1">{plan.name}</h3>
            <p className="font-serif text-3xl lg:text-4xl text-laurel-deep mb-1">
              {plan.price}
              {plan.period && (
                <span className="text-sm text-laurel/50 font-sans ml-1">{plan.period}</span>
              )}
            </p>
            <p className="text-xs text-laurel/60 mb-5">{plan.tagline}</p>
            <ul className="space-y-2 mb-6 flex-1">
              {plan.includes.map((item) => (
                <li key={item} className="text-sm text-laurel/75 flex gap-2">
                  <span className="text-blush shrink-0">✿</span>
                  {item}
                </li>
              ))}
            </ul>
            <MagneticButton
              variant={plan.featured ? 'plaid' : 'ghost'}
              className="w-full !px-4"
              onClick={() =>
                showBooked(
                  "You're booked!",
                  `${plan.name} (${plan.price}${plan.period ?? ''}) — we'll confirm by SMS within the hour.`
                )
              }
            >
              Choose {plan.name}
            </MagneticButton>
          </motion.article>
        ))}
      </div>

      {/* Desktop: perks grid + compact first-visit sidebar */}
      <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px] gap-8 lg:gap-10 items-start">
        <div>
          <h3 className="font-serif text-2xl text-laurel-deep mb-5 lg:mb-6">Why Stretch and Chill</h3>
          <ul className="grid sm:grid-cols-2 gap-3 lg:gap-4">
            {studioPerks.map((perk, i) => (
              <motion.li
                key={perk.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-3 glass rounded-xl p-4"
              >
                <span className="font-serif text-lg text-misty-deep shrink-0 w-6">{perk.icon}</span>
                <div className="min-w-0">
                  <p className="font-medium text-laurel-deep text-sm mb-0.5">{perk.title}</p>
                  <p className="text-xs text-laurel/70 leading-relaxed">{perk.body}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <aside className="embed-sticky-off glass rounded-2xl p-5 lg:p-6 lg:sticky lg:top-28 self-start w-full">
          <h3 className="font-serif text-xl text-laurel-deep mb-2">First visit?</h3>
          <p className="text-xs text-laurel/75 leading-relaxed mb-4">
            New here? Try <strong className="text-laurel-deep">Intro Bloom</strong> — 3 classes for €60,
            valid 30 days. Orientation included.
          </p>
          <div className="flex gap-4 text-xs border-t border-misty/40 pt-3 mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-laurel/50">Private</p>
              <p className="font-serif text-lg text-laurel-deep">€65</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-laurel/50">Duo</p>
              <p className="font-serif text-lg text-laurel-deep">€45</p>
            </div>
          </div>
          <MagneticButton
            to="/schedule"
            variant="plaid"
            className="w-full !px-4 !py-2.5 text-[10px]"
            onClick={() =>
              showBooked(
                'Intro pack reserved!',
                'Intro Bloom (3 classes · €60) — pick your times on the schedule page.'
              )
            }
          >
            Get Intro Offer
          </MagneticButton>
        </aside>
      </div>
    </Section>
  );
}
