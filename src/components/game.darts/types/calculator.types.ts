export type ModeCalculator = 'simple' | 'advanced';

export const multiplyCalculator = [1, 2, 3] as const;

export type MultiplyCalculator = (typeof multiplyCalculator)[number];
