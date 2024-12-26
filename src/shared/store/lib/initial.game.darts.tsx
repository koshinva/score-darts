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
  score: null,
  calculator: {
    mode: 'simple',
    multiply: 1,
    dss: [],
  },
  isFinal: false,
  report: null,
};
