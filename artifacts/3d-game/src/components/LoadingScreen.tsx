import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '@/context/AudioContext';
import { playSwordSwoosh } from '@/lib/audio';

type Phase = 0 | 1 | 2 | 3;

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>(0);
  const { audioCtx, resumeAudio, isMuted } = useAudio();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase(1);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = async () => {
    if (phase !== 1) return;

    await resumeAudio();
    if (!isMuted && audioCtx) {
      playSwordSwoosh(audioCtx);
    }

    setPhase(2);

    const exitTimer = setTimeout(() => {
      setPhase(3);
    }, 2000);
    return () => clearTimeout(exitTimer);
  };

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center pointer-events-auto"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Phase 0 & 1: Thin gold line */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-[1px] bg-primary box-glow-gold origin-center"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <div className="relative z-10 overflow-hidden h-32 flex items-center mt-[-64px]">
            {/* Phase 2: Title rises from line */}
            <motion.h1
              className="font-serif text-5xl md:text-8xl font-bold text-primary text-glow-gold tracking-widest text-center"
              initial={{ y: "100%", opacity: 0 }}
              animate={phase >= 2 ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              VEERA YUGAM
            </motion.h1>
          </div>
          
          <AnimatePresence>
            {phase === 1 && (
              <motion.button
                onClick={handleEnter}
                className="absolute top-[calc(50%+4rem)] text-primary uppercase tracking-[0.3em] text-sm border border-primary/50 px-6 py-2 hover:bg-primary/20 transition-all font-bold box-glow-gold-hover"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5 }}
                aria-label="Click to Enter"
              >
                Click to Enter
              </motion.button>
            )}
          </AnimatePresence>

          {/* Phase 2: Subtitle fades in */}
          <AnimatePresence>
            {phase === 2 && (
              <motion.div
                className="absolute top-[calc(50%+4rem)] text-muted-foreground uppercase tracking-[0.3em] text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Warrior Developers
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}