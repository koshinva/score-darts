import { GameForm } from '@/components/game.form';
import { useModeGameStore } from '../model/mode.game.store';
import { GameDarts } from '@/components/game.darts';

const GameMode = () => {
  const mode = useModeGameStore((state) => state.mode);

  return {
    start: () => <GameForm />,
    game: () => <GameDarts />,
  }[mode]();
};

export default GameMode;
