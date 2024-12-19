import { GameMode } from './components/game.mode';
import { ThemeProvider } from './providers/theme';

function App() {
  return (
    <ThemeProvider>
      <GameMode />
    </ThemeProvider>
  );
}

export default App;
