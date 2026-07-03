import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'EN' | 'TA';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  'hero.tagline': {
    EN: 'Rise as the Guardian of Tamilagam',
    TA: 'தமிழகத்தின் காவலனாக எழு'
  },
  'nav.home': { EN: 'Home', TA: 'முகப்பு' },
  'nav.story': { EN: 'Story', TA: 'கதை' },
  'nav.characters': { EN: 'Characters', TA: 'கதாபாத்திரங்கள்' },
  'nav.kingdoms': { EN: 'Kingdoms', TA: 'அரசுகள்' },
  'nav.weapons': { EN: 'Weapons', TA: 'ஆயுதங்கள்' },
  'nav.gameplay': { EN: 'Gameplay', TA: 'விளையாட்டு முறை' },
  'nav.gallery': { EN: 'Gallery', TA: 'புகைப்படங்கள்' },
  'nav.trailer': { EN: 'Trailer', TA: 'முன்னோட்டம்' },
  'nav.news': { EN: 'News', TA: 'செய்திகள்' },
  'nav.team': { EN: 'Team', TA: 'குழு' },
  'nav.about': { EN: 'About', TA: 'எங்களை பற்றி' },
  'nav.articles': { EN: 'Articles', TA: 'கட்டுரைகள்' },
  'nav.contact': { EN: 'Contact', TA: 'தொடர்பு கொள்க' },
  'nav.leaderboard': { EN: 'Leaderboard', TA: 'தரவரிசை' },
  'nav.achievements': { EN: 'Achievements', TA: 'சாதனைகள்' },
  'button.watchTrailer': { EN: 'Watch Trailer', TA: 'முன்னோட்டம் காண்க' },
  'button.downloadDemo': { EN: 'Download Demo', TA: 'விளையாட்டை பதிவிறக்கு' },
  'about.founderTitle': { EN: 'Visionary Founder & Lead Developer', TA: '[TA] Visionary Founder & Lead Developer' },
  'articles.heroTitle': { EN: 'Chronicles of Tamilakam', TA: '[TA] Chronicles of Tamilakam' },
  'articles.heroSubtitle': { EN: 'The journey to 2031', TA: '[TA] The journey to 2031' },
  'form.applyToJoin': { EN: 'Apply to Join', TA: '[TA] Apply to Join' },
  'form.sendCopy': { EN: 'Send a copy to me', TA: '[TA] Send a copy to me' },
  'form.successMessage': { EN: 'Application prepared. Opening mail client...', TA: '[TA] Application prepared. Opening mail client...' },
  'footer.rights': { EN: '© 2025 Warrior Developers. All rights reserved.', TA: '© 2025 வாரியர் டெவலப்பர்ஸ். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.' },
  'footer.madeWith': { EN: 'Made with ❤️ for Tamil Pride', TA: 'தமிழ் பெருமைக்காக ❤️ உடன் உருவாக்கப்பட்டது' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('EN');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'EN' ? 'TA' : 'EN'));
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
