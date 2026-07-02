import { motion } from 'framer-motion';

export default function Story() {
  const storyBeats = [
    {
      title: "The Age of Valor",
      desc: "The Tamilakam thrives under the balance of the three great empires: Chola, Pandya, and Chera. Trade flourishes, temples reach the skies, and martial arts are perfected.",
      year: "Golden Era"
    },
    {
      title: "Darkness Stirs",
      desc: "From the southern abyss, the mysterious Dark King Irulan emerges, commanding forgotten shadow magic. The borders weaken as unknown beasts ravage the villages.",
      year: "The First Omen"
    },
    {
      title: "The Chosen One",
      desc: "Veeran, an ordinary village guardian, discovers an ancient artifact. The legendary Sage Agathiyan recognizes the mark of the old gods upon him.",
      year: "The Awakening"
    },
    {
      title: "The Great War",
      desc: "Setting aside centuries of rivalry, the three kingdoms must unite their massive armies. The largest battle in Tamil history begins on the plains of Kaveri.",
      year: "The Convergence"
    },
    {
      title: "Your Destiny Awaits",
      desc: "You are Veeran. Master the sword, command the armies, and strike down the darkness before Tamilakam is lost forever.",
      year: "Now"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden noise-bg">
      {/* Background wisp effects */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-destructive/20 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-5xl md:text-6xl text-primary text-glow-gold mb-6 uppercase tracking-widest">
            The Legend
          </h1>
          <p className="text-xl text-muted-foreground font-serif italic">
            "When the three flags fly as one, the darkness shall burn."
          </p>
        </motion.div>

          <div className="relative w-full overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide md:flex md:gap-8 custom-scrollbar">
            {/* Horizontal Timeline Line for Desktop, Vertical for Mobile */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2 z-0" />
            <div className="md:hidden absolute left-[27px] top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary to-primary/20 z-0" />

            <div className="flex flex-col md:flex-row gap-12 md:gap-0 w-full md:w-max">
              {storyBeats.map((beat, idx) => (
                <motion.div 
                  key={idx}
                  className="flex flex-row md:flex-col items-start md:items-center relative snap-center md:w-[400px] shrink-0"
                  initial={{ opacity: 0, x: 50, y: 50 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                >
                  {/* Center Node */}
                  <div className="w-14 h-14 shrink-0 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 box-glow-gold mb-0 md:mb-8 mr-8 md:mr-0 absolute md:relative left-0 md:left-auto top-6 md:top-auto">
                    <div className="w-4 h-4 rounded-full bg-primary animate-pulse-gold" />
                  </div>

                  <div className="ml-24 md:ml-0 w-full p-8 bg-card border border-primary/20 relative group hover:border-primary/50 transition-colors card-legendary min-h-[300px] overflow-hidden">
                    {/* Background Ink/Smoke */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-background to-background pointer-events-none group-hover:opacity-20 transition-opacity" />
                    
                    {/* Roman Numeral */}
                    <div className="absolute -bottom-4 -right-4 font-serif text-8xl text-primary/10 font-black pointer-events-none select-none">
                      {['I', 'II', 'III', 'IV', 'V'][idx]}
                    </div>

                    {/* Glowing Chapter Badge */}
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-primary uppercase border border-primary/30 bg-primary/5 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                      {beat.year}
                    </div>

                    <h3 className="font-serif text-3xl text-foreground mb-4 relative z-10 text-glow-gold group-hover:text-primary transition-colors">{beat.title}</h3>
                    <p className="text-muted-foreground leading-relaxed relative z-10">{beat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
      </div>
    </div>
  );
}
