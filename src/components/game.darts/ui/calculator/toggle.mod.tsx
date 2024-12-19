import { Button } from '@/components/ui/button';
import { RadicalIcon } from 'lucide-react';
import { useGameDartsStore } from '../../model/game.darts.store';

export const ToggleMod = () => {
  const toggleModCalculator = useGameDartsStore((state) => state.toggleModCalculator);

  return (
    <Button
      size="full"
      className="bg-accent rounded-none [&_svg]:size-6 text-accent-foreground hover:text-background"
      onClick={toggleModCalculator}
    >
      <RadicalIcon />
    </Button>
  );
};
