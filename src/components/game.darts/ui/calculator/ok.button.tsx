import { Button } from '@/components/ui/button';
import { useGameDartsStore } from '../../model/game.darts.store';

export const OkButton = () => {
  const scoreCalculator = useGameDartsStore((state) => state.scoreCalculator);
  const takeMove = useGameDartsStore((state) => state.takeMove);

  return (
    <Button
      disabled={scoreCalculator === null}
      variant="success"
      size="full"
      className="rounded-none [&_svg]:size-6 text-xl"
      onClick={() => takeMove()}
    >
      Ok
    </Button>
  );
};
