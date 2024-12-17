import { useFormContext } from 'react-hook-form';
import { GameFormType } from '../model/schema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { gameType } from '@/shared/settings/game.type';

export const GameTypeGroup = () => {
  const form = useFormContext<GameFormType>();

  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-4">
          <FormLabel className="font-semibold text-xl">Тип игры</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex gap-6"
            >
              {gameType.map((type) => {
                return (
                  <FormItem key={type} className="flex items-center gap-1">
                    <FormControl>
                      <RadioGroupItem value={type} />
                    </FormControl>
                    <FormLabel className="font-normal text-lg">{type}</FormLabel>
                  </FormItem>
                );
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
