export const formatText = (text: string) => {
  return text
    .replace(/\n/g, ' ')
    .replace(/\t/g, ' ')
    .replace(/\\/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};
