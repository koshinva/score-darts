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
        mode: 'start',
        setMode: (mode) => {
          set(
            (state) => {
              state.mode = mode;
            },
            undefined,
            modeGameStoreConfig.generateNameAction('setMode')
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
