import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Monitor, Smartphone, CheckCircle, AlertCircle } from 'lucide-react';
import heroBg from '@assets/hero-bg.jpg';

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-primary bg-card flex items-center justify-center font-serif text-2xl md:text-3xl font-bold text-primary text-glow-gold">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
  );
}

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(Math.max(0, target.getTime() - Date.now()));
  useEffect(() => {
    const i = setInterval(() => setDiff(Math.max(0, target.getTime() - Date.now())), 1000);
    return () => clearInterval(i);
  }, [target]);
  const s = Math.floor(diff / 1000);
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), mins: Math.floor((s % 3600) / 60), secs: s % 60 };
}

const platforms = [
  {
    id: 'windows',
    icon: <Monitor size={40} />,
    name: 'Windows PC',
    format: 'EXE Installer',
    size: '4.2 GB',
    version: '1.0.0 Beta',
    color: 'from-blue-500/20',
    border: 'border-blue-500/40',
    accent: 'text-blue-400',
    requirements: [
      { label: 'OS', value: 'Windows 10/11 64-bit' },
      { label: 'CPU', value: 'Intel Core i7-8700 / AMD Ryzen 5 3600' },
      { label: 'GPU', value: 'NVIDIA GTX 1070 / AMD RX 5700' },
      { label: 'RAM', value: '16 GB' },
      { label: 'Storage', value: '50 GB SSD' },
      { label: 'DirectX', value: 'Version 12' },
    ],
  },
  {
    id: 'android',
    icon: <Smartphone size={40} />,
    name: 'Android',
    format: 'APK Package',
    size: '1.8 GB',
    version: '1.0.0 Beta',
    color: 'from-emerald-500/20',
    border: 'border-emerald-500/40',
    accent: 'text-emerald-400',
    requirements: [
      { label: 'OS', value: 'Android 12+' },
      { label: 'CPU', value: 'Snapdragon 8 Gen 1 / Dimensity 9000' },
      { label: 'GPU', value: 'Adreno 730 / Mali-G710 or better' },
      { label: 'RAM', value: '6 GB minimum, 8 GB recommended' },
      { label: 'Storage', value: '4 GB free space' },
      { label: 'Resolution', value: '1080p and above' },
    ],
  },
];

const RELEASE_DATE = new Date('2031-01-01T00:00:00');

export default function Download() {
  const countdown = useCountdown(RELEASE_DATE);
  const [selected, setSelected] = useState<'windows' | 'android'>('windows');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  const sel = platforms.find(p => p.id === selected)!;

  return (
    <div className="min-h-screen noise-bg">
      {/* Hero */}
      <div className="relative pt-32 pb-20 overflow-hidden border-b border-primary/20">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-background/90" />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
          <motion.p className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-4"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>Warrior Developers · Pre-Release</motion.p>
          <motion.h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-primary text-glow-gold mb-6 uppercase tracking-widest"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Download Veera Yugam
          </motion.h1>
          <motion.p className="text-xl text-muted-foreground font-serif italic mb-12 max-w-xl mx-auto"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            The game is in active development. Full release arrives in 2031.
          </motion.p>

          {/* Countdown */}
          <motion.div className="flex items-center justify-center gap-4 md:gap-6 mb-12"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
            <CountdownUnit value={countdown.days} label="Days" />
            <div className="text-primary text-2xl font-bold pb-6">:</div>
            <CountdownUnit value={countdown.hours} label="Hours" />
            <div className="text-primary text-2xl font-bold pb-6">:</div>
            <CountdownUnit value={countdown.mins} label="Minutes" />
            <div className="text-primary text-2xl font-bold pb-6">:</div>
            <CountdownUnit value={countdown.secs} label="Seconds" />
          </motion.div>

          <motion.p className="text-muted-foreground text-sm uppercase tracking-widest"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            Until Full Release · January 1, 2031
          </motion.p>
        </div>
      </div>

      {/* Platform Selector + Details */}
      <div className="py-24 container mx-auto px-4 md:px-8 max-w-5xl">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-3">Select Platform</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground uppercase tracking-widest">Choose Your Device</h2>
        </motion.div>

        {/* Platform tabs */}
        <div className="flex gap-4 justify-center mb-10">
          {platforms.map(p => (
            <motion.button key={p.id} onClick={() => setSelected(p.id as any)}
              className={`flex-1 max-w-[220px] min-h-[80px] border-2 p-4 flex flex-col items-center gap-2 transition-all ${selected === p.id ? `${p.border} bg-gradient-to-b ${p.color} to-transparent` : 'border-border/30 bg-card/40 hover:border-primary/30'}`}
              whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <span className={selected === p.id ? p.accent : 'text-muted-foreground'}>{p.icon}</span>
              <span className={`font-serif uppercase tracking-widest text-sm font-bold ${selected === p.id ? p.accent : 'text-muted-foreground'}`}>{p.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Platform details */}
        <motion.div key={selected} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {/* Download card */}
          <div className={`bg-card border-2 ${sel.border} p-8 flex flex-col justify-between`}>
            <div>
              <div className={`${sel.accent} mb-4`}>{sel.icon}</div>
              <h3 className="font-serif text-2xl text-foreground mb-2">{sel.name}</h3>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm border-b border-border/20 pb-2">
                  <span className="text-muted-foreground uppercase tracking-wider text-xs">Format</span>
                  <span className="text-foreground font-medium">{sel.format}</span>
                </div>
                <div className="flex justify-between text-sm border-b border-border/20 pb-2">
                  <span className="text-muted-foreground uppercase tracking-wider text-xs">Size</span>
                  <span className="text-foreground font-medium">{sel.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground uppercase tracking-wider text-xs">Version</span>
                  <span className="text-foreground font-medium">{sel.version}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 px-4 py-3 mb-4">
                <AlertCircle size={16} className="text-primary shrink-0" />
                <p className="text-xs text-muted-foreground leading-snug">
                  The game is in active development. The beta build is available to early supporters only. Full release: 2031.
                </p>
              </div>
              <button className="w-full min-h-[52px] btn-primary flex items-center justify-center gap-2 font-serif uppercase tracking-widest text-sm opacity-60 cursor-not-allowed" disabled>
                Download Coming Soon
              </button>
            </div>
          </div>

          {/* System Requirements */}
          <div className="bg-card/40 border border-border/30 p-8">
            <h4 className="font-serif text-lg text-foreground uppercase tracking-widest mb-6">System Requirements</h4>
            <div className="space-y-3">
              {sel.requirements.map((req, i) => (
                <motion.div key={i} className="flex gap-3 items-start border-b border-border/15 pb-3 last:border-0 last:pb-0"
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <CheckCircle size={14} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground block mb-0.5">{req.label}</span>
                    <span className="text-sm text-foreground">{req.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Email signup */}
        <motion.div className="bg-card border border-primary/30 p-8 md:p-10 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="w-10 h-10 border border-primary flex items-center justify-center mx-auto mb-4 text-primary text-xl">✉</div>
          <h3 className="font-serif text-2xl text-foreground uppercase tracking-widest mb-2">Get Notified</h3>
          <p className="text-muted-foreground mb-6 text-sm">Be the first to know when the beta and full release drops. No spam — just updates.</p>
          {subscribed ? (
            <motion.div className="flex items-center justify-center gap-2 text-primary font-serif text-lg"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <CheckCircle size={20} /> You're on the list!
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required
                className="flex-1 min-h-[48px] bg-background border border-border/50 px-4 text-sm focus:outline-none focus:border-primary text-foreground" />
              <button type="submit" className="min-h-[48px] btn-primary px-6 font-serif uppercase tracking-widest text-sm whitespace-nowrap">
                Notify Me
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
