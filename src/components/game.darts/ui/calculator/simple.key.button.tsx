import { Button } from '@/components/ui/button';
import { useGameDartsStore } from '../../model/game.darts.store';
import { ModeCalculator } from '../../types/calculator.types';

type SimpleKeyButtonProps = {
  value: string | number;
  type: ModeCalculator;
};

export const SimpleKeyButton = (props: SimpleKeyButtonProps) => {
  const { value, type } = props;

  const setScoreCalculator = useGameDartsStore((state) => state.setScoreCalculator);
  const updateDss = useGameDartsStore((state) => state.updateDss);
  const takeMove = useGameDartsStore((state) => state.takeMove);

  const onClick = () => {
    if (type === 'simple') {
      setScoreCalculator(value);
    } else {
      const result = updateDss(value);
      if (result !== undefined) {
        takeMove({ dss: result });
      }
    }
  };

  return (
    <Button
      size="full"
      className="bg-accent rounded-none [&_svg]:size-6 text-accent-foreground hover:text-background text-lg"
      onClick={onClick}
    >
      {value === 25 ? 'Bull' : value}
    </Button>
  );
};
