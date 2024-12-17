export type ModeGame = 'start' | 'game';

export type ModeGameState = {
  mode: ModeGame;
};

export type ModeGameActions = {
  setMode: (mode: ModeGame) => void;
};

export type ModeGameStore = ModeGameState & ModeGameActions;
