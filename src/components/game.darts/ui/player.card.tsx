import { cn } from '@/lib/utils';
import { useGameDartsStore } from '../model/game.darts.store';
import { PlayerId } from '../types/player.game.types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { PlayerMoveIndicator } from './player.move.indicator';

type PlayerCardProps = {
  id: PlayerId;
};

export const PlayerCard = (props: PlayerCardProps) => {
  const { id } = props;

  const player = useGameDartsStore((state) => state.players[id]);

  if (!player) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="text-center relative">
        <CardTitle>{player.name}</CardTitle>
        <CardDescription className="text-8xl font-semibold">{player.progress}</CardDescription>
        <PlayerMoveIndicator id={id} />
        <Separator />
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 p-4 pt-0">
        <PlayerBadgeDetail title="среднее" value={player.avg.toFixed(2)} />
        <PlayerBadgeDetail title="среднее (раунд)" value={player.legAvg.toFixed(2)} />
        <PlayerBadgeDetail title="партии" value={player.legsWin} />
        <PlayerBadgeDetail title="сеты" value={player.setsWin} />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <PlayerBadgeDetail title="последний ход" value={player.lastScore} className="text-md" />
      </CardFooter>
    </Card>
  );
};

type PlayerBadgeDetailProps = {
  title: string;
  value: string | number;
  className?: string;
};

const PlayerBadgeDetail = (props: PlayerBadgeDetailProps) => {
  const { title, value, className } = props;

  return (
    <Badge variant="outline" className={cn('text-xs rounded-xl font-normal', className)}>
      {title}:<span className="ml-1 font-bold">{value}</span>
    </Badge>
  );
};
