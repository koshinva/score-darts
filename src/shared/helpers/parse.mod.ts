import { ModFinish } from '../settings/mod.finish.type';

export const parseMod = (leg: string): { value: number; mod: ModFinish } => {
  const [value, mod] = leg.split('_') as [string, ModFinish];

  return { value: Number(value), mod };
};
