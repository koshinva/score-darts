import { z } from 'zod';
import { Option } from '../types/options';
import { ModFinish } from './mod.finish.type';

export const gameLegSchema = z.string();

const bestOfLegs: Option[] = [3, 5, 7, 9, 11, 13, 15, 17, 21].map((value) => ({
  label: `${value}`,
  value: `${value}_bestOf` satisfies `${number}_${ModFinish}`,
}));

const firstOfLegs: Option[] = Array.from({ length: 21 }, (_, i) => ({
  label: `${i + 1}`,
  value: `${i + 1}_firstOf` satisfies `${number}_${ModFinish}`,
}));

export const legsOptions = {
  bestOfLegs,
  firstOfLegs,
};
