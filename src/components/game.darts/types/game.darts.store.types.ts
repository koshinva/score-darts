import { GameFormType } from '@/components/game.form/model/schema';
import { PlayerId, PlayerStatus } from './player.game.types';
import { ModFinish } from '@/shared/settings/mod.finish.type';
import { ModCalculator } from './calculator.types';
import { StepsOfLeg } from './steps.of.leg';
import { GameType } from '@/shared/settings/game.type';

export type GameDartsState = {
  initialized: boolean;
  players: Record<PlayerId, PlayerStatus>;
  order: Record<PlayerId, PlayerId>;
  move: PlayerId | null;
  stepsOfLeg: StepsOfLeg[];
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
  modCalculator: ModCalculator;
  scoreCalculator: number | null;
};

export type GameDartsActions = {
  initGame: (form: GameFormType) => void;
  toggleModCalculator: () => void;
  setScoreCalculator: (value: number | string | null) => void;
  takeMove: () => void;
  undoMove: () => void;
  reset: () => void;
};

export type GameDartsStore = GameDartsState & GameDartsActions;
