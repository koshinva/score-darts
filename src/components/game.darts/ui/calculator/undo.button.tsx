import { Button } from '@/components/ui/button';
import { useGameDartsStore } from '../../model/game.darts.store';
import { UndoIcon } from 'lucide-react';

export const UndoButton = () => {
  const undoMove = useGameDartsStore((state) => state.undoMove);

  return (
    <Button size="full" className="bg-destructive rounded-none [&_svg]:size-6 text-destructive-foreground" onClick={undoMove}>
      <UndoIcon />
    </Button>
  );
};
