import { create } from 'zustand';
import { GameDartsStore } from '../types/game.darts.store.types';
import { immer } from 'zustand/middleware/immer';
import { persist, devtools } from 'zustand/middleware';
import { initialGameDartsState } from './initial.game.darts';
import { startPlayer } from './start.player';
import { parseMod } from '@/shared/helpers/parse.mod';

const modeGameDartsStoreConfig = {
  root: 'game-darts',
  generateNameAction: (action: string) => `[${modeGameDartsStoreConfig.root}]:${action}`,
};

export const useGameDartsStore = create<GameDartsStore>()(
  devtools(
    persist(
      immer((set) => ({
        ...initialGameDartsState,
        initGame: (form) => {
          set(
            (state) => {
              const { players, type, legs, sets } = form;

              const order = [];

              for (const { value } of players) {
                const player = startPlayer(value, Number(type));
                state.players[player.id] = player;
                order.push(player.id);
              }

              const { mod, value } = parseMod(legs);
              state.legs = { current: 0, type: mod, total: value };

              if (sets !== 'no') {
                const { mod, value } = parseMod(sets);
                state.sets = { current: 0, type: mod, total: value };
              }

              state.order = order;
              state.move = order[0];
              state.initialized = true;
            },
            undefined,
            modeGameDartsStoreConfig.generateNameAction('initGame')
          );
        },
        reset: () => {
          set(
            initialGameDartsState,
            undefined,
            modeGameDartsStoreConfig.generateNameAction('reset')
          );
        },
      })),
      {
        name: modeGameDartsStoreConfig.root,
      }
    ),
    {
      name: modeGameDartsStoreConfig.root,
    }
  )
);
