import { motion } from 'framer-motion';
import { Link } from 'wouter';
import coming2031Banner from '@assets/coming_2031_banner.jpg';
import article1 from '@assets/article_1_vision.jpg';
import article2 from '@assets/article_2_tech.jpg';
import article3 from '@assets/article_3_gameplay.jpg';
import article4 from '@assets/article_4_culture.jpg';
import article5 from '@assets/article_5_tech.jpg';
import article6 from '@assets/article_6_culture.jpg';

const articles = [
  {
    id: 'vision-2031',
    title: '2031: The Year Veera Yugam Rises',
    category: 'Vision',
    date: 'March 2031',
    author: 'Warrior Developers',
    excerpt: 'Our commitment to delivering a generational masterpiece requires time. Here is why 2031 will change gaming.',
    image: article1
  },
  {
    id: 'building-tamilakam',
    title: 'Building the Ancient Tamil World at Scale',
    category: 'Tech',
    date: 'February 2031',
    author: 'Warrior Developers',
    excerpt: 'A deep dive into our custom procedural generation tools for authentic Chola architecture and Western Ghats terrain.',
    image: article2
  },
  {
    id: 'silambam-mocap',
    title: 'Silambam & Kalari: Motion-Capture Mastery',
    category: 'Gameplay',
    date: 'January 2031',
    author: 'Warrior Developers',
    excerpt: 'We worked with grandmasters across Tamil Nadu and Kerala to digitize 1000+ authentic martial arts sequences.',
    image: article3
  },
  {
    id: 'voice-of-moovendar',
    title: 'The Voice of the Moovendar: Language Design',
    category: 'Culture',
    date: 'December 2030',
    author: 'Warrior Developers',
    excerpt: 'Reconstructing Old Tamil dialects to ensure every NPC speaks with historical accuracy and profound emotion.',
    image: article4
  },
  {
    id: 'open-world-scale',
    title: 'From Prototype to 100km² Open World',
    category: 'Tech',
    date: 'November 2030',
    author: 'Warrior Developers',
    excerpt: 'How we transitioned from a small arena to a massive continuous world without a single loading screen.',
    image: article5
  },
  {
    id: 'tamil-history-aaa',
    title: 'Why Tamil History Deserves AAA Games',
    category: 'Culture',
    date: 'October 2030',
    author: 'Warrior Developers',
    excerpt: 'A reflection on cultural representation in media and the untapped potential of Indian epics.',
    image: article6
  }
];

export default function Articles() {
  return (
    <div className="min-h-screen pt-20 pb-24 noise-bg bg-background">
      
      {/* Hero Banner */}
      <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden mb-16 border-b border-primary/30">
        {coming2031Banner ? (
          <img src={coming2031Banner} alt="Coming 2031 Banner" className="w-full h-full object-cover object-center opacity-40" />
        ) : (
          <div className="w-full h-full bg-card" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <motion.h1 
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary tracking-widest text-glow-gold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            CHRONICLES OF TAMILAKAM
          </motion.h1>
          <motion.p
            className="text-foreground text-lg md:text-xl uppercase tracking-[0.3em] font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            The Journey to 2031
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <motion.article 
              key={article.id}
              className="bg-card border border-border/30 group flex flex-col h-full overflow-hidden hover:border-primary/50 transition-all box-glow-gold-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="aspect-[16/9] overflow-hidden relative border-b border-border/30">
                {article.image ? (
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full bg-background/50 flex items-center justify-center font-serif text-primary/30">Image Pending</div>
                )}
                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur px-3 py-1 border border-primary/50 text-xs font-bold text-primary uppercase tracking-widest">
                  {article.category}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-4 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  <span>{article.date}</span>
                  <span>By {article.author}</span>
                </div>
                
                <h3 className="font-serif text-xl md:text-2xl text-foreground font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                  {article.title}
                </h3>
                
                <p className="text-muted-foreground mb-8 flex-grow text-sm leading-relaxed">
                  {article.excerpt}
                </p>
                
                <Link href={`/articles/${article.id}`} className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-foreground group-hover:text-primary transition-colors w-max mt-auto">
                  Read Transcripts <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}