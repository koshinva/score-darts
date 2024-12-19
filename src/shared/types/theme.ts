import { z } from 'zod';

export const schemaTheme = z.union([z.literal('light'), z.literal('dark')]);
export type TypeTheme = z.infer<typeof schemaTheme>;