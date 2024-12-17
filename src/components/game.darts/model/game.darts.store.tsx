import { create } from 'zustand';
import { GameDartsStore } from '../types/game.darts.store.types';
import { immer } from 'zustand/middleware/immer';
import { persist, devtools } from 'zustand/middleware';
import { initialGameDartsState } from './initial.game.darts';
import { startPlayer } from './start.player';

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
              const { players, type } = form;

              const order = [];

              for (const { value } of players) {
                const player = startPlayer(value, Number(type));
                state.players[player.id] = player;
                order.push(player.id);
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
