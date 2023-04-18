import { createHash } from 'crypto';

export const createHashMd5 = (value: string): string => {
  return createHash('md5').update(value).digest('hex');
};
