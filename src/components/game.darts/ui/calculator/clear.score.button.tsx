import { Button } from '@/components/ui/button';
import { useGameDartsStore } from '../../model/game.darts.store';

export const ClearScoreButton = () => {
  const setScoreCalculator = useGameDartsStore((state) => state.setScoreCalculator);

  return (
    <Button
      variant="warning"
      size="full"
      className="rounded-none [&_svg]:size-6 text-xl"
      onClick={() => setScoreCalculator(null)}
    >
      Очистить
    </Button>
  );
};
