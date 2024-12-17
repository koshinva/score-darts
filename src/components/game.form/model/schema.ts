import { gameTypeSchema } from '@/shared/settings/game.type';
import { gameLegSchema } from '@/shared/settings/legs.type';
import { gameSetSchema } from '@/shared/settings/sets.type';
import { z } from 'zod';

export const gameFormSchema = z.object({
  type: gameTypeSchema,
  sets: gameSetSchema,
  legs: gameLegSchema,
  players: z.array(z.string()).min(2).max(4),
});

export type GameFormType = z.infer<typeof gameFormSchema>;
