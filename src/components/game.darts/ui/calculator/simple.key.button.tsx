import { Button } from '@/components/ui/button';
import { useGameDartsStore } from '../../model/game.darts.store';

type SimpleKeyButtonProps = {
  value: string | number;
};

export const SimpleKeyButton = (props: SimpleKeyButtonProps) => {
  const { value } = props;

  const setScoreCalculator = useGameDartsStore((state) => state.setScoreCalculator);

  return (
    <Button
      size="full"
      className="bg-accent rounded-none [&_svg]:size-6 text-accent-foreground hover:text-background text-lg"
      onClick={() => setScoreCalculator(value)}
    >
      {value}
    </Button>
  );
};
