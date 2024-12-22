import { PlayerId } from './player.game.types';

export type ReportPlayer = {
  id: PlayerId;
  name: string;
  avgScore: number;
  maxScore: number;
  winSets: number;
  winLegs: number;
};

export type ReportType = {
  players: ReportPlayer[];
};
