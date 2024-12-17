import { BustButton } from './bust.button';
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
      <div className="col-span-2 border border-border">
        <UndoButton />
      </div>
      <div className="col-span-2 border border-border">
        <HotKeyButton />
      </div>
      <div className="col-span-4 border border-border">
        <ScoreCalculator />
      </div>
      <div className="col-span-2 border border-border">
        <ToggleMod />
      </div>
      <div className="col-span-2 border border-border">
        <BustButton />
      </div>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="col-span-3 border border-border">
          <SimpleKeyButton value={i + 1} />
        </div>
      ))}
      <div className="col-span-3 border border-border">
        <ClearScoreButton />
      </div>
      <div className="col-span-3 border border-border">
        <SimpleKeyButton value={9} />
      </div>
      <div className="col-span-3 border border-border">
        <SimpleKeyButton value={0} />
      </div>
      <div className="col-span-3 border border-border">
        <OkButton />
      </div>
    </div>
  );
};
