import { mean } from 'lodash';

export const getAverage = (list: number[], toFixed?: number) => {
  const result = list.length > 0 ? mean(list) : 0;
  if (toFixed !== undefined) {
    return result.toFixed(toFixed);
  }
  return result;
};
