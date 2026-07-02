import { motion } from 'framer-motion';

export default function Download() {
  return (
    <div className="min-h-screen pt-32 pb-24 noise-bg flex items-center justify-center">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-serif text-4xl md:text-6xl text-primary text-glow-gold mb-6 uppercase tracking-widest">
          Download
        </h1>
        <p className="text-xl text-muted-foreground font-serif italic">
          Select your platform to start the journey.
        </p>
        <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center max-w-2xl mx-auto">
          <button className="btn-primary py-4 px-8 text-xl flex-1 flex flex-col items-center gap-2">
            <span>🖥 Windows (EXE)</span>
            <span className="text-xs opacity-70">Version 1.0.4 • 4.2 GB</span>
          </button>
          <button className="btn-primary py-4 px-8 text-xl flex-1 flex flex-col items-center gap-2 bg-gradient-to-r from-secondary/80 to-secondary border-secondary/50">
            <span>⚔ Android (APK)</span>
            <span className="text-xs opacity-70">Version 1.0.4 • 1.8 GB</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
