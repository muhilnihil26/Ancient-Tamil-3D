import { Link } from 'wouter';
import { useLanguage } from '@/context/LanguageContext';
import { SiDiscord, SiYoutube, SiX, SiInstagram } from 'react-icons/si';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-primary/20 pt-16 pb-8 relative z-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-serif text-3xl font-bold text-primary tracking-wider text-glow-gold inline-block mb-4">
              VEERA YUGAM
            </Link>
            <p className="text-muted-foreground max-w-md mt-4">
              {t('hero.tagline')}. Explore the ancient Chola, Pandya, and Chera kingdoms in this AAA-quality historical action-adventure.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg text-foreground mb-4 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/story" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.story')}</Link></li>
              <li><Link href="/characters" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.characters')}</Link></li>
              <li><Link href="/kingdoms" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.kingdoms')}</Link></li>
              <li><Link href="/gameplay" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.gameplay')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-foreground mb-4 uppercase tracking-wider">Connect</h4>
            <ul className="space-y-2">
              <li><Link href="/news" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.news')}</Link></li>
              <li><Link href="/team" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.team')}</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.contact')}</Link></li>
              <li><Link href="/leaderboard" className="text-primary font-bold hover:text-primary/80 transition-colors">{t('nav.leaderboard')}</Link></li>
              <li><Link href="/achievements" className="text-primary font-bold hover:text-primary/80 transition-colors">{t('nav.achievements')}</Link></li>
              <li><Link href="/download" className="text-primary font-bold hover:text-primary/80 transition-colors underline decoration-primary/50 underline-offset-4">Download Demo</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            {t('footer.rights')}
          </p>
          
          <div className="flex space-x-6 text-muted-foreground mb-4 md:mb-0">
            <a href="#" className="hover:text-primary transition-colors"><SiDiscord size={20} /></a>
            <a href="#" className="hover:text-primary transition-colors"><SiX size={20} /></a>
            <a href="#" className="hover:text-primary transition-colors"><SiYoutube size={20} /></a>
            <a href="#" className="hover:text-primary transition-colors"><SiInstagram size={20} /></a>
          </div>

          <p className="text-sm text-muted-foreground">
            {t('footer.madeWith')}
          </p>
        </div>
      </div>
    </footer>
  );
}
