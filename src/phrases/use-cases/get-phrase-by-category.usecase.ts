import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '@src/categories/repositories/category.repository';
import { ApiNotfound } from '@src/core/exceptions/exceptions';
import { Phrase } from '@src/phrases/entities/phrase.entity';
import { PhraseRepository } from '@src/phrases/repositories/phrase.repository';

@Injectable()
export class GetPhraseByCategoryUseCase {
  constructor(
    private readonly phraseRepository: PhraseRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(categoryId: string): Promise<Phrase> {
    if (!categoryId) {
      const category = await this.categoryRepository.getRandomCategory();
      categoryId = category.id;
    }

    const phrase = await this.phraseRepository.getRandomPhraseByCategory(
      categoryId,
    );

    if (!phrase) {
      throw new ApiNotfound(
        'Ops! Frase não encontrada para essa categoria :/ ',
      );
    }

    return phrase;
  }
}
