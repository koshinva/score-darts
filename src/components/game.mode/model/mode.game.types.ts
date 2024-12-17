import { GameFormType } from '@/components/game.form/model/schema';

export type ModeGameState = {
  initial: null | GameFormType;
};

export type ModeGameActions = {
  setInitial: (data: ModeGameState['initial']) => void;
};

export type ModeGameStore = ModeGameState & ModeGameActions;
