import { z } from 'zod';

export const modSetSchema = z.union([z.literal('bestOf'), z.literal('firstTo'), z.literal('no')]);

export const gameSetSchema = z.object({
  mod: modSetSchema,
  value: z.number(),
});
