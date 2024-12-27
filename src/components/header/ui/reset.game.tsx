import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useGameDartsStore } from '@/shared/store/game.darts.store';
import { LogOutIcon } from 'lucide-react';

export const ResetGame = () => {
  const reset = useGameDartsStore((state) => state.reset);
  const initialized = useGameDartsStore((state) => state.initialized);

  const onReset = () => {
    reset();
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" disabled={!initialized}>
            <LogOutIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[min(95vw,800px)]">
          <DialogHeader>
            <DialogTitle>Сбросить игру?</DialogTitle>
            <DialogDescription className="text-left">
              Если сбросите игру, то вы потеряете все данные текущего сеанса.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Отменить
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={onReset}>Сбросить</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
