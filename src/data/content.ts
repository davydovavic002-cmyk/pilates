import { images } from './images';

export interface StudioClass {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  image: string;
}

export const classesData: StudioClass[] = [
  {
    id: 'gentle-flow',
    title: 'Gentle Flow',
    description: 'Foundational reformer work — alignment, breath, and unhurried movement for newcomers.',
    duration: '55 min',
    level: 'Beginner',
    image: images.classes.gentleFlow,
  },
  {
    id: 'sculpt-stretch',
    title: 'Sculpt & Stretch',
    description: 'Dynamic sessions blending strength with fluid, dance-inspired transitions.',
    duration: '50 min',
    level: 'Intermediate',
    image: images.classes.sculptStretch,
  },
  {
    id: 'power-reformer',
    title: 'Power Reformer',
    description: 'Athletic conditioning — springs, speed, and precision for experienced movers.',
    duration: '45 min',
    level: 'Advanced',
    image: images.classes.powerReformer,
  },
  {
    id: 'mat-release',
    title: 'Mat & Release',
    description: 'Classical mat pilates with a soft, restorative finish to end your week.',
    duration: '60 min',
    level: 'All Levels',
    image: images.classes.matRelease,
  },
];

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export const teamData: TeamMember[] = [
  {
    id: 'ana',
    name: 'Ana Petrović',
    role: 'Head Instructor · STOTT',
    bio: 'Ten years in Belgrade and London. Ana guides women toward strength that feels like grace.',
    image: images.team.ana,
  },
  {
    id: 'mila',
    name: 'Mila Jovanović',
    role: 'Reformer Specialist',
    bio: 'Athletic, rhythmic, deeply intuitive — she reads every body like a conversation.',
    image: images.team.mila,
  },
  {
    id: 'sofia',
    name: 'Sofia Nikolić',
    role: 'Wellness Coach · Pre/Postnatal',
    bio: 'Prenatal, postnatal, recovery — Sofia creates space where renewal is celebrated.',
    image: images.team.sofia,
  },
];

export const valueProps = [
  {
    id: 'women',
    title: 'Women-only sanctuary',
    body: 'A private space on Kralja Milana where you can move freely, without performance or pressure.',
  },
  {
    id: 'small',
    title: 'Groups of six max',
    body: 'Every class stays intimate. Your instructor knows your name, your goals, your body.',
  },
  {
    id: 'equipment',
    title: 'Studio-grade reformers',
    body: 'Balanced Body machines, premium mats, cork blocks — nothing but the best touchpoints.',
  },
];

export const howItWorks = [
  {
    step: '01',
    title: 'Choose your class',
    body: 'Browse our weekly schedule — filter by level, type, or time that fits your rhythm.',
  },
  {
    step: '02',
    title: 'Book & save',
    body: 'Drag classes into My Practice or tap to save. Build your personal weekly plan.',
  },
  {
    step: '03',
    title: 'Arrive & unwind',
    body: 'Step into our sun-drenched studio. We handle the rest — you just stretch and chill.',
  },
];

export const studioFacts = [
  { label: 'Classes weekly', value: '40+' },
  { label: 'Max per class', value: '6' },
  { label: 'Intro offer', value: '3 / €60' },
  { label: 'Location', value: 'Belgrade' },
];

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  tagline: string;
  includes: string[];
  featured?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'drop-in',
    name: 'Drop-in',
    price: '€28',
    tagline: 'Single reformer or mat class',
    includes: ['55-min session', 'Equipment included', 'Herbal tea after class'],
  },
  {
    id: 'pack-5',
    name: '5-Class Pack',
    price: '€125',
    tagline: '€25 per class · valid 60 days',
    includes: ['Any group class', 'Priority waitlist', '10% off grip socks'],
  },
  {
    id: 'pack-10',
    name: '10-Class Pack',
    price: '€230',
    tagline: '€23 per class · valid 90 days',
    includes: ['Any group class', 'Free mat rental', '1 guest pass/month'],
    featured: true,
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    price: '€180',
    period: '/mo',
    tagline: 'As many classes as you need',
    includes: ['All group classes', 'Monthly body check-in', 'Floral lounge access'],
  },
];

export const studioPerks = [
  {
    icon: '01',
    title: 'Only women, by design',
    body: 'Every inch of Stretch and Chill is built for women — from locker rooms to class pacing. No performance, no judgment.',
  },
  {
    icon: '02',
    title: 'Balanced Body reformers',
    body: 'The same equipment used in top London and NYC studios. Springs calibrated weekly, upholstery replaced every season.',
  },
  {
    icon: '03',
    title: 'STOTT-certified instructors',
    body: 'Ana, Mila, and Sofia train continuously — prenatal, postnatal, injury modification, and athletic conditioning.',
  },
  {
    icon: '04',
    title: 'Floral lounge & recovery',
    body: 'Post-class herbal tea, stretching corner, and a quiet lounge with fresh flowers — because cool-down matters.',
  },
  {
    icon: '05',
    title: 'Heart of Belgrade',
    body: 'Two minutes from Trg republike on Kralja Milana. Natural light, oak floors, and views over the city rooftops.',
  },
  {
    icon: '06',
    title: 'Flexible cancellation',
    body: 'Cancel free up to 12 hours before class. Life happens — we get it.',
  },
];

export { images };
