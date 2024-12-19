import { GameMode } from './components/game.mode';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './providers/theme';

function App() {
  return (
    <ThemeProvider>
      <GameMode />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
