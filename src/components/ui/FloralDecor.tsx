import { motion } from 'framer-motion';

function Lily({ className = '', size = 48 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <ellipse cx="32" cy="18" rx="8" ry="14" fill="#E8C4CC" opacity="0.85" transform="rotate(0 32 32)" />
      <ellipse cx="32" cy="18" rx="8" ry="14" fill="#F5D0D6" opacity="0.7" transform="rotate(72 32 32)" />
      <ellipse cx="32" cy="18" rx="8" ry="14" fill="#E8C4CC" opacity="0.75" transform="rotate(144 32 32)" />
      <ellipse cx="32" cy="18" rx="8" ry="14" fill="#F5D0D6" opacity="0.65" transform="rotate(216 32 32)" />
      <ellipse cx="32" cy="18" rx="8" ry="14" fill="#E8C4CC" opacity="0.8" transform="rotate(288 32 32)" />
      <circle cx="32" cy="32" r="5" fill="#D4A5A5" opacity="0.6" />
      <path d="M32 36 Q28 50 32 58 Q36 50 32 36" fill="#9CAF88" opacity="0.5" />
    </svg>
  );
}

function Strawberry({ className = '', size = 36 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M24 8 C18 8 12 16 12 26 C12 36 18 42 24 42 C30 42 36 36 36 26 C36 16 30 8 24 8Z" fill="#E8A0A8" opacity="0.75" />
      <circle cx="20" cy="22" r="1.2" fill="#C47078" opacity="0.4" />
      <circle cx="26" cy="26" r="1" fill="#C47078" opacity="0.35" />
      <circle cx="22" cy="30" r="1.1" fill="#C47078" opacity="0.4" />
      <circle cx="28" cy="20" r="0.9" fill="#C47078" opacity="0.3" />
      <path d="M18 10 Q24 4 30 10" stroke="#9CAF88" strokeWidth="2" fill="none" opacity="0.7" />
      <ellipse cx="20" cy="9" rx="4" ry="2" fill="#B8D4C8" opacity="0.6" transform="rotate(-20 20 9)" />
      <ellipse cx="28" cy="9" rx="4" ry="2" fill="#B8D4C8" opacity="0.6" transform="rotate(20 28 9)" />
    </svg>
  );
}

interface FloralAccentProps {
  type: 'lily' | 'strawberry';
  size?: number;
  className?: string;
  delay?: number;
}

function FloralAccent({ type, size, className = '', delay = 0 }: FloralAccentProps) {
  const Component = type === 'lily' ? Lily : Strawberry;
  const defaultSize = type === 'lily' ? 52 : 38;

  return (
    <motion.div
      className={`pointer-events-none select-none absolute ${className}`}
      animate={{
        opacity: [0.3, 0.55, 0.3],
        y: [0, -10, 0],
        rotate: [0, type === 'lily' ? 8 : -6, 0],
      }}
      transition={{ duration: 5.5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <Component size={size ?? defaultSize} />
    </motion.div>
  );
}

type FloralVariant = 'default' | 'hero' | 'schedule' | 'dense' | 'footer';

const variantPositions: Record<FloralVariant, Array<{ type: 'lily' | 'strawberry'; className: string; size: number }>> = {
  default: [
    { type: 'lily', className: 'top-2 right-6 lg:right-12', size: 34 },
    { type: 'strawberry', className: 'bottom-4 left-4', size: 26 },
    { type: 'lily', className: 'top-1/2 -left-2 opacity-60', size: 22 },
  ],
  hero: [
    { type: 'strawberry', className: 'top-[12%] left-[6%]', size: 30 },
    { type: 'lily', className: 'top-[20%] right-[8%]', size: 40 },
    { type: 'strawberry', className: 'bottom-[18%] left-[12%]', size: 24 },
    { type: 'lily', className: 'bottom-[10%] right-[5%]', size: 32 },
  ],
  schedule: [
    { type: 'lily', className: 'top-0 -right-3', size: 28 },
    { type: 'strawberry', className: 'bottom-2 -left-1', size: 22 },
    { type: 'lily', className: 'top-1/3 -left-4', size: 20 },
  ],
  dense: [
    { type: 'lily', className: 'top-0 right-[10%]', size: 36 },
    { type: 'strawberry', className: 'top-[30%] left-0', size: 28 },
    { type: 'lily', className: 'bottom-[20%] right-0', size: 30 },
    { type: 'strawberry', className: 'bottom-0 left-[15%]', size: 24 },
    { type: 'lily', className: 'top-[50%] right-[25%] opacity-50', size: 18 },
  ],
  footer: [
    { type: 'strawberry', className: 'top-4 right-[20%]', size: 22 },
    { type: 'lily', className: 'bottom-6 left-[10%]', size: 28 },
  ],
};

export function FloralLayer() {
  const global = [
    { type: 'lily' as const, className: 'top-[8%] left-[2%]', size: 40, delay: 0 },
    { type: 'strawberry' as const, className: 'top-[15%] right-[3%]', size: 28, delay: 0.5 },
    { type: 'lily' as const, className: 'top-[32%] right-[1%]', size: 32, delay: 1 },
    { type: 'strawberry' as const, className: 'top-[45%] left-[4%]', size: 24, delay: 1.5 },
    { type: 'lily' as const, className: 'top-[58%] left-[1%]', size: 36, delay: 0.8 },
    { type: 'strawberry' as const, className: 'top-[68%] right-[5%]', size: 26, delay: 2 },
    { type: 'lily' as const, className: 'bottom-[22%] right-[2%]', size: 34, delay: 1.2 },
    { type: 'strawberry' as const, className: 'bottom-[35%] left-[3%]', size: 22, delay: 2.2 },
    { type: 'lily' as const, className: 'bottom-[12%] left-[6%]', size: 30, delay: 0.3 },
    { type: 'strawberry' as const, className: 'bottom-[8%] right-[8%]', size: 28, delay: 1.8 },
  ];

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-70 sm:opacity-100" aria-hidden>
        {global.map((f, i) => (
          <FloralAccent key={i} type={f.type} className={f.className} size={f.size} delay={f.delay} />
        ))}
      </div>
    </>
  );
}

export function SectionFlorals({ variant = 'default' }: { variant?: FloralVariant }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-0" aria-hidden>
      {variantPositions[variant].map((p, i) => (
        <FloralAccent key={i} type={p.type} className={p.className} size={p.size} delay={i * 0.5} />
      ))}
    </div>
  );
}

export { Lily, Strawberry };
