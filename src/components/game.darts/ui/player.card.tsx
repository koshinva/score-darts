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
import { mean, last } from 'lodash';

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

  return (
    <Card className={cn('opacity-65', { 'opacity-100': move === id })}>
      <CardHeader className="text-center relative">
        <CardTitle>{player.name}</CardTitle>
        <CardDescription className="text-8xl font-semibold">{player.progress}</CardDescription>
        <PlayerMoveIndicator type={move === id ? 'active' : undefined} />
        <Separator />
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 p-4 pt-0">
        <PlayerBadgeDetail
          title="среднее"
          value={(player.scores.length > 0 ? mean(player.scores) : 0).toFixed(2)}
        />
        <PlayerBadgeDetail
          title="среднее (раунд)"
          value={(player.legScores.length > 0 ? mean(player.legScores) : 0).toFixed(2)}
        />
        <PlayerBadgeDetail title="партии" value={player.legsWin} />
        <PlayerBadgeDetail title="сеты" value={player.setsWin} />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <div className="flex items-center gap-1 text-sm">
          <span>Последний ход:</span>
          <span className="font-semibold">{last(player.legScores) ?? 0}</span>
        </div>
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
    <Badge
      variant="secondary"
      className={cn('text-xs rounded-md font-normal justify-between', className)}
    >
      <span className="mr-1 opacity-80">{title}:</span>
      <span className="font-semibold">{value}</span>
    </Badge>
  );
};
