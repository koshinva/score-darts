import { useModeGameStore } from '@/components/game.mode/model/mode.game.store';

const GameDarts = () => {
  const initial = useModeGameStore((state) => state.initial);

  return (
    <div>
      <pre>{JSON.stringify(initial, null, 2)}</pre>
    </div>
  );
};

export default GameDarts;
