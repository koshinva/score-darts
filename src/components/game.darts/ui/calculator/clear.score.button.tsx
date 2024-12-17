import { Button } from '@/components/ui/button';
import { useGameDartsStore } from '../../model/game.darts.store';

export const ClearScoreButton = () => {
  const setScoreCalculator = useGameDartsStore((state) => state.setScoreCalculator);

  return (
    <Button
      className="w-full h-full bg-accent rounded-none [&_svg]:size-6 text-accent-foreground hover:text-background text-lg"
      onClick={() => setScoreCalculator(null)}
    >
      Очистить
    </Button>
  );
};
