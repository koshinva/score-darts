import { Button } from '@/components/ui/button';
import { useGameDartsStore } from '@/shared/store/game.darts.store';
import { ModeCalculator } from '@/shared/types/calculator.types';

type PrimitiveKeyButtonProps = {
  value: string | number;
  type: ModeCalculator;
};

export const PrimitiveKeyButton = (props: PrimitiveKeyButtonProps) => {
  const { value, type } = props;

  const setScoreCalculator = useGameDartsStore((state) => state.setScoreCalculator);
  const updateDss = useGameDartsStore((state) => state.updateDss);
  const takeMove = useGameDartsStore((state) => state.takeMove);

  const onClick = () => {
    if (type === 'simple') {
      setScoreCalculator(value);
    } else {
      const isTakeMove = updateDss(value);
      if (isTakeMove) {
        takeMove({ isDss: isTakeMove });
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
