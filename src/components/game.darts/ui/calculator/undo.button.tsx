import { Button } from '@/components/ui/button';
import { useGameDartsStore } from '../../model/game.darts.store';
import { UndoIcon } from 'lucide-react';

export const UndoButton = () => {
  const undoMove = useGameDartsStore((state) => state.undoMove);
  const stepsOfLeg = useGameDartsStore((state) => state.stepsOfLeg);

  return (
    <Button
      size="full"
      disabled={stepsOfLeg.length === 0}
      className="bg-destructive rounded-none [&_svg]:size-6 text-destructive-foreground"
      onClick={undoMove}
    >
      <UndoIcon />
    </Button>
  );
};
