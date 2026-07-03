import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useAudio } from '@/context/AudioContext';
import { Menu, X, Globe, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [location] = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { isMuted, toggleMute } = useAudio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'nav.home' },
    { href: '/story', label: 'nav.story' },
    { href: '/kingdoms', label: 'nav.kingdoms' },
    { href: '/gameplay', label: 'nav.gameplay' },
    { href: '/articles', label: 'nav.articles' },
    { href: '/about', label: 'nav.about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-primary/20 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link href="/" className="font-serif text-2xl md:text-3xl font-bold text-primary tracking-wider text-glow-gold">
          VEERA YUGAM
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="relative group overflow-hidden px-1">
              <span className={`text-sm uppercase tracking-widest font-medium transition-colors ${location === link.href ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                {t(link.label)}
              </span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-primary transform origin-left transition-transform duration-300 ${location === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </Link>
          ))}
          <Link href="/download" className="relative group overflow-hidden px-3 py-1 border border-primary/50 bg-primary/10 hover:bg-primary/20 transition-all rounded box-glow-gold-hover">
            <span className="text-sm uppercase tracking-widest font-bold text-primary">
              Download
            </span>
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button aria-label="Toggle language" onClick={toggleLanguage} className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-primary transition-colors">
            <Globe size={16} /> {language}
          </button>
          <button aria-label="Toggle sound" onClick={toggleMute} className="text-foreground hover:text-primary transition-colors">
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <button aria-label="Toggle theme" onClick={toggleTheme} className="text-foreground hover:text-primary transition-colors">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button aria-label="Open mobile menu" className="lg:hidden text-foreground hover:text-primary" onClick={() => setMobileMenuOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-[60] flex flex-col items-center justify-center min-h-[100dvh]"
          >
            <button aria-label="Close mobile menu" className="absolute top-6 right-6 text-foreground hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
              <X size={32} />
            </button>

            <nav className="flex flex-col items-center gap-6 mb-12">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                  <span className={`text-2xl font-serif tracking-widest transition-colors ${location === link.href ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                    {t(link.label)}
                  </span>
                </Link>
              ))}
              <Link href="/download" onClick={() => setMobileMenuOpen(false)} className="mt-4 border border-primary/50 px-6 py-2 bg-primary/10">
                <span className={`text-2xl font-serif tracking-widest font-bold text-primary`}>
                  Download
                </span>
              </Link>
            </nav>

            <div className="flex gap-8">
              <button aria-label="Toggle language" onClick={toggleLanguage} className="flex items-center gap-2 text-lg uppercase tracking-widest hover:text-primary transition-colors">
                <Globe size={20} /> {language === 'EN' ? 'தமிழ்' : 'English'}
              </button>
              <button aria-label="Toggle sound" onClick={toggleMute} className="text-foreground hover:text-primary transition-colors">
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
              <button aria-label="Toggle theme" onClick={toggleTheme} className="text-foreground hover:text-primary transition-colors">
                {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
