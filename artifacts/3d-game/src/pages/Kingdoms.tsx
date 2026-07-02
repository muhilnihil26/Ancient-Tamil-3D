import { motion } from 'framer-motion';
import cholaImg from '@assets/kingdom-chola.jpg';
import pandyaImg from '@assets/kingdom-pandya.jpg';
import cheraImg from '@assets/kingdom-chera.jpg';

export default function Kingdoms() {
  const kingdoms = [
    {
      id: "chola",
      name: "Chola Empire",
      title: "Masters of the Sea",
      color: "from-blue-900",
      accent: "text-blue-400",
      img: cholaImg,
      army: "200,000",
      resource: "Spices & Gold",
      special: "Naval Superiority",
      desc: "Rulers of the eastern coast, possessing the most formidable navy in the ancient world. Their wealth is unmatched, and their architecture reaches the heavens."
    },
    {
      id: "pandya",
      name: "Pandya Kingdom",
      title: "Traders & Scholars",
      color: "from-emerald-900",
      accent: "text-emerald-400",
      img: pandyaImg,
      army: "150,000",
      resource: "Pearls & Ivory",
      special: "Ancient Knowledge",
      desc: "The oldest of the three, masters of trade and keepers of the ancient Sangam academies. They hold the deep secrets of Tamilakam."
    },
    {
      id: "chera",
      name: "Chera Dynasty",
      title: "Mountain Warriors",
      color: "from-red-900",
      accent: "text-red-400",
      img: cheraImg,
      army: "180,000",
      resource: "Timber & Iron",
      special: "Highland Fortresses",
      desc: "Fierce warriors who rule the western mountains. Their fortresses are impenetrable, and their iron weapons are feared across the lands."
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 noise-bg">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-4xl md:text-6xl text-primary text-glow-gold mb-4 uppercase tracking-widest">
            The Three Crowns
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">The Moovendar - the ancient ruling dynasties of Tamilakam.</p>
        </motion.div>

        <div className="space-y-32">
          {kingdoms.map((k, idx) => (
            <motion.div 
              key={k.id}
              className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-video overflow-hidden border border-primary/30 box-glow-gold">
                  <img src={k.img} alt={k.name} className="w-full h-full object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${k.color} to-transparent mix-blend-multiply`} />
                </div>
              </div>
              
              <div className="w-full lg:w-1/2">
                <h4 className={`font-serif text-xl ${k.accent} italic mb-2`}>{k.title}</h4>
                <h2 className="font-serif text-5xl text-foreground uppercase tracking-widest mb-6">{k.name}</h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{k.desc}</p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-card p-4 border border-border/20">
                    <div className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Army Size</div>
                    <div className="text-2xl font-serif text-foreground">{k.army}</div>
                  </div>
                  <div className="bg-card p-4 border border-border/20">
                    <div className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Key Resource</div>
                    <div className="text-2xl font-serif text-foreground">{k.resource}</div>
                  </div>
                  <div className="col-span-2 bg-card p-4 border border-primary/30 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                    <div className="relative z-10">
                      <div className="text-sm text-primary uppercase tracking-widest mb-1">Special Ability</div>
                      <div className="text-2xl font-serif text-foreground">{k.special}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map Section */}
        <motion.div 
          className="mt-40 bg-card border border-primary/20 p-8 md:p-16 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12 relative z-10">
            <h3 className="font-serif text-4xl text-primary mb-4">Map of Tamilakam</h3>
            <p className="text-muted-foreground">Strategic territories of the ancient era.</p>
          </div>
          
          <div className="relative max-w-2xl mx-auto h-[500px] flex justify-center items-center">
            {/* Stylized SVG Map of South India */}
            <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-2xl">
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="borderGlow">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#D4AF37" floodOpacity="0.8"/>
                </filter>
              </defs>
              
              {/* Ocean BG */}
              <path d="M0 0 H400 V500 H0 Z" fill="hsl(var(--background))" />
              
              {/* Landmass Base (Teardrop shape for South India) */}
              <path d="M100 50 Q 300 50 350 200 Q 380 350 200 480 Q 50 400 20 250 Q 50 80 100 50 Z" fill="#1a1510" stroke="hsl(var(--primary))" strokeWidth="2" filter="url(#glow)" />
              
              {/* Chola Territory (Top Right / Coromandel Coast) */}
              <path d="M200 150 Q 300 100 340 200 Q 360 280 280 300 Q 200 300 200 150 Z" fill="#D4AF37" fillOpacity="0.3" stroke="#D4AF37" strokeWidth="1.5" className="hover:fill-opacity-50 transition-all cursor-pointer hover:stroke-[3px]" style={{ filter: 'url(#borderGlow)' }} />
              <circle cx="280" cy="220" r="5" fill="#D4AF37" className="animate-pulse" />
              <text x="295" y="225" fill="#D4AF37" fontSize="12" className="font-serif uppercase font-bold text-glow-gold">Thanjavur</text>
              <text x="295" y="240" fill="#D4AF37" fontSize="10" opacity="0.8">தஞ்சாவூர்</text>

              {/* Pandya Territory (Bottom South) */}
              <path d="M150 280 Q 280 300 270 380 Q 200 480 150 430 Q 120 350 150 280 Z" fill="#34d399" fillOpacity="0.3" stroke="#34d399" strokeWidth="1.5" className="hover:fill-opacity-50 transition-all cursor-pointer hover:stroke-[3px]" style={{ filter: 'url(#borderGlow)' }} />
              <circle cx="200" cy="380" r="5" fill="#34d399" className="animate-pulse" />
              <text x="215" y="385" fill="#34d399" fontSize="12" className="font-serif uppercase font-bold drop-shadow-md">Madurai</text>
              <text x="215" y="400" fill="#34d399" fontSize="10" opacity="0.8">மதுரை</text>

              {/* Chera Territory (Left / Malabar Coast) */}
              <path d="M100 150 Q 200 150 150 280 Q 120 350 100 400 Q 40 300 60 200 Q 80 150 100 150 Z" fill="#f87171" fillOpacity="0.3" stroke="#f87171" strokeWidth="1.5" className="hover:fill-opacity-50 transition-all cursor-pointer hover:stroke-[3px]" style={{ filter: 'url(#borderGlow)' }} />
              <circle cx="100" cy="260" r="5" fill="#f87171" className="animate-pulse" />
              <text x="30" y="265" fill="#f87171" fontSize="12" className="font-serif uppercase font-bold drop-shadow-md">Vanji</text>
              <text x="50" y="280" fill="#f87171" fontSize="10" opacity="0.8">வஞ்சி</text>
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
