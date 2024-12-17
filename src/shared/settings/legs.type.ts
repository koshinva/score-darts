import { z } from 'zod';

export const modLegSchema = z.union([z.literal('bestOf'), z.literal('firstTo'), z.literal('no')]);

export const gameLegSchema = z.object({
  mod: modLegSchema,
  value: z.number(),
});
