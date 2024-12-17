import { gameTypeSchema } from '@/shared/settings/game.type';
import { gameLegSchema } from '@/shared/settings/legs.type';
import { schemaPlayer } from '@/shared/settings/players';
import { gameSetSchema } from '@/shared/settings/sets.type';
import { z } from 'zod';

export const gameFormSchema = z.object({
  type: gameTypeSchema,
  sets: gameSetSchema,
  legs: gameLegSchema,
  players: z
    .array(schemaPlayer)
    .min(2, 'Укажите минимум 2 игрока')
    .max(4, 'Укажите максимум 4 игрока'),
});

export type GameFormType = z.infer<typeof gameFormSchema>;
