import { GameForm } from '@/components/game.form';
import { GameDarts } from '@/components/game.darts';
import { Header } from '@/components/header';
import { useGameDartsStore } from '@/shared/store/game.darts.store';

const GameMode = () => {
  const initialized = useGameDartsStore((state) => state.initialized);

  return (
    <div className="h-full w-full flex flex-col">
      <Header />
      <div className="flex-1">{initialized ? <GameDarts /> : <GameForm />}</div>
    </div>
  );
};

export default GameMode;
