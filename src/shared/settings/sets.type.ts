import { z } from 'zod';
import { Option } from '../types/options';

export const gameSetSchema = z.string();

const noSet: Option = {
  label: 'Без сетов',
  value: 'no',
};

const bestOfSets: Option[] = [3, 5, 7, 9, 11, 13, 15, 17, 21].map((value) => ({
  label: `${value}`,
  value: `${value}_bestOf`,
}));

const firstOfSets: Option[] = Array.from({ length: 21 }, (_, i) => ({
  label: `${i + 1}`,
  value: `${i + 1}_firstOf`,
}));

export const setsOptions = {
  noSet,
  bestOfSets,
  firstOfSets,
};
