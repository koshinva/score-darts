import { useEffect, useState } from 'react';
import { useGameDartsStore } from '../model/game.darts.store';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const GameFinalModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const isFinal = useGameDartsStore((state) => state.isFinal);
  const reset = useGameDartsStore((state) => state.reset);

  const handleOpenChange = (value: boolean) => {
    setOpenModal(value);
    if (!value) {
      reset();
    }
  };

  useEffect(() => {
    setOpenModal(isFinal);
  }, [isFinal]);

  return (
    <Dialog open={openModal} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Игра закончена</DialogTitle>
          <DialogDescription>Победитель в игре:</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" disabled variant="secondary">
            Скачать отчет
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Закрыть
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
