import { cn } from '@/lib/utils';
import { useGameDartsStore } from '../model/game.darts.store';
import { PlayerId } from '../types/player.game.types';

type PlayerMoveIndicatorProps = {
  id: PlayerId;
};

export const PlayerMoveIndicator = (props: PlayerMoveIndicatorProps) => {
  const { id } = props;

  const move = useGameDartsStore((state) => state.move);

  return (
    <span className="absolute flex size-3">
      <span
        className={cn('absolute inline-flex h-full w-full rounded-full bg-gray-500 opacity-75', {
          'bg-green-500 animate-ping': move === id,
        })}
      />
      <span
        className={cn('relative inline-flex rounded-full h-3 w-3 bg-gray-500', {
          'bg-green-500': move === id,
        })}
      />
    </span>
  );
};
