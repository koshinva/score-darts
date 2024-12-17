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

const GameForm = () => {
  const form = useForm<GameFormType>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: defaultValues,
  });

  function onSubmit(values: GameFormType) {
    console.log(values);
  }

  return (
    <GameFormContainer>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <GameTypeGroup />
          <GameSetsSelect />
          <GameLegsSelect />
          <Button type="submit">Начать игру</Button>
        </form>
      </Form>
    </GameFormContainer>
  );
};

export default GameForm;
