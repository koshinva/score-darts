import { PlayerCard } from '@/components/player.card';
import { useGameDartsStore } from '@/shared/store/game.darts.store';

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
