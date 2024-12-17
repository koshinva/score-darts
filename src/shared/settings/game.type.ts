import { z } from 'zod';

export const gameTypeSchema = z.union([
  z.literal('101'),
  z.literal('301'),
  z.literal('501'),
  z.literal('701'),
  z.literal('1001'),
]);
export type GameType = z.infer<typeof gameTypeSchema>;

export const gameType: Array<GameType> = ['101', '301', '501', '701', '1001'];
