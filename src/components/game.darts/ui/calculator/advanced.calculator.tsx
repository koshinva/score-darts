import { multiplyCalculator } from '../../types/calculator.types';
import { BustButton } from './bust.button';
import { CalculatorKeyWrapper } from './calculator.key.wrapper';
import { ClearScoreButton } from './clear.score.button';
import { SimpleKeyButton } from './simple.key.button';
import { ToggleMod } from './toggle.mod';
import { ToggleMultiply } from './toggle.multiply';
import { UndoButton } from './undo.button';

export const AdvancedCalculator = () => {
  return (
    <div className="grid grid-cols-12 grid-rows-[60px,80px,repeat(4,60px)]">
      <CalculatorKeyWrapper span={2}>
        <UndoButton />
      </CalculatorKeyWrapper>
      <CalculatorKeyWrapper span={3}>
        <SimpleKeyButton value={0} />
      </CalculatorKeyWrapper>
      <CalculatorKeyWrapper span={3}>
        <SimpleKeyButton value={0} />
      </CalculatorKeyWrapper>
      <CalculatorKeyWrapper span={3}>
        <SimpleKeyButton value={0} />
      </CalculatorKeyWrapper>
      <CalculatorKeyWrapper span={1}>
        <ToggleMod />
      </CalculatorKeyWrapper>

      {multiplyCalculator.map((value) => (
        <CalculatorKeyWrapper key={value} span={4}>
          <ToggleMultiply multiply={value} />
        </CalculatorKeyWrapper>
      ))}

      {Array.from({ length: 18 }, (_, i) => (
        <CalculatorKeyWrapper key={i} span={2}>
          <SimpleKeyButton value={i + 1} />
        </CalculatorKeyWrapper>
      ))}

      <CalculatorKeyWrapper span={2}>
        <ClearScoreButton />
      </CalculatorKeyWrapper>
      <CalculatorKeyWrapper span={2}>
        <SimpleKeyButton value={19} />
      </CalculatorKeyWrapper>
      <CalculatorKeyWrapper span={2}>
        <SimpleKeyButton value={20} />
      </CalculatorKeyWrapper>
      <CalculatorKeyWrapper span={2}>
        <SimpleKeyButton value={0} />
      </CalculatorKeyWrapper>
      <CalculatorKeyWrapper span={2}>
        <SimpleKeyButton value={0} />
      </CalculatorKeyWrapper>
      <CalculatorKeyWrapper span={2}>
        <BustButton />
      </CalculatorKeyWrapper>
    </div>
  );
};
