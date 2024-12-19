import { useGameDartsStore } from '@/components/game.darts';
import { Button } from '@/components/ui/button';
import { BoltIcon, LogOutIcon } from 'lucide-react';

export const Header = () => {
  const reset = useGameDartsStore((state) => state.reset);
  const initialized = useGameDartsStore((state) => state.initialized);

  return (
    <header className="bg-secondary color-foreground px-8 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BoltIcon size={40} className="stroke-muted-foreground" />
          <span className="font-semibold text-lg">darts score</span>
        </div>
        <div className="">
          <Button variant="outline" size="sm" onClick={reset} disabled={!initialized}>
            <LogOutIcon />
          </Button>
        </div>
      </div>
    </header>
  );
};
