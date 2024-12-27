import { useFieldArray, useFormContext } from 'react-hook-form';
import { GameFormType } from '../model/schema';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react';
import { GameFormLabel } from './game.form.label';
import { GameFormMessage } from './game.form.message';
import { declension } from '@/shared/helpers/declension';

export const GamePlayersFields = () => {
  const { control } = useFormContext<GameFormType>();

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'players',
  });

  return (
    <div className="flex flex-col gap-2">
      <GameFormLabel
        label={`${fields.length} ${declension(fields.length, ['игрок', 'игрока', 'игроков'])}`}
      />
      <ul className="flex flex-col gap-2">
        {fields.map((field, index) => {
          return (
            <li key={field.id}>
              <FormField
                control={control}
                name={`players.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Игрок {index + 1}
                      {index === 0 && ' (начинает)'}
                    </FormLabel>
                    <div className="flex gap-4 items-center justify-between">
                      <FormControl className="grow-1">
                        <Input
                          placeholder="Введите имя"
                          {...field}
                          value={field.value}
                          className="placeholder:text-sm text-sm"
                        />
                      </FormControl>
                      {index !== 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="shrink-0 self-end"
                          onClick={() => remove(index)}
                        >
                          <MinusCircleIcon />
                        </Button>
                      )}
                    </div>
                    <GameFormMessage />
                  </FormItem>
                )}
              />
            </li>
          );
        })}
      </ul>
      <Button
        type="button"
        className="flex items-center gap-2 self-start"
        variant="outline"
        disabled={fields.length >= 4}
        onClick={() => append({ value: '' })}
      >
        <PlusCircleIcon /> Добавить игрока
      </Button>
    </div>
  );
};
