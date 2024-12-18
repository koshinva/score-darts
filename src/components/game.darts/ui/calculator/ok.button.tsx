import { Button } from '@/components/ui/button';
import { useGameDartsStore } from '../../model/game.darts.store';

export const OkButton = () => {
  const scoreCalculator = useGameDartsStore((state) => state.scoreCalculator);
  const takeMove = useGameDartsStore((state) => state.takeMove);

  return (
    <Button
      disabled={scoreCalculator === null}
      className="w-full h-full bg-success rounded-none [&_svg]:size-6 text-success-foreground hover:text-background text-lg"
      onClick={() => takeMove()}
    >
      Ok
    </Button>
  );
};
