import { SimpleCalculator } from './simple.calculator';
import { useGameDartsStore } from '../../model/game.darts.store';
import { AdvancedCalculator } from './advanced.calculator';

const Calculator = () => {
  const mode = useGameDartsStore((state) => state.calculator.mode);

  return { simple: <SimpleCalculator />, advanced: <AdvancedCalculator /> }[mode];
};

export default Calculator;
