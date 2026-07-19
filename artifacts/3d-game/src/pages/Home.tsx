import { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useAdmin } from '@/context/AdminContext';
import { Link } from 'wouter';
import { ChevronDown, Sword, Shield, Map, Zap, Eye, Users, Music, Trophy, Globe } from 'lucide-react';
import HeroScene from '@/components/HeroScene';
import heroBg from '@assets/hero-bg.jpg';
import galleryImg1 from '@assets/gallery-1.jpg';
import galleryImg2 from '@assets/gallery-2.jpg';
import galleryImg3 from '@assets/gallery-3.jpg';
import galleryImg4 from '@assets/gallery-4.jpg';

const StatCounter = ({ end, suffix = '+', duration, label }: { end: number; suffix?: string; duration: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  useEffect(() => {
    if (!isInView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      setCount(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);
  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-4 md:p-6">
      <div className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-bold mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest text-center">{label}</div>
    </div>
  );
};

const features = [
  { icon: <Sword size={28} />, title: 'Epic Combat', desc: 'Master 50+ ancient Tamil martial arts — Silambam, Varma Kalai, and Kuttu Varisai.' },
  { icon: <Map size={28} />, title: '100km² Open World', desc: 'From the Kaveri delta to the Western Ghats — fully explorable without a single loading screen.' },
  { icon: <Shield size={28} />, title: 'Three Kingdoms', desc: 'Navigate the political and military conflicts of Chola, Pandya, and Chera dynasties.' },
  { icon: <Zap size={28} />, title: 'Dynamic Weather', desc: 'Real-time monsoons, lightning storms, and seasonal changes affect gameplay and strategy.' },
  { icon: <Eye size={28} />, title: 'Stealth & Espionage', desc: 'Infiltrate enemy palaces, forge alliances, and uncover conspiracies in the shadows.' },
  { icon: <Users size={28} />, title: '10,000 Warriors', desc: 'Epic siege battles with realistic crowd AI — no two battles are ever the same.' },
  { icon: <Music size={28} />, title: 'Live Karnatic Score', desc: 'An adaptive orchestral score blending classical Carnatic instruments with epic battle music.' },
  { icon: <Trophy size={28} />, title: 'Legacy System', desc: 'Your choices echo through generations. Build a dynasty that shapes the fate of Tamilakam.' },
  { icon: <Globe size={28} />, title: 'Tamil Language', desc: 'Full voice acting in authentic Old Tamil, with modern Tamil and 12 other language options.' },
];

const screenshotGallery = [
  { src: galleryImg1, label: 'Thanjavur Palace' },
  { src: galleryImg2, label: 'Sea Battle' },
  { src: galleryImg3, label: 'Mountain Fortress' },
  { src: galleryImg4, label: 'Temple District' },
];

const TITLES = ['Guardian', 'Warrior', 'King', 'Conqueror', 'Legend'];

export default function Home() {
  const { t } = useLanguage();
  const { trailers } = useAdmin();
  const [titleIdx, setTitleIdx] = useState(0);
  const [galleryIdx, setGalleryIdx] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setTitleIdx(p => (p + 1) % TITLES.length), 3000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const i = setInterval(() => setGalleryIdx(p => (p + 1) % screenshotGallery.length), 4500);
    return () => clearInterval(i);
  }, []);

  // Dynamic trailer: latest admin trailer first, then built-in
  const featuredTrailer = trailers.length > 0 ? trailers[trailers.length - 1] : null;
  const trailerSrc = featuredTrailer?.src ?? '/videos/intro.mp4';
  const trailerTitle = featuredTrailer?.title ?? 'Aerial Tamilakam';
  const trailerDesc = featuredTrailer?.description ?? 'Soar over ancient Tamilakam — a glimpse of the world awaiting you in 2031.';

  return (
    <div className="min-h-screen relative w-full noise-bg">
      {/* Floating badge */}
      <div className="fixed bottom-6 right-6 z-50 animate-pulse-gold rounded-full px-4 py-2 bg-background/80 backdrop-blur-md border border-primary flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-primary">Coming 2031</span>
      </div>

      {/* ── Hero Section ────────────────────────────────────────── */}
      <section className="relative h-[100dvh] flex flex-col items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-background/80" />
        </div>

        {/* Ember particles */}
        <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-primary rounded-full animate-ember"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 4}s`, boxShadow: '0 0 8px rgba(212,175,55,0.8)' }} />
          ))}
        </div>

        <HeroScene />

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mb-4 px-4 py-1.5 border border-primary/40 bg-primary/5 backdrop-blur-sm inline-flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold">Open World Action RPG · Tamil Nadu 900 CE</span>
          </motion.div>

          <motion.h1
            className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold text-primary tracking-widest text-glow-gold mb-6"
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            VEERA<br className="md:hidden" /> YUGAM
          </motion.h1>

          <motion.div className="overflow-hidden mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <p className="font-serif text-xl md:text-3xl text-foreground uppercase tracking-widest flex items-center justify-center gap-2 flex-wrap">
              <span>Rise as the</span>
              <AnimatePresence mode="wait">
                <motion.span key={titleIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
                  className="text-primary inline-block min-w-[130px] md:min-w-[180px] text-left">{TITLES[titleIdx]}</motion.span>
              </AnimatePresence>
              <span>of Tamilakam</span>
            </p>
          </motion.div>

          <motion.p className="text-muted-foreground tracking-[0.15em] md:tracking-[0.2em] uppercase text-xs md:text-sm mb-10 max-w-2xl"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
            The open-world action RPG from Warrior Developers. Arriving 2031.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row w-full max-w-md sm:max-w-none sm:justify-center gap-3 sm:gap-0 sm:border sm:border-primary/40 sm:overflow-hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
            <Link href="/download" className="flex-1 min-h-[52px] sm:py-5 px-6 bg-background/50 backdrop-blur text-foreground hover:bg-primary/20 hover:text-primary transition-all text-center flex items-center justify-center gap-3 border border-primary/40 sm:border-0 sm:border-r sm:border-primary/30 group active:scale-95">
              <span className="text-xl group-hover:scale-110 transition-transform">⚔</span>
              <span className="font-serif font-bold tracking-widest uppercase text-sm">Download APK</span>
            </Link>
            <Link href="/download" className="flex-1 min-h-[52px] sm:py-5 px-6 bg-primary text-primary-foreground hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center gap-3 group">
              <span className="text-xl group-hover:scale-110 transition-transform">🖥</span>
              <span className="font-serif font-bold tracking-widest uppercase text-sm">Download EXE</span>
            </Link>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-primary"
          animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown size={36} className="opacity-50" />
        </motion.div>
      </section>

      <div className="section-divider"><div className="section-divider-diamond" /></div>

      {/* ── Features Grid ───────────────────────────────────────── */}
      <section className="py-24 relative z-10 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-3">Core Gameplay</p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground uppercase tracking-widest mb-4">
              What Awaits <span className="text-primary text-glow-gold">Within</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Every system built from the ground up to honour the depth of Tamil civilisation.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, idx) => (
              <motion.div key={idx}
                className="flex gap-4 p-6 border border-border/20 bg-card/50 hover:bg-card hover:border-primary/30 transition-all group relative overflow-hidden"
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }} transition={{ delay: (idx % 3) * 0.1 }}
                whileHover={{ y: -3 }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                <div className="absolute left-0 top-0 bottom-0 w-0 bg-primary group-hover:w-0.5 transition-all duration-300" />
                <div className="text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                <div>
                  <h3 className="font-serif text-lg text-foreground font-bold mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="section-divider-diamond" /></div>

      {/* ── Featured Trailer Section ─────────────────────────────── */}
      <section className="py-24 relative z-10 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-primary uppercase tracking-[0.3em] text-xs font-bold mb-3">Now Playing</p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground uppercase tracking-widest mb-4">
              <span className="text-primary text-glow-gold">{trailerTitle}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{trailerDesc}</p>
          </motion.div>
          <motion.div
            className="max-w-5xl mx-auto aspect-video border-2 border-primary/60 box-glow-gold bg-black relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <video className="w-full h-full object-cover" autoPlay muted loop playsInline preload="metadata" src={trailerSrc}>
              <source src={trailerSrc} type="video/mp4" />
            </video>
            <div className="absolute inset-0 pointer-events-none border border-primary/20" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 text-primary uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold whitespace-nowrap">
              In-Engine Footage · 2031
            </div>
            {/* Corner marks */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary pointer-events-none" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary pointer-events-none" />
          </motion.div>
          <div className="text-center mt-8">
            <Link href="/trailer" className="inline-flex items-center gap-2 text-primary uppercase tracking-widest text-sm font-bold hover:opacity-75 transition-opacity group">
              Watch All Trailers <span className="group-hover:translate-x-2 transition-transform inline-block">→</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="section-divider-diamond" /></div>

      {/* ── Screenshot Gallery ───────────────────────────────────── */}
      <section className="py-24 relative z-10 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-3">Visual Gallery</p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground uppercase tracking-widest">
              The World of <span className="text-primary text-glow-gold">Tamilakam</span>
            </h2>
          </motion.div>
          <div className="max-w-5xl mx-auto relative">
            <div className="aspect-video border border-primary/30 overflow-hidden relative bg-card">
              <AnimatePresence mode="wait">
                <motion.img key={galleryIdx} src={screenshotGallery[galleryIdx].src} alt={screenshotGallery[galleryIdx].label}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.7 }} />
              </AnimatePresence>
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
              <AnimatePresence mode="wait">
                <motion.p key={galleryIdx + '-label'} className="absolute bottom-4 left-4 text-white text-sm uppercase tracking-widest font-bold font-serif"
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  {screenshotGallery[galleryIdx].label}
                </motion.p>
              </AnimatePresence>
              {/* Dots */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {screenshotGallery.map((_, i) => (
                  <button key={i} onClick={() => setGalleryIdx(i)}
                    className={`w-2 h-2 rounded-full transition-all min-h-[12px] min-w-[12px] ${i === galleryIdx ? 'bg-primary scale-125' : 'bg-white/40'}`} />
                ))}
              </div>
            </div>
            <div className="text-center mt-6">
              <Link href="/gallery" className="inline-flex items-center gap-2 text-primary uppercase tracking-widest text-sm font-bold hover:opacity-75 transition-opacity group">
                View Full Gallery <span className="group-hover:translate-x-2 transition-transform inline-block">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"><div className="section-divider-diamond" /></div>

      {/* ── Statistics ───────────────────────────────────────────── */}
      <section className="py-20 bg-card border-y border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-background to-background" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-primary/20">
            <StatCounter end={50} duration={2} label="Hours of Gameplay" />
            <StatCounter end={3} suffix="" duration={1.5} label="Ancient Kingdoms" />
            <StatCounter end={100} duration={2.5} label="Side Quests" />
            <StatCounter end={10000} duration={3} label="Warriors on Screen" />
          </div>
        </div>
      </section>

      {/* ── CTA Strip ───────────────────────────────────────────── */}
      <section className="py-24 bg-background relative z-10">
        <motion.div className="container mx-auto px-4 md:px-8 text-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-4">Join the Movement</p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground uppercase tracking-widest mb-6">
            Be Part of <span className="text-primary text-glow-gold">History</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">Tamil history deserves a AAA game. Support Warrior Developers and help us get there.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about" className="min-h-[52px] inline-flex items-center justify-center px-8 border border-primary text-primary hover:bg-primary/10 transition-all font-serif uppercase tracking-widest text-sm font-bold active:scale-95">
              Join the Team
            </Link>
            <Link href="/articles" className="min-h-[52px] inline-flex items-center justify-center px-8 bg-primary text-primary-foreground hover:brightness-110 transition-all font-serif uppercase tracking-widest text-sm font-bold active:scale-95">
              Read the Chronicles
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
