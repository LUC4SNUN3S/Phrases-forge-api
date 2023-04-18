import { Injectable, Logger } from '@nestjs/common';
import { CategoryRepository } from '@src/categories/repositories/category.repository';
import { BiblicalPhrasesCollector } from '@src/phrases-collectors/collectors/biblical-phrases.collector';
import { HumorPhrasesCollector } from '@src/phrases-collectors/collectors/humor-phrases.collector';
import { MotivationPhrasesCollector } from '@src/phrases-collectors/collectors/motivation-phrases.collector';
import { TechnologyPhrasesCollector } from '@src/phrases-collectors/collectors/technology-phrases.collector';
import {
  IParseDataResponse,
  PhrasesCollector,
} from '@src/phrases-collectors/interface/collector.interface';
import { PhraseRepository } from '@src/phrases/repositories/phrase.repository';

@Injectable()
export class PhrasesCollectorService {
  private readonly logger = new Logger(PhrasesCollectorService.name);

  private collectors: PhrasesCollector[];
  constructor(
    private readonly technologyPhrasesCollector: TechnologyPhrasesCollector,
    private readonly biblicalPhrasesCollector: BiblicalPhrasesCollector,
    private readonly motivationPhrasesCollector: MotivationPhrasesCollector,
    private readonly humorPhrasesCollector: HumorPhrasesCollector,
    private readonly phrasesRepository: PhraseRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {
    this.collectors = [
      this.technologyPhrasesCollector,
      this.biblicalPhrasesCollector,
      this.motivationPhrasesCollector,
      this.humorPhrasesCollector,
    ];
  }

  private async verifyPhrases(
    phrases: IParseDataResponse[],
  ): Promise<IParseDataResponse[]> {
    const phrasesToInsert: IParseDataResponse[] = [];

    for (const phrase of phrases) {
      const phraseExists = await this.phrasesRepository.getPhraseByHash(
        phrase.contentHash,
      );

      if (!phraseExists) {
        phrasesToInsert.push(phrase);
      }
    }

    return phrasesToInsert;
  }

  private async insertInDatabase(phrases: IParseDataResponse[]): Promise<void> {
    for (const phrase of phrases) {
      const category = await this.categoryRepository.getCategoryByAlias(
        phrase.categoryName,
      );

      this.phrasesRepository.createPhrase({
        categoryId: category.id,
        content: phrase.content,
        phraseMaster: phrase.phraseMaster,
        contentHash: phrase.contentHash,
      });
    }
  }

  private async collectPhrases(): Promise<IParseDataResponse[]> {
    const phrases = [];

    for (const collector of this.collectors) {
      const collectedPhrases = await collector.collectData();

      phrases.push(...collectedPhrases);
    }

    return phrases;
  }

  async execute(): Promise<void> {
    const phrases = await this.collectPhrases();

    const phrasesToInsert = await this.verifyPhrases(phrases);
    await this.insertInDatabase(phrasesToInsert);

    this.logger.debug('Phrases collected and inserted in database');
  }
}
