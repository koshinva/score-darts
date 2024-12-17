import { GameFormType } from '@/components/game.form/model/schema';
import { PlayerId, PlayerStatus } from './player.game.types';

export type GameDartsState = {
  initialized: boolean;
  players: Record<PlayerId, PlayerStatus>;
};

export type GameDartsActions = {
  initGame: (form: GameFormType) => void;
  reset: () => void;
};

export type GameDartsStore = GameDartsState & GameDartsActions;
