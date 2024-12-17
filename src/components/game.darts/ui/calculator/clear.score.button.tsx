import { Button } from '@/components/ui/button';
import { useGameDartsStore } from '../../model/game.darts.store';

export const ClearScoreButton = () => {
  const setScoreCalculator = useGameDartsStore((state) => state.setScoreCalculator);

  return (
    <Button
      className="w-full h-full bg-warning rounded-none [&_svg]:size-6 text-warning-foreground hover:text-background text-lg"
      onClick={() => setScoreCalculator(null)}
    >
      Очистить
    </Button>
  );
};
