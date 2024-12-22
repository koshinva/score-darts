import { multiplyCalculator } from '@/shared/types/calculator.types';
import { DsScores } from '../score/ds.scores.calculator';
import { ButtonFactory } from './buttons.factory';
import { ToggleMultiply } from './toggle.multiply';
import { PrimitiveKeyButton } from './primitive.key.button';
import { CalculatorKeyWrapper } from './calculator.key.wrapper';

const keysAdvancedCalculator = [
  { component: <ButtonFactory type="undoMove" />, span: 2 },
  { component: <DsScores />, span: 9 },
  { component: <ButtonFactory type="toggleMode" />, span: 1 },
  ...multiplyCalculator.map((value) => ({
    component: <ToggleMultiply multiply={value} />,
    span: 4,
  })),
  ...Array.from({ length: 18 }, (_, i) => ({
    component: <PrimitiveKeyButton type="advanced" value={i + 1} />,
    span: 2,
  })),
  { component: <ButtonFactory type="clear" />, span: 2 },
  { component: <PrimitiveKeyButton type="advanced" value={19} />, span: 2 },
  { component: <PrimitiveKeyButton type="advanced" value={20} />, span: 2 },
  { component: <PrimitiveKeyButton type="advanced" value={0} />, span: 2 },
  { component: <PrimitiveKeyButton type="advanced" value={25} />, span: 2 },
  { component: <ButtonFactory type="bust" />, span: 2 },
];

export const AdvancedCalculator = () => {
  return (
    <div className="grid grid-cols-12 grid-rows-[60px,80px,repeat(4,60px)]">
      {keysAdvancedCalculator.map(({ component, span }, index) => (
        <CalculatorKeyWrapper key={index} span={span}>
          {component}
        </CalculatorKeyWrapper>
      ))}
    </div>
  );
};
