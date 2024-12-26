import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useGameDartsStore } from '@/shared/store/game.darts.store';
import { ReportRow } from '@/shared/ui/report.row';
import { BicepsFlexedIcon, Loader2Icon } from 'lucide-react';
import { ChartReport } from './chart.report';

export const FullReport = () => {
  const report = useGameDartsStore((state) => state.report);

  return report ? (
    <Carousel>
      <CarouselContent>
        {report.players.map((player, index) => (
          <CarouselItem key={player.id}>
            <div key={player.id} className="flex flex-col gap-2">
              <div className="flex items-center gap-2 self-center">
                <p className="text-lg font-semibold">
                  {player.name}
                  {index === 0 && ' (Победитель)'}
                </p>
                {index === 0 && <BicepsFlexedIcon size={22} className="stroke-success" />}
              </div>
              <ReportRow label="Выигранные партии" key="winLegs" value={player.winLegs} />
              <ReportRow label="Выигранные сеты" key="winSets" value={player.winSets} />
              <ReportRow label="Лучшее/ход" key="maxScore" value={player.maxScore} />
              <ReportRow label="Среднее/ход" key="avgScore" value={player.avgScore.toFixed(2)} />
              <ReportRow
                label="Лучшее/бросок"
                key="maxDs"
                value={player.maxDs === null ? 'нет данных' : player.maxDs}
              />
              <ReportRow
                label="Среднее/бросок"
                key="avgDs"
                value={player.avgDs === null ? 'нет данных' : player.avgDs.toFixed(2)}
              />
              <ReportRow label="Всего ходов" key="countStep" value={player.countStep} />
              <ChartReport player={player} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="size-6 -left-6" />
      <CarouselNext className="size-6 -right-6" />
    </Carousel>
  ) : (
    <div className="flex justify-center items-center">
      <Loader2Icon className="animate-spin" />
    </div>
  );
};
