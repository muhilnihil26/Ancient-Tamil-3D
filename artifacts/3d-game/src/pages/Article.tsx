import { motion } from 'framer-motion';
import { Link, useParams } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import coming2031Banner from '@assets/coming_2031_banner.jpg';
import article1 from '@assets/article_1_vision.jpg';
import article2 from '@assets/article_2_tech.jpg';
import article3 from '@assets/article_3_gameplay.jpg';
import article4 from '@assets/article_4_culture.jpg';
import article5 from '@assets/article_5_tech.jpg';
import article6 from '@assets/article_6_culture.jpg';

const staticArticles = [
  {
    id: 'vision-2031',
    title: '2031: The Year Veera Yugam Rises',
    category: 'Vision',
    date: 'March 2031',
    author: 'Warrior Developers',
    image: article1,
    content: [
      'The year 2031 is not a release date. It is a promise.',
      'Veera Yugam has been in development for years, but the ambition has always been larger than the team. We are building a living, breathing Tamilakam — a world where every stone, every dialect, and every sword swing carries the weight of history.',
      'Why 2031? Because greatness cannot be rushed. Between now and then, we will release multiple public demos, behind-the-scenes documentaries, and early community builds. By 2031, Veera Yugam will not just be a game; it will be a monument to Tamil pride in interactive form.',
      'Join us on this journey. The Chola drums are beginning to sound.'
    ]
  },
  {
    id: 'building-tamilakam',
    title: 'Building the Ancient Tamil World at Scale',
    category: 'Tech',
    date: 'February 2031',
    author: 'Warrior Developers',
    image: article2,
    content: [
      'Recreating the Chola, Pandya, and Chera kingdoms in AAA fidelity requires more than art — it requires procedural intelligence.',
      'Our terrain team spent years studying satellite elevation data of the Kaveri delta, the Western Ghats, and the Coromandel coast. We then built a custom procedural engine that generates authentic South Indian geography while preserving hand-crafted landmarks like the Brihadeeswarar temple, the Vaigai river, and the ancient ports of Kaveripoompattinam.',
      'The result is a seamless, loading-screen-free world that spans hundreds of square kilometers. Every village is placed where a real village might have existed. Every trade route follows the old salt roads.',
      'When you ride a horse from Thanjavur to Madurai, you are not just traveling through a map. You are traveling through time.'
    ]
  },
  {
    id: 'silambam-mocap',
    title: 'Silambam & Kalari: Motion-Capture Mastery',
    category: 'Gameplay',
    date: 'January 2031',
    author: 'Warrior Developers',
    image: article3,
    content: [
      'Combat in Veera Yugam is grounded. We refused to settle for fantasy sword swings.',
      'Over the past year, our team worked with Silambam and Kalaripayattu masters across Tamil Nadu and Kerala. Using a state-of-the-art motion-capture stage, we digitized more than one thousand authentic martial arts sequences.',
      'Each weapon type — sword, spear, dagger, urumi, and shield — has a distinct moveset derived from real techniques. Stances, blocks, dodges, and finishers all flow from the same principles taught in traditional South Indian martial schools.',
      'This is not just combat. It is choreography of war.'
    ]
  },
  {
    id: 'voice-of-moovendar',
    title: 'The Voice of the Moovendar: Language Design',
    category: 'Culture',
    date: 'December 2030',
    author: 'Warrior Developers',
    image: article4,
    content: [
      'Language is memory. If Veera Yugam is to honor Tamil history, its people must speak like they lived then.',
      'Our narrative team collaborated with linguists to reconstruct Old Tamil dialects for different regions, castes, and social classes. A Chola courtier speaks differently from a Pandyan farmer or a Chera trader.',
      'We also recorded dialogue in modern Tamil, English, and subtitled options, ensuring accessibility without sacrificing authenticity. Every voice actor was chosen for their ability to deliver emotion first, then period accent.',
      'When you hear the Moovendar speak, you are hearing echoes of the past.'
    ]
  },
  {
    id: 'open-world-scale',
    title: 'From Prototype to 100km² Open World',
    category: 'Tech',
    date: 'November 2030',
    author: 'Warrior Developers',
    image: article5,
    content: [
      'Veera Yugam began as a small arena combat prototype. Today, it is a single continuous world with no loading screens.',
      'The engineering challenge was enormous: stream massive terrain, thousands of NPCs, dynamic weather, and day-night cycles while keeping frame rates stable. We built a custom level-of-detail system that preserves visual fidelity up close and performance at distance.',
      'Cities are not set pieces. They are systems. Traders travel, guards patrol, festivals begin, and battles flare based on the world state. The world remembers what you do.',
      'This is not an open world. It is a living civilization.'
    ]
  },
  {
    id: 'tamil-history-aaa',
    title: 'Why Tamil History Deserves AAA Games',
    category: 'Culture',
    date: 'October 2030',
    author: 'Warrior Developers',
    image: article6,
    content: [
      'Tamil history contains everything a AAA game needs: epic wars, brilliant kings, complex politics, maritime empires, and timeless poetry.',
      'Yet the global gaming industry has barely touched this treasure. We are changing that. Veera Yugam is not an adaptation of a foreign template; it is built from the soil of Tamilakam outward.',
      'Our design philosophy is simple: respect the source. Every kingdom, every battle, every legend is researched. We consult historians, archaeologists, and Tamil scholars before anything is committed to the game.',
      'This is our love letter to Tamil civilization. We hope it becomes yours too.'
    ]
  }
];

export default function Article() {
  const { id } = useParams<{ id: string }>();
  const { adminArticles } = useAdmin();

  const adminArticle = adminArticles.find(a => a.id === id);
  const staticArticle = staticArticles.find(a => a.id === id);
  const article = staticArticle || (adminArticle ? {
    ...adminArticle,
    image: coming2031Banner,
  } : null);

  if (!article) {
    return (
      <div className="min-h-screen pt-32 pb-24 noise-bg flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-serif text-4xl text-primary mb-4">Chronicle Not Found</h1>
        <p className="text-muted-foreground mb-8">The scroll you are looking for has been lost to time.</p>
        <Link href="/articles" className="text-primary uppercase tracking-widest font-bold hover:underline">
          ← Back to Chronicles
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24 noise-bg">
      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden border-b border-primary/30">
        <img src={article.image || coming2031Banner} alt={article.title} className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-4 pb-12">
          <span className="text-primary uppercase tracking-[0.3em] text-xs font-bold mb-4 border border-primary/30 px-3 py-1">{article.category} · {article.date}</span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary tracking-widest text-glow-gold max-w-5xl">
            {article.title}
          </h1>
          <p className="text-muted-foreground mt-4 uppercase tracking-widest text-sm">By {article.author}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          {article.content.map((paragraph, idx) => (
            <p key={idx} className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8 first-letter:text-5xl first-letter:font-serif first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-[-4px]">
              {paragraph}
            </p>
          ))}
        </motion.div>

        <div className="mt-16 pt-8 border-t border-border/30 flex justify-between items-center">
          <Link href="/articles" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors">
            <ArrowLeft size={18} className="mr-2" /> Back to Chronicles
          </Link>
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Warrior Developers · 2031</span>
        </div>
      </div>
    </div>
  );
}
