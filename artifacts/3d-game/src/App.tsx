import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AudioProvider } from '@/context/AudioContext';
import { AdminProvider } from '@/context/AdminContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import LoadingScreen from '@/components/LoadingScreen';

// Pages
import Home from '@/pages/Home';
import Story from '@/pages/Story';
import Characters from '@/pages/Characters';
import Kingdoms from '@/pages/Kingdoms';
import Weapons from '@/pages/Weapons';
import Gameplay from '@/pages/Gameplay';
import Gallery from '@/pages/Gallery';
import Trailer from '@/pages/Trailer';
import News from '@/pages/News';
import About from '@/pages/About';
import Articles from '@/pages/Articles';
import Article from '@/pages/Article';
import Contact from '@/pages/Contact';
import Leaderboard from '@/pages/Leaderboard';
import Achievements from '@/pages/Achievements';
import Download from '@/pages/Download';
import Admin from '@/pages/Admin';
import Music from '@/pages/Music';

const queryClient = new QueryClient();

// Page transition wrapper component
const PageWrapper = ({ component: Component }: { component: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full"
    >
      <Component />
    </motion.div>
  );
};

// Route redirector
const Redirect = ({ to }: { to: string }) => {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation(to, { replace: true });
  }, [to, setLocation]);
  return null;
};

function AnimatedSwitch() {
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={() => <PageWrapper component={Home} />} />
        <Route path="/story" component={() => <PageWrapper component={Story} />} />
        <Route path="/characters" component={() => <PageWrapper component={Characters} />} />
        <Route path="/kingdoms" component={() => <PageWrapper component={Kingdoms} />} />
        <Route path="/weapons" component={() => <PageWrapper component={Weapons} />} />
        <Route path="/gameplay" component={() => <PageWrapper component={Gameplay} />} />
        <Route path="/gallery" component={() => <PageWrapper component={Gallery} />} />
        <Route path="/trailer" component={() => <PageWrapper component={Trailer} />} />
        <Route path="/news" component={() => <PageWrapper component={News} />} />
        <Route path="/about" component={() => <PageWrapper component={About} />} />
        <Route path="/team" component={() => <Redirect to="/about" />} />
        <Route path="/articles" component={() => <PageWrapper component={Articles} />} />
        <Route path="/articles/:id" component={() => <PageWrapper component={Article} />} />
        <Route path="/contact" component={() => <PageWrapper component={Contact} />} />
        <Route path="/leaderboard" component={() => <PageWrapper component={Leaderboard} />} />
        <Route path="/achievements" component={() => <PageWrapper component={Achievements} />} />
        <Route path="/download" component={() => <PageWrapper component={Download} />} />
        <Route path="/music" component={() => <PageWrapper component={Music} />} />
        <Route path="/admin" component={() => <PageWrapper component={Admin} />} />
        <Route component={() => <PageWrapper component={NotFound} />} />
      </Switch>
    </AnimatePresence>
  );
}

function Router() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-1 w-full overflow-hidden">
        <AnimatedSwitch />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <AdminProvider>
        <LanguageProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <WouterRouter base={(import.meta.env.BASE_URL || '/') === '/' ? '/' : (import.meta.env.BASE_URL || '/').replace(/\/$/, '')}>
                <LoadingScreen />
                <CustomCursor />
                <Router />
              </WouterRouter>
              <Toaster />
            </TooltipProvider>
          </QueryClientProvider>
        </LanguageProvider>
        </AdminProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;
