import { CalculatorKeyWrapper } from './calculator.key.wrapper';
import { PrimitiveKeyButton } from './primitive.key.button';
import { ScoreCalculator } from '../score/score.calculator';
import { ButtonFactory } from './buttons.factory';

const keysSimpleCalculator = [
  { component: <ButtonFactory type="undoMove" />, span: 2 },
  { component: <ButtonFactory type="hotkey" />, span: 2 },
  { component: <ScoreCalculator />, span: 4 },
  { component: <ButtonFactory type="toggleMode" />, span: 2 },
  { component: <ButtonFactory type="bust" />, span: 2 },
  ...Array.from({ length: 8 }, (_, i) => ({
    component: <PrimitiveKeyButton value={i + 1} type="simple" />,
    span: 3,
  })),
  { component: <ButtonFactory type="clear" />, span: 3 },
  { component: <PrimitiveKeyButton value={9} type="simple" />, span: 3 },
  { component: <PrimitiveKeyButton value={0} type="simple" />, span: 3 },
  { component: <ButtonFactory type="ok" />, span: 3 },
];

export const SimpleCalculator = () => {
  return (
    <div className="grid grid-cols-12 grid-rows-[80px,repeat(3,100px)] max-sm:grid-rows-[60px,repeat(3,75px)]">
      {keysSimpleCalculator.map(({ component, span }, index) => (
        <CalculatorKeyWrapper key={index} span={span}>
          {component}
        </CalculatorKeyWrapper>
      ))}
    </div>
  );
};
