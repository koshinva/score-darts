import { PlayerId } from './player.game.types';

export type ReportPlayer = {
  id: PlayerId;
  name: string;
  avgScore: number;
  maxScore: number;
  winSets: number;
  winLegs: number;
  maxDs: number | null;
  avgDs: number | null;
  countStep: number;
  chart: { diapason: string; count: number }[];
};

export type ReportType = {
  players: ReportPlayer[];
};
