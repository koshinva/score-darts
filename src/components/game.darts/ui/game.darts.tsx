import { Button } from '@/components/ui/button';
import { useGameDartsStore } from '../model/game.darts.store';
import { GamePlace } from './game.place';
import Calculator from './calculator/calculator';

const GameDarts = () => {
  const reset = useGameDartsStore((state) => state.reset);

  return (
    <div className="w-full h-full flex items-center justify-center bg-primary-foreground">
      <div className="flex flex-col h-full">
        <div className="w-[min(90vw,800px)] flex-1 p-4">
          <GamePlace />
        </div>
        <div className="w-[min(90vw,800px)] mb-4">
          <Button onClick={reset}>Начать заново</Button>
        </div>
        <div className="w-[min(90vw,800px)]">
          <Calculator />
        </div>
      </div>
    </div>
  );
};

export default GameDarts;
