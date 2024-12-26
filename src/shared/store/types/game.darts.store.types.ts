import { GameFormType } from '@/components/game.form/model/schema';
import { ModFinish } from '@/shared/settings/mod.finish.type';
import { GameType } from '@/shared/settings/game.type';
import { PlayerId, PlayerStatus } from '@/shared/types/player.game.types';
import { Step } from '@/shared/types/steps.of.leg';
import { ReportType } from '@/shared/types/report.type';
import { ModeCalculator, MultiplyCalculator } from '@/shared/types/calculator.types';

export type GameDartsState = {
  initialized: boolean;
  players: Record<PlayerId, PlayerStatus>;
  order: Record<PlayerId, PlayerId>;
  move: PlayerId | null;
  stepsOfLeg: Step[];
  type: GameType | null;
  legs: {
    total: number | null;
    type: ModFinish | null;
    current: number;
  };
  sets: {
    total: number | null;
    type: ModFinish | null;
    current: number;
  };
  winners: PlayerId[][];
  isFinal: boolean;
  report: ReportType | null;
  score: number | null;
  calculator: {
    mode: ModeCalculator;
    multiply: MultiplyCalculator;
    dss: number[];
  };
};

export type GameDartsActions = {
  initGame: (form: GameFormType) => void;
  toggleModCalculator: () => void;
  setScoreCalculator: (value: number | string) => void;
  clearScoreCalculator: () => void;
  takeMove: (args: { isBust?: boolean; isDss?: boolean }) => void;
  undoMove: () => void;
  generateReport: () => void;
  changeMultiply: (value: MultiplyCalculator) => void;
  updateDss: (value: number | string) => boolean;
  reset: () => void;
};

export type GameDartsStore = GameDartsState & GameDartsActions;
