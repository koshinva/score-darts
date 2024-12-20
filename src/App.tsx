import { GameMode } from './components/game.mode';
import { Toaster } from './components/ui/sonner';
import { ErrorBoundaryProvider } from './providers/error';
import { ThemeProvider } from './providers/theme';

function App() {
  return (
    <ErrorBoundaryProvider>
      <ThemeProvider>
        <GameMode />
        <Toaster />
      </ThemeProvider>
    </ErrorBoundaryProvider>
  );
}

export default App;
