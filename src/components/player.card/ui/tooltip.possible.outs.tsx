import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertCircleIcon } from 'lucide-react';
import { possibleOuts } from '../lib/possible.outs';
import { useState } from 'react';
import { TooltipPortal } from '@radix-ui/react-tooltip';
import { useGameDartsStore } from '@/shared/store/game.darts.store';

type TooltipPossibleOutsProps = {
  progress: number;
};

export const TooltipPossibleOuts = (props: TooltipPossibleOutsProps) => {
  const { progress } = props;

  const [open, setOpen] = useState(false);
  const modeCalculator = useGameDartsStore((state) => state.calculator.mode);

  const variants = possibleOuts[progress as keyof typeof possibleOuts] ?? [];
  const enabled = variants.length > 0 && modeCalculator === 'advanced';

  return enabled ? (
    <TooltipProvider delayDuration={150}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild onClick={() => setOpen((prev) => !prev)}>
          <AlertCircleIcon size={20} className="text-success-foreground" />
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent side="bottom" align="start">
            <div className="text-xs flex flex-col text-muted-foreground tracking-wider">
              {variants.map((out) => (
                <span key={out}>{out}</span>
              ))}
            </div>
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <div />
  );
};
