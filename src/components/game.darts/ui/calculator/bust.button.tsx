import { Button } from '@/components/ui/button';
import { useGameDartsStore } from '../../model/game.darts.store';

export const BustButton = () => {
  const takeMove = useGameDartsStore((state) => state.takeMove);

  return (
    <Button
      variant="warning"
      size="full"
      className="rounded-none [&_svg]:size-6 text-xl"
      onClick={() => takeMove(true)}
    >
      Перебор
    </Button>
  );
};
