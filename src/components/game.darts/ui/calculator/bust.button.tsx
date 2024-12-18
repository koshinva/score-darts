import { Button } from '@/components/ui/button';
import { useGameDartsStore } from '../../model/game.darts.store';

export const BustButton = () => {
  const takeMove = useGameDartsStore((state) => state.takeMove);

  return (
    <Button
      className="w-full h-full bg-warning rounded-none [&_svg]:size-6 text-warning-foreground hover:text-background text-lg"
      onClick={() => takeMove(true)}
    >
      Перебор
    </Button>
  );
};
