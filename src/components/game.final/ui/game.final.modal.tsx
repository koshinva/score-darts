import { useEffect, useState } from 'react';
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
import { useGameDartsStore } from '@/shared/store/game.darts.store';
import { ShortReport } from './short.report';
import { FullReport } from './full.report';

export const GameFinalModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [reportMode, setReportMode] = useState<'short' | 'full'>('short');

  const isFinal = useGameDartsStore((state) => state.isFinal);
  const reset = useGameDartsStore((state) => state.reset);
  const generateReport = useGameDartsStore((state) => state.generateReport);

  const handleOpenChange = (value: boolean) => {
    setOpenModal(value);
    if (!value) {
      reset();
    }
  };

  useEffect(() => {
    setOpenModal(isFinal);
    if (isFinal) {
      generateReport();
    }
  }, [generateReport, isFinal]);

  return (
    <Dialog open={openModal} onOpenChange={handleOpenChange}>
      <DialogContent className='w-[min(95vw,800px)]'>
        <DialogHeader>
          <DialogTitle>Игра закончена</DialogTitle>
          <DialogDescription className="py-4">
            {{ short: () => <ShortReport />, full: () => <FullReport /> }[reportMode]()}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setReportMode((prev) => (prev === 'short' ? 'full' : 'short'))}
          >
            {{ short: 'Полный отчёт', full: 'Короткий отчёт' }[reportMode]}
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
