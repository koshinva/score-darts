import { GameDartsState } from '../types/game.darts.store.types';

export const initialGameDartsState: GameDartsState = {
  initialized: false,
  players: {},
  order: {},
  move: null,
  type: null,
  legs: {
    total: null,
    type: null,
    current: 0,
  },
  sets: {
    total: null,
    type: null,
    current: 0,
  },
  winners: [[]],
  stepsOfLeg: [],
  modCalculator: 'simple',
  scoreCalculator: null,
  isFinal: false,
  report: null,
};
