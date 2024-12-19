import { useGameDartsStore } from '@/components/game.darts';
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Уверены, что хотите сбросить игру?</DialogTitle>
            <DialogDescription>
              Если сбросите игру, то вы потеряете все данные текущего сеанса.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-end gap-2">
            <DialogClose>
              <Button type="button" variant="secondary">
                Отменить
              </Button>
            </DialogClose>
            <DialogClose>
              <Button onClick={onReset}>Сбросить</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
