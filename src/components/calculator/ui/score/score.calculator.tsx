import { cn } from '@/lib/utils';
import { useGameDartsStore } from '@/shared/store/game.darts.store';
import { EllipsisIcon } from 'lucide-react';

export const ScoreCalculator = () => {
  const score = useGameDartsStore((state) => state.score);

  return (
    <div className="w-full h-full bg-accent flex items-center justify-center">
      <p
        className={cn('text-4xl font-semibold', {
          'animate-pulse font-normal': score === null,
        })}
      >
        {score ? score : <EllipsisIcon />}
      </p>
    </div>
  );
};
