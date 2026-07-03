import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Play, Pause, Music, Headphones } from 'lucide-react';
import coming2031Banner from '@assets/coming_2031_banner.jpg';

export default function MusicPage() {
  const { songs } = useAdmin();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

  const togglePlay = (song: { id: string; src: string }) => {
    if (playingId === song.id) {
      audioRef?.pause();
      setPlayingId(null);
    } else {
      audioRef?.pause();
      const newAudio = new Audio(song.src);
      newAudio.play().catch(() => {});
      newAudio.onended = () => setPlayingId(null);
      setAudioRef(newAudio);
      setPlayingId(song.id);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-24 noise-bg bg-background">
      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden mb-16 border-b border-primary/30">
        <img src={coming2031Banner} alt="Music of Tamilakam" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <motion.h1
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary tracking-widest text-glow-gold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            SOUND OF TAMILAKAM
          </motion.h1>
          <motion.p
            className="text-foreground text-lg md:text-xl uppercase tracking-[0.3em] font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Official Soundtrack & Warrior Chants
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {songs.length === 0 ? (
          <motion.div
            className="text-center py-24 border border-border/30 bg-card"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <Headphones size={48} className="mx-auto text-primary/50 mb-6" />
            <h2 className="font-serif text-2xl text-foreground mb-2">No Songs Yet</h2>
            <p className="text-muted-foreground">The maestro is preparing the first battle hymns. Check back soon.</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {songs.map((song, idx) => (
              <motion.div
                key={song.id}
                className="bg-card border border-border/30 p-6 flex items-center gap-6 hover:border-primary/50 transition-all group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <button
                  onClick={() => togglePlay(song)}
                  className="w-14 h-14 shrink-0 rounded-full border border-primary/50 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label={playingId === song.id ? 'Pause' : 'Play'}
                >
                  {playingId === song.id ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors truncate">{song.title}</h3>
                  <p className="text-sm text-muted-foreground">{song.artist}</p>
                </div>
                <Music size={20} className="text-primary/50" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
