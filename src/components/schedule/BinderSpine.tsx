import { motion } from 'framer-motion';

export function BinderSpine() {
  const ringPairs = Array.from({ length: 6 });

  return (
    <div
      className="relative w-10 md:w-12 shrink-0 flex flex-col items-center self-stretch py-6"
      aria-hidden
    >
      {/* Central rail */}
      <div className="absolute top-[4%] bottom-[4%] w-1.5 rounded-full binder-iridescent shadow-[0_0_12px_rgba(200,180,220,0.4)]" />

      {/* Ring pairs */}
      <div className="relative flex flex-col justify-between h-full py-2">
        {ringPairs.map((_, i) => (
          <div key={i} className="flex gap-0.5 items-center">
            <motion.div
              className="w-5 h-2.5 md:w-6 md:h-3 rounded-full border-2 border-[#c4b5d4]/80"
              style={{
                background: 'linear-gradient(135deg, rgba(212,196,232,0.3), rgba(168,196,212,0.2))',
              }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
            />
            <motion.div
              className="w-5 h-2.5 md:w-6 md:h-3 rounded-full border-2 border-[#a8c4d4]/80"
              style={{
                background: 'linear-gradient(135deg, rgba(168,196,212,0.3), rgba(200,184,232,0.2))',
              }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, delay: i * 0.2 + 0.1, repeat: Infinity }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
