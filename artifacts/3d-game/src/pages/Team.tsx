import { motion } from 'framer-motion';
import { User, Code, Palette, PenTool } from 'lucide-react';

const team = [
  { name: "Siddhesh", role: "Lead 3D Artist", icon: <Palette /> },
  { name: "Karthik", role: "Combat Designer", icon: <PenTool /> },
  { name: "Priya", role: "Narrative Director", icon: <PenTool /> },
  { name: "Arun", role: "Engine Programmer", icon: <Code /> },
  { name: "Ananya", role: "UI/UX Designer", icon: <Palette /> },
  { name: "Vikram", role: "Audio Engineer", icon: <User /> },
];

export default function Team() {
  return (
    <div className="min-h-screen pt-32 pb-24 noise-bg">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl text-primary text-glow-gold mb-6 uppercase tracking-widest">
            Warrior Developers
          </h1>
          <p className="text-xl text-muted-foreground font-serif italic max-w-3xl mx-auto">
            "We are building not just a game, but a monument to Tamil civilization."
          </p>
        </motion.div>

        {/* Founder Spotlight */}
        <motion.div 
          className="bg-card border-2 border-primary/50 p-8 md:p-12 mb-24 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-40 h-40 shrink-0 bg-background border border-primary flex items-center justify-center rounded-full overflow-hidden">
              <User size={64} className="text-primary/50" />
            </div>
            <div>
              <h2 className="font-serif text-4xl text-foreground mb-2 uppercase tracking-widest">Muhil</h2>
              <h3 className="text-primary uppercase tracking-widest font-bold mb-6 text-sm">Visionary Founder & Lead Developer</h3>
              <p className="text-muted-foreground leading-relaxed">
                Muhil founded Warrior Developers with a singular vision: to showcase the rich, untold epic history of the Tamil kingdoms to a global audience. Frustrated by the lack of South Asian representation in AAA gaming, he assembled a team to build Veera Yugam from the ground up.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { title: "Historical Accuracy", desc: "Consulting with historians to recreate authentic armor, architecture, and languages." },
            { title: "AAA Quality", desc: "Pushing the boundaries of modern graphics, physics, and seamless world streaming." },
            { title: "Tamil Pride", desc: "Crafting a narrative that honors the legacy of the Moovendar without compromise." }
          ].map((pillar, idx) => (
            <motion.div
              key={idx}
              className="border border-border/30 p-8 bg-card/30 text-center hover:border-primary/50 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h3 className="font-serif text-2xl text-primary mb-4">{pillar.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Future Projects */}
        <div>
          <h2 className="font-serif text-3xl text-center mb-12 uppercase tracking-widest text-foreground">Future Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <motion.div
                key={num}
                className="aspect-video bg-background border border-border/20 flex flex-col items-center justify-center relative overflow-hidden opacity-50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-primary/5 backdrop-blur-md" />
                <div className="relative z-10 text-center">
                  <div className="w-10 h-10 border-2 border-primary/30 mx-auto rounded-full flex items-center justify-center mb-3">
                    <span className="text-primary font-serif">?</span>
                  </div>
                  <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase">Project {num}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
