import { z } from 'zod';

export const schemaPlayer = z.object({
  value: z.string().trim().min(3, 'Имя игрока должно быть не менее 3 символов'),
});
