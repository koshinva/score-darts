import { z } from 'zod';

export const schemaPlayer = z.object({
  value: z.string().trim().min(1, 'Имя игрока должно быть не менее 1 символов'),
});
