import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import veeranImg from '@assets/char-veeran.jpg';
import arulmozhiImg from '@assets/char-arulmozhi.jpg';
import vennilaImg from '@assets/char-vennila.jpg';
import athiyanImg from '@assets/char-athiyan.jpg';
import agathiyanImg from '@assets/char-agathiyan.jpg';
import irulanImg from '@assets/char-irulan.jpg';
import { X } from 'lucide-react';

const characters = [
  { id: 'veeran', name: 'Veeran', role: 'Kingdom Protector', tier: 'gold', border: 'border-yellow-500', shadow: 'shadow-yellow-500/50', img: veeranImg, stats: { strength: 80, speed: 90, magic: 40 }, skills: ['Sword Mastery', 'Agility', 'Willpower'], desc: 'The chosen guardian of Tamilakam. A humble warrior whose destiny was rewritten by the gods.' },
  { id: 'arulmozhi', name: 'King Arulmozhi', role: 'Chola Ruler', tier: 'emerald', border: 'border-emerald-500', shadow: 'shadow-emerald-500/50', img: arulmozhiImg, stats: { strength: 85, speed: 70, magic: 60 }, skills: ['Naval Command', 'Royal Decree', 'Spear Combat'], desc: 'The majestic ruler of the Chola Empire. Wise, tactical, and fiercely protective of his people.' },
  { id: 'vennila', name: 'Queen Vennila', role: 'Strategic Mastermind', tier: 'silver', border: 'border-slate-300', shadow: 'shadow-slate-300/50', img: vennilaImg, stats: { strength: 60, speed: 95, magic: 50 }, skills: ['Archery', 'Diplomacy', 'Stealth'], desc: 'A brilliant tactician whose arrows never miss. She commands the hidden forces of the kingdoms.' },
  { id: 'athiyan', name: 'General Athiyan', role: 'War Commander', tier: 'bronze', border: 'border-orange-600', shadow: 'shadow-orange-600/50', img: athiyanImg, stats: { strength: 95, speed: 50, magic: 30 }, skills: ['Heavy Axe', 'Battle Cry', 'Fortitude'], desc: 'A battle-hardened veteran. His war cries can break the morale of an entire enemy battalion.' },
  { id: 'agathiyan', name: 'Sage Agathiyan', role: 'Ancient Mystic', tier: 'purple', border: 'border-purple-500', shadow: 'shadow-purple-500/50', img: agathiyanImg, stats: { strength: 40, speed: 50, magic: 100 }, skills: ['Ancient Magic', 'Healing', 'Prophecy'], desc: 'A mysterious sage possessing the lost knowledge of the ancient Tamil siddhas.' },
  { id: 'irulan', name: 'Dark King Irulan', role: 'Abyssal Lord', tier: 'red', border: 'border-red-600', shadow: 'shadow-red-600/50', img: irulanImg, stats: { strength: 90, speed: 85, magic: 95 }, skills: ['Shadow Magic', 'Necromancy', 'Terror'], desc: 'An ancient evil awoken from the deep south. He seeks to plunge Tamilakam into eternal darkness.' },
];

export default function Characters() {
  const [selectedChar, setSelectedChar] = useState<typeof characters[0] | null>(null);

  return (
    <div className="min-h-screen pt-32 pb-24 noise-bg">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-4xl md:text-6xl text-primary text-glow-gold mb-4 uppercase tracking-widest">
            Heroes & Villains
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">The fate of Tamilakam rests in the hands of these legendary figures.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {characters.map((char, idx) => (
            <motion.div
              key={char.id}
              className={`relative bg-card border-2 ${char.border} cursor-pointer group overflow-hidden ${char.id === 'irulan' ? 'animate-pulse-gold !shadow-red-600/50' : ''}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
              transition={{ 
                opacity: { delay: idx * 0.1 },
                scale: { delay: idx * 0.1 },
                y: { repeat: Infinity, duration: 4, delay: idx * 0.2, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.02, boxShadow: `0 20px 25px -5px var(--tw-shadow-color)` }}
              onClick={() => setSelectedChar(char)}
              style={{ '--tw-shadow-color': `var(--color-${char.border.split('-')[1]})` } as any}
            >
              {/* Radial gradient halo */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-${char.border.split('-')[1]}-500 via-transparent to-transparent`} />
              
              <div className="aspect-[3/4] relative">
                <img src={char.img} alt={char.name} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                
                {/* Class Badge Ribbon */}
                <div className={`absolute top-4 right-[-30px] w-[150px] text-center rotate-45 py-1 text-[10px] font-black tracking-widest uppercase bg-${char.border.split('-')[1]}-500 text-black shadow-lg z-10`}>
                  {char.role.split(' ')[1] || char.role}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="font-serif text-2xl text-foreground font-bold uppercase tracking-wider text-glow-gold">{char.name}</h3>
                  <p className={`text-sm uppercase tracking-widest mt-1 text-${char.border.split('-')[1]}-400`}>{char.role}</p>
                  
                  {/* Skill Bars */}
                  <div className="mt-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase w-16 text-muted-foreground">STR</span>
                      <div className="h-1 bg-background flex-1 overflow-hidden"><div className={`h-full bg-${char.border.split('-')[1]}-500`} style={{ width: `${char.stats.strength}%`, transition: 'width 1s ease-out' }} /></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase w-16 text-muted-foreground">SPD</span>
                      <div className="h-1 bg-background flex-1 overflow-hidden"><div className={`h-full bg-${char.border.split('-')[1]}-500`} style={{ width: `${char.stats.speed}%`, transition: 'width 1s ease-out 0.2s' }} /></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase w-16 text-muted-foreground">MAG</span>
                      <div className="h-1 bg-background flex-1 overflow-hidden"><div className={`h-full bg-${char.border.split('-')[1]}-500`} style={{ width: `${char.stats.magic}%`, transition: 'width 1s ease-out 0.4s' }} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedChar && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0" onClick={() => setSelectedChar(null)} />
            <motion.div
              className={`relative bg-card w-full max-w-4xl border-2 ${selectedChar.border} ${selectedChar.shadow} shadow-2xl flex flex-col md:flex-row overflow-hidden`}
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
            >
              <button 
                className="absolute top-4 right-4 z-10 text-foreground hover:text-primary bg-background/50 p-2 rounded-full"
                onClick={() => setSelectedChar(null)}
              >
                <X size={24} />
              </button>
              
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto h-[40vh] md:h-[60vh]">
                <img src={selectedChar.img} alt={selectedChar.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest border ${selectedChar.border} w-max mb-4`}>
                  {selectedChar.tier} Tier
                </div>
                <h2 className="font-serif text-4xl text-foreground font-bold uppercase tracking-widest mb-2">{selectedChar.name}</h2>
                <p className="text-xl text-muted-foreground font-serif italic mb-6">{selectedChar.role}</p>
                
                <p className="text-foreground leading-relaxed mb-8">{selectedChar.desc}</p>
                
                <div>
                  <h4 className="font-serif text-lg uppercase tracking-wider mb-4 border-b border-border pb-2">Combat Skills</h4>
                  <ul className="space-y-3">
                    {selectedChar.skills.map(skill => (
                      <li key={skill} className="flex items-center gap-3">
                        <div className={`w-2 h-2 ${selectedChar.border.replace('border-', 'bg-')} rotate-45`} />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
