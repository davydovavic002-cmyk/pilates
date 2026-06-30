import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type ReactNode, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  to?: string;
  href?: string;
  variant?: 'primary' | 'ghost' | 'plaid';
  className?: string;
}

export function MagneticButton({
  children,
  onClick,
  to,
  href,
  variant = 'primary',
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.2);
    y.set((e.clientY - cy) * 0.2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variants = {
    primary:
      'bg-laurel text-cream shadow-dreamy hover:shadow-[0_24px_64px_rgba(90,115,85,0.2)]',
    ghost:
      'glass text-laurel-deep hover:bg-misty/40',
    plaid:
      'bg-plaid-soft text-laurel-deep shadow-dreamy',
  };

  const shared = `
    relative inline-flex items-center justify-center
    px-8 py-3.5 rounded-full
    font-sans text-sm font-medium tracking-[0.15em] uppercase
    transition-colors duration-500 overflow-hidden
    ${variants[variant]} ${className}
  `;

  const inner = (
    <>
      <motion.span
        className="absolute inset-0 bg-misty/0 hover:bg-misty/20 transition-colors duration-500 rounded-full"
        aria-hidden
      />
      <span className="relative z-10">{children}</span>
    </>
  );

  if (to) {
    return (
      <motion.div
        style={{ x: springX, y: springY, display: 'inline-block' }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        <Link to={to} onClick={onClick} className={shared}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className={shared}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={shared}
    >
      {inner}
    </motion.button>
  );
}
