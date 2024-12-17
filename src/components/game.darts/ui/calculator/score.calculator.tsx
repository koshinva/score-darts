import { cn } from '@/lib/utils';
import { useGameDartsStore } from '../../model/game.darts.store';

export const ScoreCalculator = () => {
  const scoreCalculator = useGameDartsStore((state) => state.scoreCalculator);

  return (
    <div className="w-full h-full bg-accent flex items-center justify-center">
      <p
        className={cn('text-4xl font-semibold', {
          'animate-pulse font-normal': scoreCalculator === null,
        })}
      >
        {scoreCalculator ? scoreCalculator : 'счет'}
      </p>
    </div>
  );
};
