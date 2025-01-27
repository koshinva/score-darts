import { create } from 'zustand';
import { GameDartsStore } from './types/game.darts.store.types';
import { immer } from 'zustand/middleware/immer';
import { persist, devtools } from 'zustand/middleware';
import { parseMod } from '@/shared/helpers/parse.mod';
import { calculateWinner } from './lib/calculate.winner';
import { each, mean } from 'lodash';
import { toasterOnWinLeg } from './lib/toaster.on.win.leg';
import { toasterWarning } from './lib/toaster.warning';
import { initialGameDartsState } from './lib/initial.game.darts';
import { PlayerId, PlayerStatus } from '../types/player.game.types';
import { startPlayer } from './lib/start.player';
import { ReportPlayer } from '../types/report.type';
import { StepId } from '../types/steps.of.leg';
import { diapasons } from './lib/report.chart';

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
            modeGameDartsStoreConfig.generateNameAction('initGame'),
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
            modeGameDartsStoreConfig.generateNameAction('undoMove'),
          );
        },

        toggleModCalculator: () => {
          set(
            (state) => {
              const newMode = state.calculator.mode === 'simple' ? 'advanced' : 'simple';
              state.calculator.mode = newMode;
              if (newMode === 'simple') {
                const sumDds = state.calculator.dss.reduce((a, b) => a + b, 0);

                const player = state.players[state.move ?? ''];

                if (sumDds > 0 && player) {
                  player.progress += sumDds;
                }

                state.calculator.dss = [];
              } else {
                state.score = null;
              }
            },
            undefined,
            modeGameDartsStoreConfig.generateNameAction('toggleModCalculator'),
          );
        },

        setScoreCalculator: (value) => {
          set(
            (state) => {
              const current = (state.score ?? '').toString();
              const modify = Number(current + value.toString());
              if (modify > 180) {
                return;
              }
              state.score = modify;
            },
            undefined,
            modeGameDartsStoreConfig.generateNameAction('setScoreCalculator'),
          );
        },

        clearScoreCalculator: () => {
          set(
            (state) => {
              if (state.calculator.mode === 'simple') {
                state.score = null;
              } else {
                const sumDds = state.calculator.dss.reduce((a, b) => a + b, 0);
                state.calculator.dss = [];

                const player = state.players[state.move ?? ''];
                if (sumDds > 0 && player) {
                  player.progress += sumDds;
                }
              }
            },
            undefined,
            modeGameDartsStoreConfig.generateNameAction('clearScoreCalculator'),
          );
        },

        takeMove: (args) => {
          set(
            (state) => {
              const { isBust, isDss } = args;

              const player = state.players[state.move ?? ''];
              let score = state.score;

              const sumDds = state.calculator.dss.reduce((a, b) => a + b, 0);

              if (isBust) {
                score = 9999;
                if (sumDds > 0 && player) {
                  player.progress += sumDds;
                }
              } else if (isDss) {
                score = sumDds;
              }

              if (!player || score === null) return;

              const diff = player.progress - score;

              const stepId = crypto.randomUUID() as StepId;
              state.stepsOfLeg.push({
                id: stepId,
                playerId: player.id,
                score: diff < 0 ? 0 : score,
                dss: isDss ? state.calculator.dss : undefined,
              });

              player.scores.push(diff < 0 ? 0 : score);

              if (isDss) {
                player.dss.push(...state.calculator.dss);
              }

              state.score = null;
              state.calculator.dss = [];

              if (diff > 0) {
                player.progress = diff;
                player.legScores.push(score);
                player.legSteps.push(stepId);

                state.move = state.order[player.id];

                return;
              }

              if (diff < 0) {
                player.legScores.push(0);
                player.legSteps.push(stepId);
                state.move = state.order[player.id];

                return;
              }

              if (diff === 0) {
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
            modeGameDartsStoreConfig.generateNameAction('takeMove'),
          );
        },

        generateReport: () => {
          set(
            (state) => {
              const repPlayers: ReportPlayer[] = [];

              each(state.players, (player, id) => {
                const chart = diapasons.map((diapason) => {
                  const { label, condition } = diapason;
                  return {
                    diapason: label,
                    count: player.scores.filter((s) => s >= condition[0] && s <= condition[1])
                      .length,
                  };
                });
                const repPlayer: ReportPlayer = {
                  id,
                  name: player.name,
                  avgScore: player.scores.length ? mean(player.scores) : 0,
                  maxScore: player.scores.length ? Math.max(...player.scores) : 0,
                  winSets: player.setsWin,
                  winLegs: player.legsWin,
                  maxDs: player.dss.length ? Math.max(...player.dss) : null,
                  avgDs: player.dss.length ? mean(player.dss) : null,
                  countStep: player.scores.length,
                  chart,
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
            modeGameDartsStoreConfig.generateNameAction('generateReport'),
          );
        },

        changeMultiply: (value) => {
          set(
            (state) => {
              state.calculator.multiply = value;
            },
            undefined,
            modeGameDartsStoreConfig.generateNameAction('changeMultiply'),
          );
        },

        updateDss: (value) => {
          let takeMove;

          set(
            (state) => {
              const player = state.players[state.move ?? ''];

              if (!player) return;

              if (Number(value) === 25 && state.calculator.multiply === 3) {
                toasterWarning('Для 25 очков допустимо умножение только на 2');
                return;
              }
              const result = Number(value) * state.calculator.multiply;
              const sumDss = state.calculator.dss.reduce((a, b) => a + b, 0);
              const diff = player.progress - result;

              state.calculator.dss.push(result);

              if (state.calculator.dss.length === 3) {
                player.progress += sumDss;
                takeMove = true;
              } else {
                if (diff > 0) {
                  player.progress = diff;
                } else {
                  player.progress += sumDss;
                  takeMove = true;
                }
              }
            },
            undefined,
            modeGameDartsStoreConfig.generateNameAction('updateDss'),
          );

          return Boolean(takeMove);
        },

        reset: () => {
          set(
            initialGameDartsState,
            undefined,
            modeGameDartsStoreConfig.generateNameAction('reset'),
          );
        },
      })),
      {
        name: modeGameDartsStoreConfig.root,
      },
    ),
    {
      name: modeGameDartsStoreConfig.root,
    },
  ),
);
