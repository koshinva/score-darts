import { Button } from '@/components/ui/button';
import { useGameDartsStore } from '@/shared/store/game.darts.store';
import {
  BombIcon,
  CalculatorIcon,
  KeyboardIcon,
  SendHorizonalIcon,
  UndoIcon,
  XIcon,
} from 'lucide-react';

type ButtonFactoryProps = {
  type: 'bust' | 'ok' | 'clear' | 'hotkey' | 'toggleMode' | 'undoMove';
};

export const ButtonFactory = (props: ButtonFactoryProps) => {
  const { type } = props;

  const takeMove = useGameDartsStore((state) => state.takeMove);
  const clearScoreCalculator = useGameDartsStore((state) => state.clearScoreCalculator);
  const toggleModCalculator = useGameDartsStore((state) => state.toggleModCalculator);
  const undoMove = useGameDartsStore((state) => state.undoMove);

  const stepsOfLeg = useGameDartsStore((state) => state.stepsOfLeg);
  const dss = useGameDartsStore((state) => state.calculator.dss);
  const score = useGameDartsStore((state) => state.score);

  return {
    bust: () => (
      <Button
        variant="warning"
        size="full"
        className="rounded-none [&_svg]:size-6 text-xl"
        onClick={() => takeMove({ isBust: true })}
      >
        <BombIcon />
      </Button>
    ),
    ok: () => (
      <Button
        disabled={score === null}
        variant="success"
        size="full"
        className="rounded-none [&_svg]:size-6 text-xl"
        onClick={() => takeMove({})}
      >
        <SendHorizonalIcon />
      </Button>
    ),
    clear: () => (
      <Button
        variant="warning"
        size="full"
        className="rounded-none [&_svg]:size-6 text-xl"
        onClick={clearScoreCalculator}
      >
        <XIcon />
      </Button>
    ),
    hotkey: () => (
      <Button
        disabled
        size="full"
        className="bg-accent rounded-none [&_svg]:size-6 text-accent-foreground hover:text-background"
        onClick={() => console.log('hotkey')}
      >
        <KeyboardIcon />
      </Button>
    ),
    toggleMode: () => (
      <Button
        size="full"
        className="bg-accent rounded-none [&_svg]:size-6 text-accent-foreground hover:text-background"
        onClick={toggleModCalculator}
      >
        <CalculatorIcon />
      </Button>
    ),
    undoMove: () => (
      <Button
        size="full"
        disabled={stepsOfLeg.length === 0 || dss.some((ds) => ds !== null)}
        className="bg-destructive rounded-none [&_svg]:size-6 text-destructive-foreground"
        onClick={undoMove}
      >
        <UndoIcon />
      </Button>
    ),
  }[type]();
};
