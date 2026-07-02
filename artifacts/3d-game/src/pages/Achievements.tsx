import { motion } from 'framer-motion';
import { Lock, Unlock, Trophy } from 'lucide-react';

const achievements = [
  { id: 1, title: "First Blood", desc: "Defeat your first enemy in combat.", unlocked: true },
  { id: 2, title: "Kingdom Defender", desc: "Protect a village from a raid.", unlocked: true },
  { id: 3, title: "Sage's Chosen", desc: "Find Agathiyan's hidden temple.", unlocked: true },
  { id: 4, title: "Dragon Slayer", desc: "Defeat the mythical Yaazhi.", unlocked: false },
  { id: 5, title: "Ancient Scholar", desc: "Read all 50 stone inscriptions.", unlocked: false },
  { id: 6, title: "Naval Commander", desc: "Sink 10 enemy ships.", unlocked: false },
  { id: 7, title: "50 Enemies Slain", desc: "Achieve a 50-kill combo.", unlocked: true },
  { id: 8, title: "All Kingdoms United", desc: "Forge an alliance between the Moovendar.", unlocked: false },
  { id: 9, title: "Dark King Defeated", desc: "Finish the main storyline.", unlocked: false },
  { id: 10, title: "Legendary Weapons", desc: "Collect all 3 legendary weapons.", unlocked: false },
  { id: 11, title: "True Tamil Warrior", desc: "Reach maximum level.", unlocked: false },
  { id: 12, title: "100% Complete", desc: "Unlock every other achievement.", unlocked: false },
];

export default function Achievements() {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const total = achievements.length;
  const progress = (unlockedCount / total) * 100;

  return (
    <div className="min-h-screen pt-32 pb-24 noise-bg">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-4xl md:text-6xl text-primary text-glow-gold mb-4 uppercase tracking-widest">
            Trophies of Valor
          </h1>
          <p className="text-muted-foreground mb-8">Prove your worth across the lands.</p>
          
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-xs font-mono text-primary mb-2 uppercase">
              <span>Progress</span>
              <span>{unlockedCount} / {total}</span>
            </div>
            <div className="h-2 w-full bg-card border border-border/50 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((acc, idx) => (
            <motion.div
              key={acc.id}
              className={`flex items-start gap-4 p-6 border ${acc.unlocked ? 'bg-card border-primary/50' : 'bg-background border-border/20 grayscale opacity-70'} transition-all`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-full border ${acc.unlocked ? 'border-primary bg-primary/10 text-primary box-glow-gold' : 'border-muted text-muted-foreground'}`}>
                {acc.unlocked ? <Trophy size={20} /> : <Lock size={20} />}
              </div>
              <div>
                <h3 className={`font-serif text-lg mb-1 ${acc.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>{acc.title}</h3>
                <p className="text-sm text-muted-foreground">{acc.desc}</p>
                {acc.unlocked && (
                  <span className="text-[10px] uppercase tracking-widest text-primary mt-2 block">Unlocked</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
