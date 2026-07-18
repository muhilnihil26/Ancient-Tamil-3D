import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Play } from 'lucide-react';

interface TrailerItem {
  id: string;
  title: string;
  description: string;
  src: string;
  badge?: string;
}

export default function Trailer() {
  const { trailers } = useAdmin();

  const builtins: TrailerItem[] = [
    { id: 'aerial', title: 'Aerial Tamilakam', description: 'Soar over the ancient Tamilakam landscape in breathtaking aerial in-engine footage.', src: '/videos/intro.mp4', badge: 'Latest' },
    { id: 'cinematic', title: 'Cinematic Reveal', description: 'The original cinematic reveal of Veera Yugam — witness the dawn of a new era in Tamil gaming.', src: '/videos/trailer.mp4', badge: 'Official' },
  ];

  const adminItems: TrailerItem[] = trailers.map(t => ({
    id: t.id, title: t.title, description: t.description, src: t.src, badge: 'New',
  }));

  const all: TrailerItem[] = [...adminItems, ...builtins];
  const [activeIdx, setActiveIdx] = useState(0);
  const active = all[activeIdx];

  const roadmap = [
    { title: 'Combat Deep Dive', date: 'Q1 2027', done: false },
    { title: 'World Map Reveal', date: 'Q3 2027', done: false },
    { title: 'Public Demo Beta', date: 'Q1 2028', done: false },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 relative overflow-hidden noise-bg">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,#1a0d00_0%,#0a0704_60%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Title */}
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-3">Warrior Developers · Official</p>
          <h1 className="font-serif text-4xl md:text-6xl text-foreground uppercase tracking-widest mb-4">
            <span className="text-primary text-glow-gold">Trailers</span> &amp; Footage
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Witness the birth of an epic. {all.length} video{all.length !== 1 ? 's' : ''} available.</p>
        </motion.div>

        {/* Main layout: featured player + playlist */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-20">
          {/* Featured Player */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="aspect-video border-2 border-primary/60 box-glow-gold bg-black relative overflow-hidden"
              >
                <video
                  key={active.src}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  playsInline
                  preload="metadata"
                  src={active.src}
                />
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary pointer-events-none" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary pointer-events-none" />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + '-meta'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  {active.badge && (
                    <span className="text-xs uppercase tracking-widest font-bold text-primary border border-primary/50 px-2 py-0.5">{active.badge}</span>
                  )}
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground">{active.title}</h2>
                </div>
                <p className="text-muted-foreground">{active.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Playlist sidebar */}
          <div className="lg:max-h-[600px] lg:overflow-y-auto space-y-3 pr-1">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-4">Playlist — {all.length} Videos</p>
            {all.map((item, idx) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                className={`w-full text-left border transition-all duration-200 p-4 flex items-start gap-3 group ${
                  activeIdx === idx
                    ? 'border-primary bg-primary/10'
                    : 'border-border/30 hover:border-primary/40 hover:bg-card'
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ x: 4 }}
              >
                <div className={`shrink-0 w-9 h-9 flex items-center justify-center border rounded-full mt-0.5 transition-all ${
                  activeIdx === idx ? 'border-primary bg-primary text-black' : 'border-border/50 group-hover:border-primary/50'
                }`}>
                  {activeIdx === idx
                    ? <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
                    : <Play size={12} className="text-primary ml-0.5" />
                  }
                </div>
                <div className="min-w-0">
                  {item.badge && (
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold block mb-1">{item.badge}</span>
                  )}
                  <p className={`font-serif text-sm leading-tight ${activeIdx === idx ? 'text-primary' : 'text-foreground'}`}>{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-16"><div className="section-divider-diamond" /></div>

        {/* Roadmap teasers */}
        <div className="max-w-5xl mx-auto">
          <motion.h3
            className="font-serif text-2xl text-center uppercase tracking-widest mb-10 text-foreground"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            Upcoming <span className="text-primary">Transmissions</span>
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roadmap.map((item, idx) => (
              <motion.div
                key={idx}
                className="relative border border-border/30 bg-card/40 backdrop-blur-sm p-8 text-center overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12 }}
                whileHover={{ y: -4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-500 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="text-primary font-mono text-xs tracking-widest mb-4 uppercase">{item.date}</div>
                  <h4 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                  <div className="mt-4 w-8 h-[1px] bg-primary/40 mx-auto group-hover:w-16 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
