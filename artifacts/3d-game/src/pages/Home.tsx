import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'wouter';
import { ChevronDown, Sword, Shield, Map } from 'lucide-react';
import HeroScene from '@/components/HeroScene';
import heroBg from '@assets/hero-bg.jpg';

const StatCounter = ({ end, duration, label }: { end: number, duration: number, label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-4">
      <div className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary font-bold mb-2">
        {count.toLocaleString()}+
      </div>
      <div className="text-sm md:text-base text-muted-foreground uppercase tracking-widest text-center">
        {label}
      </div>
    </div>
  );
};

export default function Home() {
  const { t } = useLanguage();
  const [titleIdx, setTitleIdx] = useState(0);
  const titles = ["Guardian", "Warrior", "King", "Conqueror", "Legend"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIdx((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  const features = [
    { icon: <Sword size={32} />, title: 'Epic Combat', desc: 'Master ancient Tamil martial arts and wielding legendary weapons.' },
    { icon: <Map size={32} />, title: 'Open World', desc: 'Explore a vast landscape spanning from the Kaveri delta to the Western Ghats.' },
    { icon: <Shield size={32} />, title: 'Ancient Kingdoms', desc: 'Navigate the political and military conflicts of the Chola, Pandya, and Chera empires.' }
  ];

  return (
    <div className="min-h-screen relative w-full noise-bg">
      {/* Floating 2031 Badge */}
      <div className="fixed bottom-6 right-6 z-50 animate-pulse-gold rounded-full px-4 py-2 bg-background/80 backdrop-blur-md border border-primary flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        <span className="text-sm font-bold uppercase tracking-widest text-primary">Coming 2031</span>
      </div>

      {/* Hero Section */}
      <section className="relative h-[100dvh] flex flex-col items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Hero Background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        
        {/* Ambient Ember Particles */}
        <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute w-1 h-1 bg-primary rounded-full animate-ember"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                boxShadow: '0 0 8px rgba(212,175,55,0.8)'
              }}
            />
          ))}
        </div>

        <HeroScene />
        
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <motion.h1 
            className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold text-primary tracking-widest text-glow-gold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            VEERA<br className="md:hidden"/> YUGAM
          </motion.h1>
          
          <motion.div 
            className="overflow-hidden mb-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } }
            }}
          >
            <p className="font-serif text-xl md:text-3xl text-foreground uppercase tracking-widest flex items-center justify-center gap-2 flex-wrap">
              <span>Rise as the</span>
              <motion.span 
                key={titleIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-primary inline-block min-w-[150px] text-left"
              >
                {titles[titleIdx]}
              </motion.span>
              <span>of Tamilakam</span>
            </p>
          </motion.div>
          
          <motion.p
            className="text-muted-foreground tracking-[0.2em] uppercase text-sm mb-12 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            The open-world action RPG from Warrior Developers. Arriving 2031.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row w-full max-w-lg mx-auto sm:max-w-none justify-center mt-6 rounded-lg overflow-hidden border border-primary/40 box-glow-gold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <Link href="/download" className="flex-1 py-5 px-6 bg-background/50 backdrop-blur text-foreground hover:bg-primary/20 hover:text-primary transition-all text-center flex items-center justify-center gap-3 border-b sm:border-b-0 sm:border-r border-primary/30 group">
              <span className="text-xl group-hover:scale-110 transition-transform">⚔</span>
              <span className="font-serif font-bold tracking-widest uppercase">Download APK</span>
            </Link>
            <Link href="/download" className="flex-1 py-5 px-6 bg-primary text-primary-foreground hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center gap-3 group">
              <span className="text-xl group-hover:scale-110 transition-transform">🖥</span>
              <span className="font-serif font-bold tracking-widest uppercase">Download EXE</span>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-primary"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={40} className="opacity-50" />
        </motion.div>
      </section>

      <div className="section-divider">
        <div className="section-divider-diamond" />
      </div>

      {/* Highlights Section */}
      <section className="pb-24 relative z-10 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                className="flex flex-col items-center text-center p-8 border border-border/20 bg-card/50 hover:bg-card transition-all group relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="absolute inset-0 border-2 border-transparent group-hover:animate-shimmer pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.8) 50%, transparent 100%)', backgroundSize: '200% auto' }} />
                <div className="absolute inset-[2px] bg-card pointer-events-none z-0" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="text-primary mb-6 group-hover:scale-110 group-hover:text-glow-gold transition-all duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="font-serif text-2xl text-foreground font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Epic Scale Statistics */}
      <section className="py-20 bg-card border-y border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-background to-background" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-primary/20">
            <StatCounter end={50} duration={2} label="Hours of Gameplay" />
            <StatCounter end={3} duration={1.5} label="Ancient Kingdoms" />
            <StatCounter end={100} duration={2.5} label="Side Quests" />
            <StatCounter end={10000} duration={3} label="Warriors on Screen" />
          </div>
        </div>
      </section>
    </div>
  );
}
