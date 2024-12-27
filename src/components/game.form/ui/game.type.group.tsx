import { useFormContext } from 'react-hook-form';
import { GameFormType } from '../model/schema';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { gameType } from '@/shared/settings/game.type';
import { GameFormLabel } from './game.form.label';
import { GameFormMessage } from './game.form.message';

export const GameTypeGroup = () => {
  const form = useFormContext<GameFormType>();

  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2">
          <GameFormLabel label="Тип игры" />
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex gap-2 items-center"
            >
              {gameType.map((type) => {
                return (
                  <FormItem key={type} className="flex items-center gap-1">
                    <FormControl>
                      <RadioGroupItem value={type} className="peer hidden" />
                    </FormControl>
                    <FormLabel className="cursor-pointer rounded-sm border border-border px-4 py-2 font-normal shadow-sm hover:bg-muted peer-aria-checked:bg-muted peer-aria-checked:ring-1 peer-aria-checked:ring-ring/50">
                      {type}
                    </FormLabel>
                  </FormItem>
                );
              })}
            </RadioGroup>
          </FormControl>
          <GameFormMessage />
        </FormItem>
      )}
    />
  );
};
