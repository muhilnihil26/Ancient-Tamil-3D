import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '@/context/AudioContext';
import { playSwordSwoosh } from '@/lib/audio';

type Phase = 0 | 1 | 2 | 3 | 4;

const TITLE_LETTERS = 'VEERA YUGAM'.split('');

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>(0);
  const [progress, setProgress] = useState(0);
  const { audioCtx, resumeAudio, isMuted } = useAudio();
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Progress bar fills during load
    progressRef.current = setInterval(() => {
      setProgress(p => Math.min(p + Math.random() * 12, 95));
    }, 120);

    const t1 = setTimeout(() => setPhase(1), 600);          // line appears
    const t2 = setTimeout(() => setPhase(2), 1800);          // title rises
    const t3 = setTimeout(() => {                            // progress completes
      setProgress(100);
      if (progressRef.current) clearInterval(progressRef.current);
    }, 3200);
    const t4 = setTimeout(() => setPhase(3), 3600);          // subtitle + hint
    const t5 = setTimeout(() => setPhase(4), 5000);          // fade out

    return () => {
      [t1, t2, t3, t4, t5].forEach(clearTimeout);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  useEffect(() => {
    if (phase !== 2) return;
    const play = async () => {
      await resumeAudio();
      if (!isMuted && audioCtx) playSwordSwoosh(audioCtx);
    };
    play();
  }, [phase, audioCtx, isMuted, resumeAudio]);

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-[#040200] flex flex-col items-center justify-center pointer-events-auto overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
        >
          {/* Background ember particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-primary/70 animate-ember"
                style={{
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                  left: `${Math.random() * 100}%`,
                  bottom: 0,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${3 + Math.random() * 5}s`,
                  boxShadow: '0 0 6px rgba(212,175,55,0.9)',
                }}
              />
            ))}
          </div>

          {/* Radial glow behind title */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, transparent 70%)' }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 1.5 }}
          />

          {/* Horizontal gold line */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={phase >= 1 ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            style={{ boxShadow: '0 0 12px rgba(212,175,55,0.6)' }}
          />

          {/* Corner decorations */}
          {[
            'top-8 left-8 border-t border-l',
            'top-8 right-8 border-t border-r',
            'bottom-8 left-8 border-b border-l',
            'bottom-8 right-8 border-b border-r',
          ].map((cls, i) => (
            <motion.div
              key={i}
              className={`absolute w-12 h-12 border-primary/50 ${cls}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
            />
          ))}

          {/* Title — letter by letter */}
          <div className="relative z-10 flex items-center justify-center overflow-hidden h-32" style={{ marginTop: '-64px' }}>
            <div className="flex">
              {TITLE_LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-serif text-5xl md:text-8xl font-bold text-primary tracking-[0.15em] text-glow-gold"
                  initial={{ y: '120%', opacity: 0 }}
                  animate={phase >= 2 ? { y: '0%', opacity: 1 } : { y: '120%', opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: phase >= 2 ? i * 0.045 : 0,
                    ease: [0.2, 0.8, 0.4, 1],
                  }}
                  style={{ display: letter === ' ' ? 'inline-block' : undefined, minWidth: letter === ' ' ? '0.5em' : undefined }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Subtitle */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                className="relative z-10 text-center mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-muted-foreground uppercase tracking-[0.5em] text-xs md:text-sm font-medium">
                  Warrior Developers · 2031
                </p>
                <p className="text-primary/60 text-[10px] uppercase tracking-widest mt-2 font-medium">
                  Tamil History. Reimagined.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 md:w-64 h-[2px] bg-primary/10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={phase >= 1 ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-primary"
              style={{ width: `${progress}%`, boxShadow: '0 0 8px rgba(212,175,55,0.8)' }}
              transition={{ duration: 0.15, ease: 'linear' }}
            />
          </motion.div>

          {/* Loading label */}
          <motion.p
            className="absolute bottom-10 text-[10px] uppercase tracking-[0.4em] text-primary/40 font-mono"
            initial={{ opacity: 0 }}
            animate={phase >= 1 ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            Loading World…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
