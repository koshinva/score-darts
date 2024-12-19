import { GamePlace } from './game.place';
import Calculator from './calculator/calculator';
import { GameFinalModal } from './game.final.modal';

const GameDarts = () => {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center bg-primary-foreground">
        <div className="flex flex-col h-full items-center">
          <div className="w-[min(90vw,800px)] flex-1 p-4">
            <GamePlace />
          </div>
          <div className="w-[min(90vw,800px)] max-md:w-full">
            <Calculator />
          </div>
        </div>
      </div>
      <GameFinalModal />
    </>
  );
};

export default GameDarts;
