import { GameFormType } from './schema';

export const defaultValues: GameFormType = {
  type: '501',
  sets: {
    mod: 'no',
    value: 0,
  },
  legs: {
    mod: 'bestOf',
    value: 3,
  },
  players: [],
};
