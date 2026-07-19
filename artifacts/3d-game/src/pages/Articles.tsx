import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useAdmin } from '@/context/AdminContext';
import { useState } from 'react';
import coming2031Banner from '@assets/coming_2031_banner.jpg';
import article1 from '@assets/article_1_vision.jpg';
import article2 from '@assets/article_2_tech.jpg';
import article3 from '@assets/article_3_gameplay.jpg';
import article4 from '@assets/article_4_culture.jpg';
import article5 from '@assets/article_5_tech.jpg';
import article6 from '@assets/article_6_culture.jpg';
import gallery1 from '@assets/gallery-1.jpg';
import gallery2 from '@assets/gallery-2.jpg';
import gallery3 from '@assets/gallery-3.jpg';
import gallery4 from '@assets/gallery-4.jpg';
import gallery5 from '@assets/gallery-5.jpg';
import gallery6 from '@assets/gallery-6.jpg';
import gallery7 from '@assets/gallery-7.jpg';
import gallery8 from '@assets/gallery-8.jpg';

const CATEGORIES = ['All', 'Vision', 'Tech', 'Gameplay', 'Culture', 'Art'];

const staticArticles = [
  {
    id: 'vision-2031',
    title: '2031: The Year Veera Yugam Rises',
    category: 'Vision',
    date: 'March 2031',
    author: 'Muhil Siddhesh',
    excerpt: 'Our commitment to delivering a generational masterpiece requires time. Here is why 2031 will change gaming forever.',
    image: article1,
    readTime: '5 min',
  },
  {
    id: 'building-tamilakam',
    title: 'Building the Ancient Tamil World at Scale',
    category: 'Tech',
    date: 'February 2031',
    author: 'Warrior Developers',
    excerpt: 'A deep dive into our custom procedural generation tools for authentic Chola architecture and Western Ghats terrain.',
    image: article2,
    readTime: '8 min',
  },
  {
    id: 'silambam-mocap',
    title: 'Silambam & Kalari: Motion-Capture Mastery',
    category: 'Gameplay',
    date: 'January 2031',
    author: 'Warrior Developers',
    excerpt: 'We worked with grandmasters across Tamil Nadu and Kerala to digitise 1,000+ authentic martial arts sequences.',
    image: article3,
    readTime: '6 min',
  },
  {
    id: 'voice-of-moovendar',
    title: 'The Voice of the Moovendar: Language Design',
    category: 'Culture',
    date: 'December 2030',
    author: 'Warrior Developers',
    excerpt: 'Reconstructing Old Tamil dialects to ensure every NPC speaks with historical accuracy and profound emotion.',
    image: article4,
    readTime: '7 min',
  },
  {
    id: 'open-world-scale',
    title: 'From Prototype to 100km² Open World',
    category: 'Tech',
    date: 'November 2030',
    author: 'Warrior Developers',
    excerpt: 'How we transitioned from a small arena to a massive continuous world without a single loading screen.',
    image: article5,
    readTime: '10 min',
  },
  {
    id: 'tamil-history-aaa',
    title: 'Why Tamil History Deserves AAA Games',
    category: 'Culture',
    date: 'October 2030',
    author: 'Muhil Siddhesh',
    excerpt: 'A reflection on cultural representation in media and the untapped potential of Indian epics in interactive storytelling.',
    image: article6,
    readTime: '6 min',
  },
  {
    id: 'music-ancients',
    title: 'Music of the Ancients: Composing for Tamilakam',
    category: 'Art',
    date: 'September 2030',
    author: 'Warrior Developers',
    excerpt: 'How our composers blended classical Carnatic instruments — veena, mridangam, and nadaswaram — with a cinematic epic orchestral score.',
    image: gallery1,
    readTime: '5 min',
  },
  {
    id: 'character-design',
    title: 'Character Design: Authentic Warriors of 900 CE',
    category: 'Art',
    date: 'August 2030',
    author: 'Warrior Developers',
    excerpt: 'Designing six playable characters with historically accurate armour, weapons, and physiognomy based on Sangam literature and sculptures.',
    image: gallery2,
    readTime: '9 min',
  },
  {
    id: 'physics-battles',
    title: 'The Physics Engine Behind Epic Battle Scenes',
    category: 'Tech',
    date: 'July 2030',
    author: 'Warrior Developers',
    excerpt: 'Simulating 10,000 warriors with individual AI, physics-based collision, and dynamic formation logic — all at 60 fps.',
    image: gallery3,
    readTime: '12 min',
  },
  {
    id: 'brihadeeswarar-3d',
    title: 'Rebuilding Brihadeeswarar Temple in Real-Time 3D',
    category: 'Art',
    date: 'June 2030',
    author: 'Warrior Developers',
    excerpt: 'Two years of archaeological research, 3D scanning, and photogrammetry culminated in the most detailed digital recreation of the Great Temple.',
    image: gallery4,
    readTime: '11 min',
  },
  {
    id: 'warrior-developers-story',
    title: 'Warrior Developers: Our Story So Far',
    category: 'Vision',
    date: 'May 2030',
    author: 'Muhil Siddhesh',
    excerpt: 'From a teenager\'s sketch in a Tamil Nadu village to a globally recognised indie studio — the founding story of Warrior Developers.',
    image: gallery5,
    readTime: '8 min',
  },
  {
    id: 'tamil-language-gaming',
    title: 'The Tamil Language Challenge in Modern Gaming',
    category: 'Culture',
    date: 'April 2030',
    author: 'Warrior Developers',
    excerpt: 'Adapting classical Tamil script for modern UI/UX, keyboard input, and dynamic text rendering across 16:9 and mobile screens.',
    image: gallery6,
    readTime: '7 min',
  },
  {
    id: 'naval-combat',
    title: 'Naval Warfare: Chola Sea Battles Reimagined',
    category: 'Gameplay',
    date: 'March 2030',
    author: 'Warrior Developers',
    excerpt: 'The Chola navy was the greatest in the ancient world. Our naval combat system honours their legacy with oceanic physics and boarding mechanics.',
    image: gallery7,
    readTime: '8 min',
  },
  {
    id: 'ai-npcs',
    title: 'Living World: AI-Driven NPCs of Ancient Tamilakam',
    category: 'Tech',
    date: 'February 2030',
    author: 'Warrior Developers',
    excerpt: 'Every merchant, soldier, and civilian in Veera Yugam has their own daily routine, memory, and emotional state — powered by our custom AI.',
    image: gallery8,
    readTime: '9 min',
  },
];

export default function Articles() {
  const { adminArticles } = useAdmin();
  const [activeCategory, setActiveCategory] = useState('All');

  const adminCards = adminArticles.map(a => ({
    id: a.id, title: a.title, category: a.category, date: a.date, author: a.author,
    excerpt: a.excerpt, image: coming2031Banner, readTime: '3 min',
  }));

  const allArticles = [...adminCards, ...staticArticles];

  const filtered = activeCategory === 'All' ? allArticles : allArticles.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen pt-20 pb-24 noise-bg bg-background">
      {/* Hero Banner */}
      <div className="relative w-full h-[45vh] md:h-[55vh] overflow-hidden mb-16 border-b border-primary/30">
        <img src={coming2031Banner} alt="Chronicles of Tamilakam" className="w-full h-full object-cover object-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <motion.p className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-4"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Warrior Developers · Development Blog
          </motion.p>
          <motion.h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary tracking-widest text-glow-gold mb-4"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            CHRONICLES OF TAMILAKAM
          </motion.h1>
          <motion.p className="text-foreground text-base md:text-xl uppercase tracking-[0.2em] font-medium"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
            The Journey to 2031 · {allArticles.length} Articles
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap justify-center mb-12">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`min-h-[40px] px-4 py-2 text-xs uppercase tracking-widest font-bold border transition-all ${activeCategory === cat ? 'border-primary bg-primary/10 text-primary' : 'border-border/30 text-muted-foreground hover:border-primary/40 hover:text-foreground'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((article, idx) => (
            <motion.article key={article.id}
              className="bg-card border border-border/30 group flex flex-col h-full overflow-hidden hover:border-primary/50 transition-all box-glow-gold-hover"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.08 }} whileHover={{ y: -4 }}>
              <div className="aspect-[16/9] overflow-hidden relative border-b border-border/30">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 left-3 bg-background/80 backdrop-blur px-2.5 py-1 border border-primary/50 text-[10px] font-bold text-primary uppercase tracking-widest">
                  {article.category}
                </div>
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur px-2 py-0.5 text-[10px] text-white/80 uppercase tracking-wider">
                  {article.readTime}
                </div>
              </div>
              <div className="p-5 md:p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-3 text-[10px] md:text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  <span>{article.date}</span>
                  <span>By {article.author}</span>
                </div>
                <h3 className="font-serif text-lg md:text-xl text-foreground font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                  {article.title}
                </h3>
                <p className="text-muted-foreground mb-6 flex-grow text-sm leading-relaxed">{article.excerpt}</p>
                <Link href={`/articles/${article.id}`}
                  className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-foreground group-hover:text-primary transition-colors w-max mt-auto min-h-[36px]">
                  Read Chronicle <span className="ml-2 group-hover:translate-x-2 transition-transform inline-block">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
