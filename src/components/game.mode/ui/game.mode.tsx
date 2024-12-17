import { GameForm } from '@/components/game.form';
import { useModeGameStore } from '../model/mode.game.store';
import { GameDarts } from '@/components/game.darts';

const GameMode = () => {
  const mode = useModeGameStore((state) => state.mode);

  return (
    <div className="h-full w-full flex flex-col">
      <header className="bg-secondary color-foreground px-4 py-2">Darts Scoring</header>
      <div className="flex-1">
        {{
          start: () => <GameForm />,
          game: () => <GameDarts />,
        }[mode]()}
      </div>
    </div>
  );
};

export default GameMode;
