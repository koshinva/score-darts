import { useGameDartsStore } from '../model/game.darts.store';
import { PlayerCard } from './player.card';

export const GamePlace = () => {
  const players = useGameDartsStore((state) => state.players);

  return (
    <div className="grid grid-cols-12 gap-4 max-md:gap-2">
      {Object.keys(players).map((id) => (
        <PlayerCard key={id} id={id} />
      ))}
    </div>
  );
};
