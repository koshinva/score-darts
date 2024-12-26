import { PlayerId } from './player.game.types';

export type StepId = string;

export type Step = {
  id: StepId;
  playerId: PlayerId;
  score: number;
  dss?: number[];
};
