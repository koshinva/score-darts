import { GameFormType } from '@/components/game.form/model/schema';
import { PlayerId, PlayerStatus } from './player.game.types';
import { ModFinish } from '@/shared/settings/mod.finish.type';

export type GameDartsState = {
  initialized: boolean;
  players: Record<PlayerId, PlayerStatus>;
  order: PlayerId[];
  move: PlayerId | null;
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
};

export type GameDartsActions = {
  initGame: (form: GameFormType) => void;
  reset: () => void;
};

export type GameDartsStore = GameDartsState & GameDartsActions;
