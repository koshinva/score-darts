import { Separator } from '@/components/ui/separator';
import { useGameDartsStore } from '@/shared/store/game.darts.store';
import { ReportRow } from '@/shared/ui/report.row';
import { BicepsFlexedIcon, Loader2Icon } from 'lucide-react';

export const ShortReport = () => {
  const report = useGameDartsStore((state) => state.report);

  return report ? (
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
  );
};
