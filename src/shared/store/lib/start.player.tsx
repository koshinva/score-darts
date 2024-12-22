import { PlayerId, PlayerStatus } from '@/shared/types/player.game.types';

export const startPlayer = (name: string, progress: number): PlayerStatus => {
  const id = crypto.randomUUID() as PlayerId;

  return {
    id,
    progress,
    scores: [],
    legScores: [],
    name,
    setsWin: 0,
    legsWin: 0,
    legSteps: [],
  };
};
