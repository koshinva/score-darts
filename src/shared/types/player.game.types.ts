import { StepId } from './steps.of.leg';

export type PlayerId = string;

export type PlayerStatus = {
  id: PlayerId;
  progress: number;
  scores: number[];
  dss: number[];
  legScores: number[];
  name: string;
  setsWin: number;
  legsWin: number;
  legSteps: StepId[];
};
