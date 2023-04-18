import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '@src/categories/categories.module';
import { PhraseCollectorModule } from '@src/phrases-collectors/phrases-collector.module';
import { PhrasesController } from '@src/phrases/controllers/phrases.controller';
import { Phrase } from '@src/phrases/entities/phrase.entity';
import { PhraseRepository } from '@src/phrases/repositories/phrase.repository';
import { GetPhraseByCategoryUseCase } from '@src/phrases/use-cases/get-phrase-by-category.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([Phrase]),
    CategoriesModule,
    forwardRef(() => PhraseCollectorModule),
  ],
  exports: [TypeOrmModule, PhraseRepository],
  controllers: [PhrasesController],
  providers: [PhraseRepository, GetPhraseByCategoryUseCase],
})
export class PhrasesModule {}
