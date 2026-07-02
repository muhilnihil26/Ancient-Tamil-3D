import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const posts = [
  { id: 1, cat: "Development", title: "Gameplay mechanics revealed — Combat system deep dive", excerpt: "An in-depth look at how we integrated ancient martial arts into our real-time combat engine.", date: "2 days ago" },
  { id: 2, cat: "World", title: "Kingdoms map finalized — Explore all three Tamil kingdoms", excerpt: "Our terrain generation is complete. Players can now seamlessly travel from Madurai to Thanjavur.", date: "1 week ago" },
  { id: 3, cat: "Characters", title: "Character spotlight: Veeran's backstory", excerpt: "Who is the man behind the legendary sword? We explore the humble beginnings of our hero.", date: "2 weeks ago" },
  { id: 4, cat: "World", title: "Open world scope announced — 50km² playable area", excerpt: "Scale is everything. We are pushing our engine to deliver a massive, zero-loading-screen world.", date: "1 month ago" },
  { id: 5, cat: "Studio", title: "Warrior Developers team expands to 40 members", excerpt: "We've hired top talent from around the globe to bring Tamil history to life.", date: "2 months ago" },
  { id: 6, cat: "Development", title: "Veera Yugam — behind the scenes", excerpt: "Motion capture sessions for the traditional silambam and kalari sequences.", date: "3 months ago" },
];

const categories = ["All", "Development", "Characters", "World", "Studio"];

export default function News() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredPosts = activeFilter === "All" ? posts : posts.filter(p => p.cat === activeFilter);

  return (
    <div className="min-h-screen pt-32 pb-24 noise-bg">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-border/50 pb-6 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl text-primary uppercase tracking-widest">Chronicles</h1>
            <p className="text-muted-foreground mt-2">Latest updates from the Warrior Developers.</p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-sm uppercase tracking-widest transition-colors border ${
                  activeFilter === cat 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.article 
              key={post.id}
              className="bg-card border border-border/30 p-8 hover:border-primary/50 transition-all group flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-primary uppercase tracking-widest border border-primary/30 px-3 py-1">
                  {post.cat}
                </span>
                <span className="text-sm font-mono text-muted-foreground">{post.date}</span>
              </div>
              
              <h3 className="font-serif text-2xl text-foreground font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                {post.title}
              </h3>
              
              <p className="text-muted-foreground mb-8 flex-grow">
                {post.excerpt}
              </p>
              
              <Link href={`/news/${post.id}`} className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-foreground group-hover:text-primary transition-colors w-max">
                Read More <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            </motion.article>
          ))}
          
          {filteredPosts.length === 0 && (
            <div className="col-span-1 md:col-span-2 text-center py-20 text-muted-foreground">
              No transmission logs found for this sector.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
