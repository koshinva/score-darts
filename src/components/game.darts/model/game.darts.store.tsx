import { create } from 'zustand';
import { GameDartsStore } from '../types/game.darts.store.types';
import { immer } from 'zustand/middleware/immer';
import { persist, devtools } from 'zustand/middleware';
import { initialGameDartsState } from './initial.game.darts';
import { startPlayer } from './start.player';
import { parseMod } from '@/shared/helpers/parse.mod';
import { StepsId } from '../types/steps.of.leg';
import { PlayerId, PlayerStatus } from '../types/player.game.types';
import { calculateWinner } from '../lib/calculate.winner';
import { ReportPlayer } from '../types/report.type';
import { each, mean } from 'lodash';
import { toasterOnWinLeg } from '../lib/toaster.on.win.leg';

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
                const winners = [];
                for (let i = 0; i < value; i++) {
                  winners.push([]);
                }
                state.winners = winners;
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
              if (state.stepsOfLeg.length === 0) return;

              const lastStep = state.stepsOfLeg.pop();
              const playerId = lastStep?.playerId;

              if (!playerId || !state.players[playerId]) return;

              const player = state.players[playerId];

              player.scores.pop();
              player.legSteps.pop();

              const lastScore = player.legScores.pop();
              player.progress = player.progress + (lastScore ?? 0);

              state.move = playerId;
            },
            undefined,
            modeGameDartsStoreConfig.generateNameAction('undoMove')
          );
        },

        toggleModCalculator: () => {
          set(
            (state) => {
              state.calculator.mode = state.calculator.mode === 'simple' ? 'advanced' : 'simple';
            },
            undefined,
            modeGameDartsStoreConfig.generateNameAction('toggleModCalculator')
          );
        },

        setScoreCalculator: (value) => {
          set(
            (state) => {
              if (value === null) {
                state.score = null;
                return;
              }
              const current = (state.score ?? '').toString();
              const modify = Number(current + value.toString());
              if (modify > 180) {
                return;
              }
              state.score = modify;
            },
            undefined,
            modeGameDartsStoreConfig.generateNameAction('setScoreCalculator')
          );
        },

        takeMove: (isBust) => {
          set(
            (state) => {
              const player = state.players[state.move ?? ''];
              const score = isBust ? 9999 : state.score;

              if (!player || score === null) return;

              const diff = player.progress - score;

              state.score = null;

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

                state.stepsOfLeg = [];

                toasterOnWinLeg(`${player.name} - победитель!`);

                const { final: finalSet } = calculateWinner({
                  current: state.legs.current,
                  playerWins: player.legsWin,
                  total: state.legs.total,
                  type: state.legs.type,
                });

                if (finalSet) {
                  if (state.sets.type === null) {
                    player.legsWin += 1;

                    state.winners[state.sets.current].push(player.id);

                    state.isFinal = true;
                  } else {
                    const { final: finalGame } = calculateWinner({
                      current: state.sets.current,
                      playerWins: player.setsWin,
                      total: state.sets.total,
                      type: state.sets.type,
                    });

                    if (finalGame) {
                      player.legsWin += 1;
                      player.setsWin += 1;

                      state.winners[state.sets.current].push(player.id);

                      state.isFinal = true;
                    } else {
                      state.winners[state.sets.current].push(player.id);

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

                  state.winners[state.sets.current].push(player.id);

                  state.move = player.id;
                }
              }
            },
            undefined,
            modeGameDartsStoreConfig.generateNameAction('takeMove')
          );
        },

        generateReport: () => {
          set(
            (state) => {
              const repPlayers: ReportPlayer[] = [];

              each(state.players, (player, id) => {
                const repPlayer: ReportPlayer = {
                  id,
                  name: player.name,
                  avgScore: player.scores.length ? mean(player.scores) : 0,
                  maxScore: player.scores.length ? Math.max(...player.scores) : 0,
                  winSets: player.setsWin,
                  winLegs: player.legsWin,
                };
                repPlayers.push(repPlayer);
              });

              if (!state.sets.type) {
                repPlayers.sort((a, b) => {
                  if (b.winLegs === a.winLegs) {
                    return b.avgScore - a.avgScore;
                  }
                  return b.winLegs - a.winLegs;
                });
              } else {
                repPlayers.sort((a, b) => {
                  if (b.winSets === a.winSets) {
                    if (b.winLegs === a.winLegs) {
                      return b.avgScore - a.avgScore;
                    }
                    return b.winLegs - a.winLegs;
                  }
                  return b.winSets - a.winSets;
                });
              }

              state.report = {
                players: repPlayers,
              };
            },
            undefined,
            modeGameDartsStoreConfig.generateNameAction('generateReport')
          );
        },

        changeMultiply: (value) => {
          set(
            (state) => {
              state.calculator.multiply = value;
            },
            undefined,
            modeGameDartsStoreConfig.generateNameAction('changeMultiply')
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
