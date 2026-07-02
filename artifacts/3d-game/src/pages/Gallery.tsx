import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import g1 from '@assets/gallery-1.jpg';
import g2 from '@assets/gallery-2.jpg';
import g3 from '@assets/gallery-3.jpg';
import g4 from '@assets/gallery-4.jpg';
import g5 from '@assets/gallery-5.jpg';
import g6 from '@assets/gallery-6.jpg';
import g7 from '@assets/gallery-7.jpg';
import g8 from '@assets/gallery-8.jpg';

const images = [
  { src: g1, alt: "Ancient Chola palace interior" },
  { src: g2, alt: "Battle scene with thousands of warriors" },
  { src: g3, alt: "A warrior at sunset near Thanjavur temple" },
  { src: g4, alt: "Sea battle with Chola navy" },
  { src: g5, alt: "Dark forest with glowing runes" },
  { src: g6, alt: "Villain's dark fortress" },
  { src: g7, alt: "An ancient map room" },
  { src: g8, alt: "A warrior duel on a cliff" },
];

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === 'ArrowRight') nextImg();
      if (e.key === 'ArrowLeft') prevImg();
      if (e.key === 'Escape') setLightboxIdx(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIdx]);

  const nextImg = () => {
    if (lightboxIdx !== null) {
      setLightboxIdx((lightboxIdx + 1) % images.length);
    }
  };

  const prevImg = () => {
    if (lightboxIdx !== null) {
      setLightboxIdx((lightboxIdx - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 noise-bg">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-serif text-4xl md:text-6xl text-primary text-glow-gold mb-4 uppercase tracking-widest">
            Glimpses of Tamilakam
          </h1>
          <p className="text-muted-foreground">Witness the breathtaking vistas and brutal warfare.</p>
        </motion.div>

        {/* Masonry/Grid Gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
          {images.map((img, idx) => {
            return (
              <motion.div
                key={idx}
                className="relative overflow-hidden group cursor-pointer border border-primary/20 hover:border-primary transition-colors mb-4 break-inside-avoid rounded-sm shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 4) * 0.1 }}
                onClick={() => setLightboxIdx(idx)}
              >
                <motion.div className="w-full h-full" style={{ y }}>
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-auto object-cover scale-[1.2] transition-transform duration-700 group-hover:scale-[1.25]" 
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-primary font-serif uppercase tracking-widest text-lg font-bold drop-shadow-md">
                    {img.alt}
                  </span>
                  <div className="mt-2 w-8 h-1 bg-primary box-glow-gold transition-all duration-500 origin-left group-hover:scale-x-100 scale-x-0" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button 
              className="absolute top-6 right-6 text-foreground hover:text-primary z-50 transition-colors"
              onClick={() => setLightboxIdx(null)}
            >
              <X size={40} />
            </button>
            
            <button 
              className="absolute left-4 md:left-12 text-foreground hover:text-primary z-50 transition-colors"
              onClick={prevImg}
            >
              <ChevronLeft size={48} />
            </button>

            <button 
              className="absolute right-4 md:right-12 text-foreground hover:text-primary z-50 transition-colors"
              onClick={nextImg}
            >
              <ChevronRight size={48} />
            </button>

            <motion.div 
              key={lightboxIdx}
              className="relative w-full max-w-6xl px-12 md:px-24 h-[80vh] flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <img 
                src={images[lightboxIdx].src} 
                alt={images[lightboxIdx].alt} 
                className="max-w-full max-h-full object-contain border border-primary/30 box-glow-gold"
              />
              <p className="mt-6 text-primary font-serif text-xl tracking-widest text-center">
                {images[lightboxIdx].alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
