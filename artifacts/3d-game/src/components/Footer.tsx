import { Link } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';
import { SiDiscord, SiYoutube, SiX, SiInstagram } from 'react-icons/si';
import { motion } from 'framer-motion';

export default function Footer() {
  const { t } = useLanguage();

  const explore = [
    { href: '/story', label: 'Story' },
    { href: '/kingdoms', label: 'Kingdoms' },
    { href: '/gameplay', label: 'Gameplay' },
    { href: '/characters', label: 'Characters' },
    { href: '/weapons', label: 'Weapons' },
    { href: '/gallery', label: 'Gallery' },
  ];

  const community = [
    { href: '/trailer', label: 'Trailers' },
    { href: '/articles', label: 'Chronicles' },
    { href: '/music', label: 'Music' },
    { href: '/news', label: 'News' },
    { href: '/achievements', label: 'Achievements' },
    { href: '/about', label: 'About Us' },
  ];

  const socials = [
    { icon: <SiDiscord size={20} />, label: 'Discord', href: '#' },
    { icon: <SiX size={20} />, label: 'X (Twitter)', href: '#' },
    { icon: <SiYoutube size={20} />, label: 'YouTube', href: '#' },
    { icon: <SiInstagram size={20} />, label: 'Instagram', href: '#' },
  ];

  return (
    <footer className="bg-card border-t border-primary/20 pt-16 pb-8 relative z-10 overflow-hidden">
      {/* Subtle gold gradient background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="font-serif text-2xl md:text-3xl font-bold text-primary tracking-wider text-glow-gold inline-block mb-4">
              VEERA YUGAM
            </Link>
            <p className="text-muted-foreground max-w-sm mt-2 text-sm leading-relaxed">
              An open-world AAA action RPG honouring the legacy of Tamil kingdoms — Chola, Pandya, and Chera. Built by Warrior Developers.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-primary font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-gold" />
              In Development · Releasing 2031
            </div>
            {/* Social icons */}
            <div className="flex gap-4 mt-6">
              {socials.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="text-muted-foreground hover:text-primary transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-serif text-sm text-foreground mb-5 uppercase tracking-wider border-b border-primary/20 pb-2">Explore</h4>
            <ul className="space-y-2.5">
              {explore.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-1.5 group min-h-[28px]">
                    <span className="w-0 group-hover:w-3 h-[1px] bg-primary transition-all duration-200" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-serif text-sm text-foreground mb-5 uppercase tracking-wider border-b border-primary/20 pb-2">Community</h4>
            <ul className="space-y-2.5">
              {community.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-1.5 group min-h-[28px]">
                    <span className="w-0 group-hover:w-3 h-[1px] bg-primary transition-all duration-200" />
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/download" className="text-primary font-bold text-sm hover:opacity-75 transition-opacity flex items-center gap-1.5 group min-h-[28px]">
                  ⚔ Download
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/30 gap-4">
          <p className="text-muted-foreground text-xs text-center md:text-left">
            © 2024–2031 Warrior Developers. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground text-center">
            Made with ❤️ for Tamil Pride · Tamil Nadu, India
          </p>
          <Link href="/admin" className="text-muted-foreground/40 text-xs hover:text-primary/60 transition-colors uppercase tracking-wider">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
