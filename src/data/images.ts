/** Generated assets — local only, no external URLs */
export const images = {
  hero: {
    studio: '/images/hero-studio.png',
    detail: '/images/studio-detail.png',
    /** Enable when public/videos/hero-studio.mp4 exists (see README) */
    video: '/videos/hero-studio.mp4' as string | null,
  },
  classes: {
    gentleFlow: '/images/class-reformer.png',
    sculptStretch: '/images/class-dynamic.png',
    powerReformer: '/images/class-reformer.png',
    matRelease: '/images/class-mat.png',
  },
  team: {
    ana: '/images/team-ana.png',
    mila: '/images/team-mila.png',
    sofia: '/images/team-sofia.png',
  },
} as const;

export const STUDIO = {
  name: 'Stretch and Chill',
  address: 'Kralja Milana 12',
  city: 'Belgrade, Serbia',
  phone: '+381 11 406 7823',
  phoneHref: '+381114067823',
  email: 'hello@stretchandchill.rs',
} as const;
