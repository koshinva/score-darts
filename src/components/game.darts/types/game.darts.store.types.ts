import { GameFormType } from '@/components/game.form/model/schema';
import { PlayerId, PlayerStatus } from './player.game.types';
import { ModFinish } from '@/shared/settings/mod.finish.type';
import { ModCalculator } from './calculator.types';
import { StepsOfLeg } from './steps.of.leg';

export type GameDartsState = {
  initialized: boolean;
  players: Record<PlayerId, PlayerStatus>;
  order: PlayerId[];
  move: PlayerId | null;
  stepsOfLeg: StepsOfLeg[];
  legs: {
    total: number;
    type: ModFinish;
    current: number;
  } | null;
  sets: {
    total: number;
    type: ModFinish;
    current: number;
  } | null;
  modCalculator: ModCalculator;
  scoreCalculator: number | null;
};

export type GameDartsActions = {
  initGame: (form: GameFormType) => void;
  toggleModCalculator: () => void;
  setScoreCalculator: (value: number | string | null) => void;
  undoMove: () => void;
  reset: () => void;
};

export type GameDartsStore = GameDartsState & GameDartsActions;
