import { BustButton } from './bust.button';
import { CalculatorKeyWrapper } from './calculator.key.wrapper';
import { ClearScoreButton } from './clear.score.button';
import { HotKeyButton } from './hotkey.button';
import { OkButton } from './ok.button';
import { ScoreCalculator } from './score.calculator';
import { SimpleKeyButton } from './simple.key.button';
import { ToggleMod } from './toggle.mod';
import { UndoButton } from './undo.button';

export const SimpleCalculator = () => {
  return (
    <div className="grid grid-cols-12 grid-rows-[80px,repeat(3,100px)]">
      <CalculatorKeyWrapper span={2}>
        <UndoButton />
      </CalculatorKeyWrapper>
      <CalculatorKeyWrapper span={2}>
        <HotKeyButton />
      </CalculatorKeyWrapper>
      <CalculatorKeyWrapper span={4}>
        <ScoreCalculator />
      </CalculatorKeyWrapper>
      <CalculatorKeyWrapper span={2}>
        <ToggleMod />
      </CalculatorKeyWrapper>
      <CalculatorKeyWrapper span={2}>
        <BustButton />
      </CalculatorKeyWrapper>
      {Array.from({ length: 8 }, (_, i) => (
        <CalculatorKeyWrapper key={i} span={3}>
          <SimpleKeyButton value={i + 1} />
        </CalculatorKeyWrapper>
      ))}
      <CalculatorKeyWrapper span={3}>
        <ClearScoreButton />
      </CalculatorKeyWrapper>
      <CalculatorKeyWrapper span={3}>
        <SimpleKeyButton value={9} />
      </CalculatorKeyWrapper>
      <CalculatorKeyWrapper span={3}>
        <SimpleKeyButton value={0} />
      </CalculatorKeyWrapper>
      <CalculatorKeyWrapper span={3}>
        <OkButton />
      </CalculatorKeyWrapper>
    </div>
  );
};
