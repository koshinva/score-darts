import { BoltIcon } from 'lucide-react';
import { ToggleTheme } from './toggle.theme';
import { ResetGame } from './reset.game';
import { HintGame } from './hint.game';
import { useGameDartsStore } from '@/shared/store/game.darts.store';

export const Header = () => {
  const initialized = useGameDartsStore((state) => state.initialized);

  return (
    <header className="bg-secondary color-foreground px-8 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BoltIcon size={40} className="stroke-muted-foreground" />
          <span className="font-semibold text-lg">darts score</span>
        </div>
        <div className="flex items-center gap-2">
          {initialized && <HintGame />}
          <ToggleTheme />
          <ResetGame />
        </div>
      </div>
    </header>
  );
};