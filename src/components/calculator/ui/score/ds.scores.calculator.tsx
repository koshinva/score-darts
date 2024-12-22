import { cn } from '@/lib/utils';
import { useGameDartsStore } from '@/shared/store/game.darts.store';

export const DsScores = () => {
  const dss = useGameDartsStore((state) => state.calculator.dss);

  const fillIndex = dss.filter((ds) => ds !== null).length;

  return dss.map((ds, index) => (
    <div className="grid grid-cols-3">
      <div key={index} className="w-full h-full bg-accent flex gap-2 items-center justify-center ">
        <span className="text-xs text-muted-foreground">d{index + 1}</span>
        <p
          className={cn('text-lg text-muted-foreground', {
            'text-primary': fillIndex === index,
          })}
        >
          {ds ?? 0}
        </p>
      </div>
    </div>
  ));
};
