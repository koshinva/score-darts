import { SimpleCalculator } from './simple.calculator';
import { useGameDartsStore } from '../../model/game.darts.store';

const Calculator = () => {
  const modCalculator = useGameDartsStore((state) => state.modCalculator);

  return { simple: <SimpleCalculator />, advanced: <div>advanced calculator</div> }[modCalculator];
};

export default Calculator;
