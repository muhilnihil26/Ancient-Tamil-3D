import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useAudio } from '@/context/AudioContext';
import { Menu, X, Globe, Moon, Sun, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'nav.home' },
  { href: '/story', label: 'nav.story' },
  { href: '/kingdoms', label: 'nav.kingdoms' },
  { href: '/gameplay', label: 'nav.gameplay' },
  { href: '/trailer', label: 'nav.trailer' },
  { href: '/articles', label: 'nav.articles' },
  { href: '/music', label: 'nav.music' },
  { href: '/about', label: 'nav.about' },
];

const mobileLinks = [
  { href: '/', label: 'Home' },
  { href: '/story', label: 'Story' },
  { href: '/kingdoms', label: 'Kingdoms' },
  { href: '/gameplay', label: 'Gameplay' },
  { href: '/trailer', label: 'Trailers' },
  { href: '/articles', label: 'Chronicles' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/music', label: 'Music' },
  { href: '/about', label: 'About' },
  { href: '/download', label: 'Download' },
];

export default function Navbar() {
  const [location] = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { isMuted, toggleMute } = useAudio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Touch swipe to close
  const touchStartY = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileMenuOpen(false); }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const onTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientY - touchStartY.current;
    if (delta > 60) setMobileMenuOpen(false); // swipe down to close
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/85 backdrop-blur-md border-b border-primary/20 py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-serif text-xl md:text-2xl lg:text-3xl font-bold text-primary tracking-wider text-glow-gold shrink-0">
          VEERA YUGAM
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-5">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="relative group overflow-hidden px-1 py-1 min-h-[36px] flex items-center">
              <span className={`text-xs uppercase tracking-widest font-medium transition-colors ${location === link.href ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
                {t(link.label)}
              </span>
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-primary transform origin-left transition-transform duration-300 ${location === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </Link>
          ))}
          <Link href="/download" className="relative group px-3 py-1.5 border border-primary/50 bg-primary/10 hover:bg-primary/20 transition-all box-glow-gold-hover min-h-[36px] flex items-center">
            <span className="text-xs uppercase tracking-widest font-bold text-primary">Download</span>
          </Link>
        </nav>

        {/* Desktop actions */}
        <div className="hidden xl:flex items-center gap-4">
          <button aria-label="Toggle language" onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-xs uppercase tracking-widest hover:text-primary transition-colors min-h-[36px] px-1">
            <Globe size={14} /> {language}
          </button>
          <button aria-label={isMuted ? 'Unmute' : 'Mute'} onClick={toggleMute}
            className="text-foreground hover:text-primary transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center">
            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>
          <button aria-label="Toggle theme" onClick={toggleTheme}
            className="text-foreground hover:text-primary transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center">
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>

        {/* Mobile: action strip + hamburger */}
        <div className="xl:hidden flex items-center gap-2">
          <button aria-label={isMuted ? 'Unmute' : 'Mute'} onClick={toggleMute}
            className="text-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <button aria-label="Toggle theme" onClick={toggleTheme}
            className="text-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button aria-label="Open navigation menu" onClick={() => setMobileMenuOpen(true)}
            className="text-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 bg-background/97 backdrop-blur-xl z-[60] flex flex-col"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Header row */}
            <div className="flex justify-between items-center px-5 py-5 border-b border-primary/20">
              <span className="font-serif text-xl font-bold text-primary tracking-wider">VEERA YUGAM</span>
              <button aria-label="Close navigation menu" onClick={() => setMobileMenuOpen(false)}
                className="text-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
                <X size={28} />
              </button>
            </div>

            {/* Swipe hint */}
            <div className="text-center py-2">
              <div className="w-10 h-1 bg-primary/30 rounded-full mx-auto" />
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-5 py-4">
              <div className="flex flex-col">
                {mobileLinks.map((link, idx) => (
                  <motion.div key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.3 }}>
                    <Link href={link.href} onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between py-4 border-b border-border/15 min-h-[56px] group ${location === link.href ? 'text-primary' : 'text-foreground'}`}>
                      <span className={`text-xl font-serif tracking-wide ${location === link.href ? 'text-primary' : ''}`}>
                        {link.label}
                      </span>
                      {location === link.href && <span className="w-2 h-2 rounded-full bg-primary" />}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Bottom actions */}
            <div className="px-5 py-6 border-t border-primary/20">
              <div className="flex gap-4 justify-center">
                <button aria-label="Toggle language" onClick={toggleLanguage}
                  className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-primary transition-colors min-h-[44px] px-3">
                  <Globe size={18} /> {language === 'EN' ? 'தமிழ்' : 'English'}
                </button>
                <button aria-label={isMuted ? 'Unmute' : 'Mute'} onClick={toggleMute}
                  className="text-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
                  {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                </button>
                <button aria-label="Toggle theme" onClick={toggleTheme}
                  className="text-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
                  {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
                </button>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-4 uppercase tracking-widest">Swipe down to close</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
