import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ModeGameStore } from './mode.game.types';

const modeGameStoreConfig = {
  root: 'mode-game',
  generateNameAction: (action: string) => `[${modeGameStoreConfig.root}]:${action}`,
};

export const useModeGameStore = create<ModeGameStore>()(
  devtools(
    persist(
      immer((set) => ({
        initial: null,
        setInitial: (data) => {
          set(
            (state) => {
              state.initial = data;
            },
            undefined,
            modeGameStoreConfig.generateNameAction('setInitial')
          );
        },
      })),
      {
        name: modeGameStoreConfig.root,
      }
    ),
    {
      name: modeGameStoreConfig.root,
    }
  )
);
