import { GameDartsState } from "../types/game.darts.store.types";

export const initialGameDartsState: GameDartsState = {
  initialized: false,
  players: {},
  order: [],
  move: null,
};
