import { Injectable } from '@nestjs/common';
import { formatText } from '@src/core/utils/format-text.util';
import { createHashMd5 } from '@src/core/utils/hash.util';
import {
  IParseDataResponse,
  IScrapeDataResponse,
  PhrasesCollector,
} from '@src/phrases-collectors/interface/collector.interface';
import { filterDuplicatedData } from '@src/phrases-collectors/utils/filter-data.util';
import { WebScrapingService } from '@src/web-scraping/services/web-scraping.service';

const URL = 'https://www.pensador.com/frases_de_motivacao/';

@Injectable()
export class MotivationPhrasesCollector implements PhrasesCollector {
  constructor(private readonly webScrapingService: WebScrapingService) {}

  private async scrapeData(): Promise<IScrapeDataResponse[]> {
    const phrases: IScrapeDataResponse[] = [];

    for (let index = 1; index < 11; index++) {
      const $ = await this.webScrapingService.scrapeData(`${URL}${index}`);

      $('.thought-card').each((i, element) => {
        phrases.push({
          content: $(element).find('.frase').text(),
          author: $(element).find('.author-name').text(),
        });
      });
    }
    return phrases;
  }

  private parseData(phrases: IScrapeDataResponse[]): IParseDataResponse[] {
    return phrases.map((phrase) => {
      const formatedContent = formatText(phrase.content);

      return {
        content: formatText(phrase.content),
        phraseMaster: phrase.author,
        contentHash: createHashMd5(formatedContent),
        categoryName: 'Motivação',
      };
    });
  }

  async collectData(): Promise<IParseDataResponse[]> {
    const phrases = await this.scrapeData();
    const parsedPhrases = this.parseData(phrases);
    const filteredPhrases = filterDuplicatedData(parsedPhrases);

    return filteredPhrases;
  }
}
