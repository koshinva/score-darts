import { PlayerId, PlayerStatus } from '../types/player.game.types';

export const startPlayer = (name: string, progress: number): PlayerStatus => {
  const id = crypto.randomUUID() as PlayerId;

  return {
    id,
    progress,
    lastScore: 0,
    maxScore: 0,
    name,
    avg: 0,
    legAvg: 0,
    setsWin: 0,
    legsWin: 0,
    legSteps: [],
  };
};
