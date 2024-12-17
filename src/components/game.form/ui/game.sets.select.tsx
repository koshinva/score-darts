import { useFormContext } from 'react-hook-form';
import { GameFormType } from '../model/schema';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Select } from '@radix-ui/react-select';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { setsOptions } from '@/shared/settings/sets.type';
import { GameFormLabel } from './game.form.label';
import { GameFormMessage } from './game.form.message';

export const GameSetsSelect = () => {
  const form = useFormContext<GameFormType>();

  return (
    <FormField
      control={form.control}
      name="sets"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2">
          <GameFormLabel label="Сеты" />
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Выберите количество сетов" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectItem key={setsOptions.noSet.value} value={setsOptions.noSet.value}>
                {setsOptions.noSet.label}
              </SelectItem>

              <SelectGroup>
                <SelectLabel>По лучшему</SelectLabel>
                {setsOptions.bestOfSets.map((option) => {
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  );
                })}
              </SelectGroup>

              <SelectGroup>
                <SelectLabel>По первому</SelectLabel>
                {setsOptions.firstOfSets.map((option) => {
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <GameFormMessage />
        </FormItem>
      )}
    />
  );
};
