import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlayerMoveIndicator } from './player.move.indicator';
import { last } from 'lodash';
import { PlayerId } from '@/shared/types/player.game.types';
import { useGameDartsStore } from '@/shared/store/game.darts.store';
import { PlayerBadgeDetail } from './player.badge.detail';
import { getAverage } from '@/shared/helpers/get.average';

type PlayerCardProps = {
  id: PlayerId;
};

export const PlayerCard = (props: PlayerCardProps) => {
  const { id } = props;

  const player = useGameDartsStore((state) => state.players[id]);
  const move = useGameDartsStore((state) => state.move);

  if (!player) {
    return null;
  }

  const details = [
    { title: 'среднее', value: getAverage(player.scores, 2) },
    { title: 'среднее (раунд)', value: getAverage(player.legScores, 2) },
    { title: 'партии', value: player.legsWin },
    { title: 'сеты', value: player.setsWin },
  ];

  return (
    <Card
      className={cn('opacity-65 col-span-6 max-md:col-span-4', {
        'opacity-100 max-md:col-span-12 max-md:order-1': move === id,
      })}
    >
      <CardHeader
        className={cn('text-center relative', {
          'max-md:p-2 space-y-0.5': move !== id,
        })}
      >
        <CardTitle className={cn({ 'max-md:text-xl': move !== id })}>{player.name}</CardTitle>
        <CardDescription
          className={cn('text-8xl font-semibold', {
            'max-md:text-2xl': move !== id,
          })}
        >
          {player.progress}
        </CardDescription>
        <PlayerMoveIndicator type={move === id ? 'active' : undefined} />
        <Separator className={cn({ 'max-md:hidden': move !== id })} />
      </CardHeader>
      <CardContent
        className={cn('grid grid-cols-2 gap-2 p-4 pt-0', {
          'max-md:hidden': move !== id,
        })}
      >
        {details.map((detail) => (
          <PlayerBadgeDetail key={detail.title} title={detail.title} value={detail.value} />
        ))}
      </CardContent>
      <CardFooter
        className={cn('p-4 pt-0 flex justify-end ', {
          'max-md:hidden': move !== id,
        })}
      >
        <div className="flex items-center gap-1 text-sm">
          <span>Последний ход:</span>
          <span className="font-semibold">{last(player.legScores) ?? 0}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
