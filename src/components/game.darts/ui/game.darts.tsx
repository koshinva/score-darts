import { GameCalculator } from '@/components/calculator';
import { GamePlace } from './game.place';
import { GameFinalModal } from '@/components/game.final';

const GameDarts = () => {
  return (
    <>
      <div className="w-full h-full bg-background">
        <div className="flex flex-col h-full items-center">
          <div className="w-[min(90vw,800px)] flex-1 p-4">
            <GamePlace />
          </div>
          <div className="w-[min(90vw,800px)] max-md:w-[min(95vw,800px)]">
            <GameCalculator />
          </div>
        </div>
      </div>
      <GameFinalModal />
    </>
  );
};

export default GameDarts;
