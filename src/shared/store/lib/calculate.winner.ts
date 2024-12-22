import { ModFinish } from '@/shared/settings/mod.finish.type';

type Args = {
  current: number;
  playerWins: number;
  total: number | null;
  type: ModFinish | null;
};

export const calculateWinner = (args: Args) => {
  const { current, playerWins, total, type } = args;

  const isBestOf = current + 1 === total && type === 'bestOf';
  const isFirstOf = playerWins + 1 === total && type === 'firstOf';

  return { isBestOf, isFirstOf, final: isBestOf || isFirstOf };
};
