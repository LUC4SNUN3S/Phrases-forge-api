import { IParseDataResponse } from '@src/phrases-collectors/interface/collector.interface';

export const filterDuplicatedData = (
  phrases: IParseDataResponse[],
): IParseDataResponse[] => {
  const uniquePhrasesMap = new Map<string, IParseDataResponse>();

  for (const phrase of phrases) {
    uniquePhrasesMap.set(phrase.contentHash, phrase);
  }

  const uniquePhrasesArray = Array.from(uniquePhrasesMap.values());

  return uniquePhrasesArray;
};
