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
import { BicepsFlexedIcon, Loader2Icon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export const GameFinalModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const isFinal = useGameDartsStore((state) => state.isFinal);
  const reset = useGameDartsStore((state) => state.reset);
  const generateReport = useGameDartsStore((state) => state.generateReport);
  const report = useGameDartsStore((state) => state.report);

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Игра закончена</DialogTitle>
          <DialogDescription className="py-4">
            {report ? (
              <div className="flex flex-col gap-4">
                {report.players.map((player, index) => (
                  <>
                    <div key={player.id} className="px-2 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <p className="text-base font-semibold">{player.name}</p>
                        {index === 0 && (
                          <BicepsFlexedIcon size={18} className="stroke-success animate-bounce" />
                        )}
                      </div>
                      <ReportRow label="Выигранные партии" key="winLegs" value={player.winLegs} />
                      <ReportRow label="Выигранные сеты" key="winSets" value={player.winSets} />
                      <ReportRow label="Лучший результат" key="maxScore" value={player.maxScore} />
                      <ReportRow
                        label="Средний результат"
                        key="avgScore"
                        value={player.avgScore.toFixed(2)}
                      />
                    </div>
                    {index !== report.players.length - 1 && <Separator />}
                  </>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <Loader2Icon className="animate-spin" />
              </div>
            )}
          </DialogDescription>
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

type ReportRowProps = {
  label: string;
  value: string | number;
};

function ReportRow(props: ReportRowProps) {
  const { label, value } = props;

  return (
    <div className="flex items-end gap-1">
      <p className="leading-none">{label}</p>
      <div className="border-b border-dashed border-border flex-1" />
      <p className="leading-none">{value}</p>
    </div>
  );
}
