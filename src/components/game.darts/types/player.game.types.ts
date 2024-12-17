import { StepsId } from './steps.of.leg';

export type PlayerId = string;

export type PlayerStatus = {
  id: PlayerId;
  progress: number;
  lastScore: number;
  maxScore: number;
  name: string;
  avg: number;
  legAvg: number;
  setsWin: number;
  legsWin: number;
  legSteps: StepsId[];
};
