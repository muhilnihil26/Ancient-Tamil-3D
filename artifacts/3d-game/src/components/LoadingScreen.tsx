import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
        >
          {/* Phase 1: Thin gold line */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-[1px] bg-primary box-glow-gold origin-center"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <div className="relative z-10 overflow-hidden h-32 flex items-center">
            {/* Phase 2: Title rises from line */}
            <motion.h1
              className="font-serif text-5xl md:text-8xl font-bold text-primary text-glow-gold tracking-widest text-center translate-y-full"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "-10%", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.8 }}
            >
              VEERA YUGAM
            </motion.h1>
          </div>
          
          {/* Phase 3: Subtitle fades in */}
          <motion.div
            className="absolute top-[calc(50%+4rem)] text-muted-foreground uppercase tracking-[0.3em] text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            Warrior Developers
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
