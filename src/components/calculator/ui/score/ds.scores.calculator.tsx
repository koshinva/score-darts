import { cn } from '@/lib/utils';
import { useGameDartsStore } from '@/shared/store/game.darts.store';

export const DsScores = () => {
  const dss = useGameDartsStore((state) => state.calculator.dss);
  const uiDds = new Array(3).fill(null);

  return (
    <div className="grid grid-cols-3 h-full w-full">
      {uiDds.map((_, index) => (
        <div
          key={index}
          className="w-full h-full bg-accent flex gap-2 items-center justify-center "
        >
          <span className="text-xs text-muted-foreground">d{index + 1}</span>
          <p
            className={cn('text-lg text-muted-foreground', {
              'text-primary': dss.length === index,
            })}
          >
            {dss[index] ?? 0}
          </p>
        </div>
      ))}
    </div>
  );
};
