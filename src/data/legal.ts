export interface LegalDocument {
  slug: string;
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}

export const legalDocuments: Record<string, LegalDocument> = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    updated: '30 June 2026',
    sections: [
      {
        heading: '1. Who we are',
        body: 'Stretch and Chill ("we", "us") operates a women-only pilates studio at Kralja Milana 12, Belgrade, Serbia. We are the data controller for personal information collected through our website and studio services.',
      },
      {
        heading: '2. What we collect',
        body: 'When you book a class, we collect your name, email address, and phone number. We may also collect attendance history, payment records, and communications you send us. Our website uses essential cookies only — no third-party advertising trackers.',
      },
      {
        heading: '3. How we use your data',
        body: 'We use your information to confirm bookings, send class reminders, process payments, respond to enquiries, and improve our services. We do not sell your personal data to third parties.',
      },
      {
        heading: '4. Legal basis (GDPR)',
        body: 'Processing is based on: (a) your consent when booking online; (b) contract performance for class delivery; (c) legitimate interest in studio safety and service improvement; (d) legal obligations for accounting and tax.',
      },
      {
        heading: '5. Retention',
        body: 'Booking records are kept for 3 years after your last visit. Payment records are retained as required by Serbian tax law (minimum 5 years). You may request deletion earlier where no legal obligation applies.',
      },
      {
        heading: '6. Your rights',
        body: 'You have the right to access, correct, delete, or restrict processing of your data, and to withdraw consent at any time. Contact us at hello@stretchandchill.rs. You may lodge a complaint with the Commissioner for Information of Public Importance and Personal Data Protection of Serbia.',
      },
      {
        heading: '7. Contact',
        body: 'Stretch and Chill · Kralja Milana 12, Belgrade · hello@stretchandchill.rs · +381 11 406 7823',
      },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Terms of Service',
    updated: '30 June 2026',
    sections: [
      {
        heading: '1. Agreement',
        body: 'By booking a class at Stretch and Chill, you agree to these Terms of Service and our studio policies. Our services are offered to women aged 16 and over unless otherwise agreed in writing.',
      },
      {
        heading: '2. Bookings & payment',
        body: 'Bookings are confirmed upon receipt of your details and payment (where applicable). Class packs and memberships are non-transferable unless we agree otherwise. Prices listed on our website are in EUR and include VAT where applicable.',
      },
      {
        heading: '3. Health & safety',
        body: 'You confirm that you are physically able to participate in pilates. Please inform your instructor of any injury, pregnancy, or medical condition before class. We reserve the right to refuse participation if we believe a session may pose a risk to you or others.',
      },
      {
        heading: '4. Studio rules',
        body: 'Grip socks are required on reformers. Arrive at least 10 minutes early for your first visit. Mobile phones should be silenced. Our space is women-only — please respect the privacy and comfort of all members.',
      },
      {
        heading: '5. Liability',
        body: 'Participation in physical activity involves inherent risk. To the fullest extent permitted by Serbian law, Stretch and Chill is not liable for injury resulting from failure to disclose relevant health information or non-compliance with instructor guidance.',
      },
      {
        heading: '6. Governing law',
        body: 'These terms are governed by the laws of the Republic of Serbia. Disputes shall be subject to the jurisdiction of courts in Belgrade.',
      },
    ],
  },
  cancellation: {
    slug: 'cancellation',
    title: 'Cancellation & Refund Policy',
    updated: '30 June 2026',
    sections: [
      {
        heading: '1. Class cancellation',
        body: 'You may cancel a booked class free of charge up to 12 hours before the scheduled start time via phone, email, or by removing it from My Practice before confirming. Late cancellations or no-shows may be charged the full class rate.',
      },
      {
        heading: '2. Class packs',
        body: '5-class packs are valid for 60 days; 10-class packs for 90 days; Intro Bloom (3 classes) for 30 days from purchase. Unused classes expire after the validity period and are non-refundable except as required by law.',
      },
      {
        heading: '3. Refunds',
        body: 'Drop-in classes: refund available if cancelled 12+ hours in advance. Pack purchases: partial refunds may be issued at our discretion for unused classes minus a €15 administration fee. Unlimited memberships: cancel with 14 days notice before the next billing cycle.',
      },
      {
        heading: '4. Studio cancellations',
        body: 'If we cancel a class due to instructor illness or unforeseen circumstances, you will receive a full credit or refund. We will notify you as soon as possible via phone or email.',
      },
      {
        heading: '5. Contact',
        body: 'For cancellation requests: hello@stretchandchill.rs or +381 11 406 7823. Mon–Fri 8:00–20:00, Sat 9:00–16:00.',
      },
    ],
  },
  cookies: {
    slug: 'cookies',
    title: 'Cookie Policy',
    updated: '30 June 2026',
    sections: [
      {
        heading: '1. What are cookies',
        body: 'Cookies are small text files stored on your device when you visit a website. They help the site function correctly and remember basic preferences.',
      },
      {
        heading: '2. Cookies we use',
        body: 'Stretch and Chill uses only essential cookies required for the website to operate (e.g. session state). We do not use advertising, analytics, or social media tracking cookies at this time.',
      },
      {
        heading: '3. Managing cookies',
        body: 'You can disable cookies in your browser settings. Note that some site features may not work correctly without essential cookies.',
      },
      {
        heading: '4. Updates',
        body: 'We may update this policy if we introduce new tools. The latest version will always be published on this page with the date above.',
      },
    ],
  },
};

export const legalLinks = [
  { to: '/legal/privacy', label: 'Privacy Policy' },
  { to: '/legal/terms', label: 'Terms of Service' },
  { to: '/legal/cancellation', label: 'Cancellation Policy' },
  { to: '/legal/cookies', label: 'Cookie Policy' },
] as const;
