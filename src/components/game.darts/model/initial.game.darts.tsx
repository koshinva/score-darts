import { GameDartsState } from '../types/game.darts.store.types';

export const initialGameDartsState: GameDartsState = {
  initialized: false,
  players: {},
  order: [],
  move: null,
  legs: null,
  sets: null,
  stepsOfLeg: [],
  modCalculator: 'simple',
  scoreCalculator: null,
};
