import { GamePlace } from './game.place';

const GameDarts = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-primary-foreground">
      <div className="flex flex-col h-full">
        <div className="w-[min(90vw,800px)] flex-1 p-4">
          <GamePlace />
        </div>
        <div className="w-[min(90vw,800px)]">calculator</div>
      </div>
    </div>
  );
};

export default GameDarts;
