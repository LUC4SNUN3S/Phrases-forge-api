import { Injectable } from '@nestjs/common';
import { Phrase } from '@src/phrases/entities/phrase.entity';
import { DataSource, Repository } from 'typeorm';

interface IPhraseParams {
  categoryId: string;
  content: string;
  phraseMaster: string;
  contentHash: string;
}

@Injectable()
export class PhraseRepository {
  private repository: Repository<Phrase>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Phrase);
  }

  async getRandomPhraseByCategory(categoryId: string): Promise<any> {
    return this.repository
      .createQueryBuilder('phrase')
      .leftJoin('phrase.category', 'category')
      .where('phrase.categoryId = :categoryId', { categoryId })
      .orderBy('random')
      .take(1)
      .select([
        'phrase.id',
        'phrase.content',
        'phrase.phraseMaster',
        'category.name',
      ])
      .addSelect('RANDOM()', 'random')
      .getOne();
  }

  async getPhraseByHash(hash: string): Promise<Phrase> {
    return this.repository.findOne({
      where: { phraseHash: hash },
    });
  }

  async createPhrase(phrase: IPhraseParams): Promise<Phrase> {
    const newPhrase = this.repository.create({
      content: phrase.content,
      phraseHash: phrase.contentHash,
      phraseMaster: phrase.phraseMaster,
      categoryId: phrase.categoryId,
    });

    return this.repository.save(newPhrase);
  }
}
