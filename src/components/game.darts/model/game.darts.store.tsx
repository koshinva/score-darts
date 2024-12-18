import { create } from 'zustand';
import { GameDartsStore } from '../types/game.darts.store.types';
import { immer } from 'zustand/middleware/immer';
import { persist, devtools } from 'zustand/middleware';
import { initialGameDartsState } from './initial.game.darts';
import { startPlayer } from './start.player';
import { parseMod } from '@/shared/helpers/parse.mod';
import { StepsId } from '../types/steps.of.leg';
import { PlayerId, PlayerStatus } from '../types/player.game.types';

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
              const { players: formPlayers, type, legs, sets } = form;

              if (formPlayers.length < 2 || formPlayers.length > 4) {
                return;
              }

              const players = {} as Record<PlayerId, PlayerStatus>;
              const order = {} as Record<PlayerId, PlayerId>;

              for (const { value } of formPlayers) {
                const player = startPlayer(value, Number(type));
                players[player.id] = player;
              }

              const playerIds = Object.keys(players);
              for (let i = 0; i < playerIds.length; i++) {
                order[playerIds[i]] = playerIds[(i + 1) % playerIds.length];
              }

              const { mod, value } = parseMod(legs);
              state.legs = { current: 0, type: mod, total: value };

              if (sets !== 'no') {
                const { mod, value } = parseMod(sets);
                state.sets = { current: 0, type: mod, total: value };
              }

              state.players = players;
              state.order = order;
              state.move = playerIds[0];
              state.type = type;
              state.initialized = true;
            },
            undefined,
            modeGameDartsStoreConfig.generateNameAction('initGame')
          );
        },
        undoMove: () => {
          set(
            (state) => {
              console.log('undoMove', state);
            },
            undefined,
            modeGameDartsStoreConfig.generateNameAction('undoMove')
          );
        },

        toggleModCalculator: () => {
          set(
            (state) => {
              state.modCalculator = state.modCalculator === 'simple' ? 'advanced' : 'simple';
            },
            undefined,
            modeGameDartsStoreConfig.generateNameAction('toggleModCalculator')
          );
        },

        setScoreCalculator: (value) => {
          set(
            (state) => {
              if (value === null) {
                state.scoreCalculator = null;
                return;
              }
              const current = (state.scoreCalculator ?? '').toString();
              const modify = Number(current + value.toString());
              if (modify > 180) {
                return;
              }
              state.scoreCalculator = modify;
            },
            undefined,
            modeGameDartsStoreConfig.generateNameAction('setScoreCalculator')
          );
        },

        takeMove: () => {
          set(
            (state) => {
              const player = state.players[state.move ?? ''];
              const score = state.scoreCalculator;

              if (!player || score === null) return;

              const diff = player.progress - score;

              state.scoreCalculator = null;

              const stepId = crypto.randomUUID() as StepsId;
              state.stepsOfLeg.push({
                id: stepId,
                playerId: player.id,
                score: diff < 0 ? 0 : score,
              });

              if (diff > 0) {
                player.progress = player.progress - score;
                player.scores.push(score);
                player.legScores.push(score);
                player.legSteps.push(stepId);

                state.move = state.order[player.id];

                return;
              }

              if (diff < 0) {
                player.scores.push(0);
                player.legScores.push(0);
                player.legSteps.push(stepId);

                state.move = state.order[player.id];

                return;
              }

              if (diff === 0) {
                player.scores.push(score);

                const playerIds = Object.keys(state.players);

                for (const id of playerIds) {
                  state.players[id].legSteps = [];
                  state.players[id].legScores = [];
                  state.players[id].progress = Number(state.type);
                }

                const currentLeg = state.legs.current + 1;
                const selfLegsWin = state.players[player.id].legsWin + 1;
                const totalLegs = state.legs.total;
                const typeLegFinal = state.legs.type;

                const bestWinOfLegs = currentLeg === totalLegs && typeLegFinal === 'bestOf';
                const firstWinOfLegs = selfLegsWin === totalLegs && typeLegFinal === 'firstOf';

                if (bestWinOfLegs || firstWinOfLegs) {
                  if (state.sets.type === null) {
                    Object.assign(state, initialGameDartsState);
                    return;
                  } else {
                    const currentSet = state.sets.current + 1;
                    const selfSetsWin = state.players[player.id].setsWin + 1;
                    const totalSets = state.sets.total;
                    const typeSetFinal = state.sets.type;

                    const bestWinOfSets = currentSet === totalSets && typeSetFinal === 'bestOf';
                    const firstWinOfSets = selfSetsWin === totalSets && typeSetFinal === 'firstOf';

                    if (bestWinOfSets || firstWinOfSets) {
                      Object.assign(state, initialGameDartsState);
                      return;
                    } else {
                      state.sets.current += 1;
                      player.setsWin += 1;

                      state.legs.current = 0;
                      player.legsWin += 1;

                      state.move = player.id;
                    }
                  }
                } else {
                  state.legs.current += 1;
                  player.legsWin += 1;
                  state.move = player.id;
                }
              }
            },
            undefined,
            modeGameDartsStoreConfig.generateNameAction('takeMove')
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
