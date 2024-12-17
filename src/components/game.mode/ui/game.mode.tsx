import { GameForm } from '@/components/game.form';
import { GameDarts, useGameDartsStore } from '@/components/game.darts';

const GameMode = () => {
  const initialized = useGameDartsStore((state) => state.initialized);

  return (
    <div className="h-full w-full flex flex-col">
      <header className="bg-secondary color-foreground px-4 py-2">Darts Scoring</header>
      <div className="flex-1">{initialized ? <GameDarts /> : <GameForm />}</div>
    </div>
  );
};

export default GameMode;
