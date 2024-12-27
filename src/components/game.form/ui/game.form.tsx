import { useForm } from 'react-hook-form';
import { type GameFormType, gameFormSchema } from '../model/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { GameTypeGroup } from './game.type.group';
import { defaultValues } from '../model/default.values';
import { GameFormContainer } from './game.form.container';
import { GameSetsSelect } from './game.sets.select';
import { GameLegsSelect } from './game.legs.select';
import { GamePlayersFields } from './game.players.fields';
import { useGameDartsStore } from '@/shared/store/game.darts.store';

const GameForm = () => {
  const initGame = useGameDartsStore((state) => state.initGame);

  const form = useForm<GameFormType>({
    reValidateMode: 'onChange',
    resolver: zodResolver(gameFormSchema),
    defaultValues: defaultValues,
  });

  const {
    formState: { disabled, isValid },
  } = form;

  function onSubmit(values: GameFormType) {
    initGame(values);
  }

  return (
    <GameFormContainer>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <GameTypeGroup />
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex-1 min-w-48">
              <GameSetsSelect />
            </div>
            <div className="flex-1 min-w-48">
              <GameLegsSelect />
            </div>
          </div>
          <GamePlayersFields />
          <Button type="submit" className="w-full" disabled={disabled || !isValid}>
            Начать игру
          </Button>
        </form>
      </Form>
    </GameFormContainer>
  );
};

export default GameForm;
