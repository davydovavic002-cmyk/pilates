import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Section } from '../ui/Section';
import { SectionFlorals } from '../ui/FloralDecor';
import { classesData, teamData } from '../../data/content';
import { MagneticButton } from '../ui/MagneticButton';
import { useBooking } from '../../context/BookingContext';

export function ClassesSection() {
  const { showBooked } = useBooking();
  const navigate = useNavigate();

  return (
    <Section
      id="classes"
      eyebrow="Our classes"
      title="Find the rhythm that fits you"
      subtitle="Every format is designed for women at different stages — from first-timer to athlete."
      className="relative"
    >
      <SectionFlorals variant="default" />

      <div className="relative z-10 grid sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
        {classesData.map((cls, i) => (
          <motion.article
            key={cls.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.08, duration: 0.55 }}
            whileHover={{ y: -6 }}
            className="group glass rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] tracking-wide uppercase bg-cream/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-laurel-deep">
                  {cls.level}
                </span>
              </div>
            </div>
            <div className="p-5 lg:p-6 flex flex-col flex-1">
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <h3 className="font-serif text-xl text-laurel-deep">{cls.title}</h3>
                <span className="text-[10px] text-laurel/50 shrink-0">{cls.duration}</span>
              </div>
              <p className="text-sm text-laurel/70 leading-relaxed flex-1 mb-4">{cls.description}</p>
              <MagneticButton
                variant="ghost"
                className="!px-4 !py-2 text-[10px] w-full"
                onClick={() => {
                  showBooked(
                    'Class selected!',
                    `${cls.title} — head to the schedule to pick a time slot.`
                  );
                  navigate('/schedule');
                }}
              >
                Book This Class
              </MagneticButton>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="relative z-10 mt-10 text-center">
        <MagneticButton to="/schedule" variant="primary">
          See Full Schedule
        </MagneticButton>
      </div>
    </Section>
  );
}

export function TeamSection() {
  return (
    <Section
      id="team"
      eyebrow="The team"
      title="Instructors who listen first"
      subtitle="Certified, experienced, and genuinely invested in your practice."
      className="relative bg-gradient-to-b from-transparent via-sage-light/30 to-transparent"
    >
      <SectionFlorals variant="dense" />

      <div className="relative z-10 grid md:grid-cols-3 gap-8 lg:gap-10">
        {teamData.map((member, i) => (
          <motion.article
            key={member.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-dreamy mb-5">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-laurel-deep/50 via-transparent to-misty/10 opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-cream">
                <h3 className="font-serif text-2xl font-light">{member.name}</h3>
                <p className="text-[10px] tracking-[0.2em] uppercase opacity-80 mt-1">{member.role}</p>
              </div>
            </div>
            <p className="text-sm text-laurel/75 leading-relaxed px-1">{member.bio}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
