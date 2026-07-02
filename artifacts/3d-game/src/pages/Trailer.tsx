import { motion } from 'framer-motion';

export default function Trailer() {
  const teasers = [
    { title: "Combat Deep Dive", date: "Q3 2025" },
    { title: "World Map Reveal", date: "Q4 2025" },
    { title: "Public Demo Beta", date: "Q1 2026" },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden noise-bg">
      {/* Background radial gradient for cinematic focus */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-4xl md:text-6xl text-primary text-glow-gold mb-4 uppercase tracking-widest">
            Official Reveal Trailer
          </h1>
          <p className="text-muted-foreground">Prepare for the golden age of Tamilakam.</p>
        </motion.div>

        {/* Video Embed */}
        <motion.div 
          className="max-w-5xl mx-auto aspect-video border-2 border-primary/50 box-glow-gold p-1 bg-card/50 backdrop-blur-sm relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* We use a standard iframe. To avoid errors, ensure no unclosed tags. */}
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1&showinfo=0&rel=0" 
            title="Veera Yugam Trailer Placeholder" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="block"
          ></iframe>
        </motion.div>

        {/* Upcoming Roadmap Teasers */}
        <div className="max-w-5xl mx-auto mt-24">
          <h3 className="font-serif text-2xl text-foreground text-center mb-10 uppercase tracking-widest border-b border-border/50 pb-4 inline-block w-full">Upcoming Transmissions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teasers.map((t, idx) => (
              <motion.div 
                key={idx}
                className="bg-card/40 border border-border/30 p-8 text-center relative overflow-hidden group backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative z-10">
                  <div className="text-primary font-mono text-sm tracking-widest mb-4">RELEASE: {t.date}</div>
                  <h4 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors">{t.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
