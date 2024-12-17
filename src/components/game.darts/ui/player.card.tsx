import { PlayerId } from '../types/player.game.types';

type PlayerCardProps = {
  id: PlayerId;
};

export const PlayerCard = (props: PlayerCardProps) => {
  const { id } = props;

  return <div>{id}</div>;
};
