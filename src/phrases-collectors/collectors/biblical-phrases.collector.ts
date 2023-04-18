import { Injectable } from '@nestjs/common';
import { formatText } from '@src/core/utils/format-text.util';
import { createHashMd5 } from '@src/core/utils/hash.util';
import {
  PhrasesCollector,
  IScrapeDataResponse,
  IParseDataResponse,
} from '@src/phrases-collectors/interface/collector.interface';
import { filterDuplicatedData } from '@src/phrases-collectors/utils/filter-data.util';
import { WebScrapingService } from '@src/web-scraping/services/web-scraping.service';

const URL = 'https://www.pensador.com/versiculos_biblicos/';

@Injectable()
export class BiblicalPhrasesCollector implements PhrasesCollector {
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

  parseData(data: IScrapeDataResponse[]): IParseDataResponse[] {
    return data.map((phrase: any) => {
      const formatedContent = formatText(phrase.content);

      return {
        content: formatedContent,
        phraseMaster: phrase.author,
        categoryName: 'Bíblicos',
        contentHash: createHashMd5(formatedContent),
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
