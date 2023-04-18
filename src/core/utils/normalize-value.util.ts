export const normalizeValue = (value = '', separator = '-'): string => {
  if (typeof value === 'string') {
    const onlyLetters = value
      .normalize('NFD')
      .replace(/[\u0300-\u036f\*]/g, '');
    return onlyLetters
      .toLowerCase()
      .trim()
      .replace(/\s{1,}/g, separator);
  }

  return value;
};
