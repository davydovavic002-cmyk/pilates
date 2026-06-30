import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { SectionFlorals } from '../ui/FloralDecor';
import { NotebookFlip, type NotebookPage } from '../ui/NotebookFlip';
import { valueProps, howItWorks, images } from '../../data/content';

const studioPages: NotebookPage[] = [
  { id: 'weekly', label: 'Classes weekly', value: '40+', note: 'Reformer, mat & private — mornings to evenings' },
  { id: 'max', label: 'Max per class', value: '6', note: 'Intimate groups, personal attention always' },
  { id: 'intro', label: 'Intro offer', value: '3 / €60', note: 'New members · includes orientation' },
  { id: 'location', label: 'Location', value: 'Belgrade', note: 'Kralja Milana · city centre' },
];

export function WhySection() {
  return (
    <Section
      id="about"
      eyebrow="Why us"
      title="A studio built for how you actually move"
      subtitle="Not a gym. Not a trend. A calm, considered space where pilates feels personal again."
      className="relative bg-cream/50"
    >
      <SectionFlorals variant="default" />

      <div className="relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-5 space-y-6">
          {valueProps.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 lg:p-7"
            >
              <h3 className="font-serif text-xl text-laurel-deep mb-2">{item.title}</h3>
              <p className="text-sm text-laurel/75 leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="relative rounded-3xl overflow-hidden aspect-[16/10] shadow-dreamy">
            <img
              src={images.hero.detail}
              alt="Interior of Stretch and Chill studio"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-laurel-deep/20 to-transparent" />
          </div>

          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-laurel/45 mb-3">
              At a glance — flip through
            </p>
            <NotebookFlip pages={studioPages} />
          </div>
        </div>
      </div>
    </Section>
  );
}

export function HowItWorks() {
  return (
    <Section
      id="how"
      eyebrow="Getting started"
      title="Three steps to your first class"
      align="center"
      className="relative"
    >
      <SectionFlorals variant="dense" />

      <div className="relative z-10 grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
        {howItWorks.map((step, i) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            className="relative glass rounded-2xl p-8 text-center lg:text-left"
          >
            <span className="font-serif text-4xl text-misty-deep/80 block mb-4">{step.step}</span>
            <h3 className="font-serif text-xl text-laurel-deep mb-3">{step.title}</h3>
            <p className="text-sm text-laurel/70 leading-relaxed">{step.body}</p>
            {i < 2 && (
              <span className="hidden md:block absolute top-1/2 -right-4 lg:-right-5 text-misty-deep/60 text-xl">
                →
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
