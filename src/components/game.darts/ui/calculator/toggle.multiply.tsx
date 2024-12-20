import { Button } from '@/components/ui/button';
import { useGameDartsStore } from '../../model/game.darts.store';
import { MultiplyCalculator } from '../../types/calculator.types';
import { cn } from '@/lib/utils';

type ToggleMultiplyProps = {
  multiply: MultiplyCalculator;
};

export const ToggleMultiply = (props: ToggleMultiplyProps) => {
  const { multiply } = props;
  const changeMultiply = useGameDartsStore((state) => state.changeMultiply);
  const multiplyStore = useGameDartsStore((state) => state.calculator.multiply);

  return (
    <Button
      size="full"
      className={cn(
        'bg-accent rounded-none [&_svg]:size-6 text-accent-foreground hover:text-background text-lg',
        { 'bg-card': multiply === multiplyStore }
      )}
      onClick={() => changeMultiply(multiply)}
    >
      {multiply}x
    </Button>
  );
};
