import { useGameDartsStore } from '../model/game.darts.store';
import { PlayerCard } from './player.card';

export const GamePlace = () => {
  const players = useGameDartsStore((state) => state.players);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {Object.keys(players).map((id) => (
        <PlayerCard key={id} id={id} />
      ))}
    </div>
  );
};
