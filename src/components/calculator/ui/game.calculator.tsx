import { useGameDartsStore } from '@/shared/store/game.darts.store';
import { AdvancedCalculator } from './calculators/advanced.calculator';
import { SimpleCalculator } from './calculators/simple.calculator';

export const GameCalculator = () => {
  const mode = useGameDartsStore((state) => state.calculator.mode);

  return { simple: <SimpleCalculator />, advanced: <AdvancedCalculator /> }[mode];
};
