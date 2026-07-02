import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
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
import Team from '@/pages/Team';
import Contact from '@/pages/Contact';
import Leaderboard from '@/pages/Leaderboard';
import Achievements from '@/pages/Achievements';
import Download from '@/pages/Download';

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/story" component={Story} />
          <Route path="/characters" component={Characters} />
          <Route path="/kingdoms" component={Kingdoms} />
          <Route path="/weapons" component={Weapons} />
          <Route path="/gameplay" component={Gameplay} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/trailer" component={Trailer} />
          <Route path="/news" component={News} />
          <Route path="/team" component={Team} />
          <Route path="/contact" component={Contact} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/achievements" component={Achievements} />
          <Route path="/download" component={Download} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
              <LoadingScreen />
              <CustomCursor />
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
