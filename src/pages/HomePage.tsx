import { Hero } from '../components/home/Hero';
import { WhySection, HowItWorks } from '../components/home/WhySection';
import { ClassesSection, TeamSection } from '../components/home/ClassesTeam';
import { PricingSection } from '../components/home/PricingSection';
import { Section } from '../components/ui/Section';
import { SectionFlorals } from '../components/ui/FloralDecor';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Footer } from '../components/layout/Footer';
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import { isPortfolioEmbed } from '../embed/portfolioEmbed';

export function HomePage() {
  const { showBooked } = useBooking();
  const navigate = useNavigate();

  return (
    <>
      <Hero />
      <WhySection />
      <PricingSection />
      <ClassesSection />
      <HowItWorks />
      <TeamSection />

      <Section
        eyebrow="Ready?"
        title="Your mat is waiting"
        subtitle="Intro offer: three classes for €60. No commitment beyond showing up."
        className="relative pb-28 embed-section-last"
      >
        <SectionFlorals variant="dense" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton
            variant="plaid"
            onClick={() => {
              showBooked("You're on the list!", 'Intro Bloom reserved — choose your three classes on the schedule.');
              navigate('/schedule');
            }}
          >
            Book Your First Class
          </MagneticButton>
          <MagneticButton variant="ghost" href="#pricing">
            See All Prices
          </MagneticButton>
        </div>
      </Section>

      {!isPortfolioEmbed() && <Footer />}
    </>
  );
}
