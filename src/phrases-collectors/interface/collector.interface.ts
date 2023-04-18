export interface IParseDataResponse {
  content: string;
  contentHash: string;
  phraseMaster: string;
  categoryName: string;
}

export interface IScrapeDataResponse {
  content: string;
  author: string;
}

export interface PhrasesCollector {
  collectData(): Promise<IParseDataResponse[]>;
}
