import { z } from 'zod';
import { Option } from '../types/options';

export const gameLegSchema = z.string();

const bestOfLegs: Option[] = [3, 5, 7, 9, 11, 13, 15, 17, 21].map((value) => ({
  label: `${value}`,
  value: `${value}_bestOf`,
}));

const firstOfLegs: Option[] = Array.from({ length: 21 }, (_, i) => ({
  label: `${i + 1}`,
  value: `${i + 1}_firstOf`,
}));

export const legsOptions = {
  bestOfLegs,
  firstOfLegs,
};
