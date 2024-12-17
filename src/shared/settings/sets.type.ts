import { z } from 'zod';
import { Option } from '../types/options';
import { ModFinish } from './mod.finish.type';

export const gameSetSchema = z.string();

const noSet: Option = {
  label: 'Без сетов',
  value: 'no',
};

const bestOfSets: Option[] = [3, 5, 7, 9, 11, 13, 15, 17, 21].map((value) => ({
  label: `${value}`,
  value: `${value}_bestOf` satisfies `${number}_${ModFinish}`,
}));

const firstOfSets: Option[] = Array.from({ length: 21 }, (_, i) => ({
  label: `${i + 1}`,
  value: `${i + 1}_firstOf` satisfies `${number}_${ModFinish}`,
}));

export const setsOptions = {
  noSet,
  bestOfSets,
  firstOfSets,
};
