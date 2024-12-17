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
import { GameFormLabel } from './game.form.label';
import { legsOptions } from '@/shared/settings/legs.type';
import { GameFormMessage } from './game.form.message';

export const GameLegsSelect = () => {
  const form = useFormContext<GameFormType>();

  return (
    <FormField
      control={form.control}
      name="legs"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2">
          <GameFormLabel label="Партии" />
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Выберите количество партий" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>По лучшему</SelectLabel>
                {legsOptions.bestOfLegs.map((option) => {
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  );
                })}
              </SelectGroup>

              <SelectGroup>
                <SelectLabel>По первому</SelectLabel>
                {legsOptions.firstOfLegs.map((option) => {
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
