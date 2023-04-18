import { forwardRef, Module } from '@nestjs/common';
import { CategoriesModule } from '@src/categories/categories.module';
import { BiblicalPhrasesCollector } from '@src/phrases-collectors/collectors/biblical-phrases.collector';
import { HumorPhrasesCollector } from '@src/phrases-collectors/collectors/humor-phrases.collector';
import { MotivationPhrasesCollector } from '@src/phrases-collectors/collectors/motivation-phrases.collector';
import { TechnologyPhrasesCollector } from '@src/phrases-collectors/collectors/technology-phrases.collector';
import { PhrasesCollectorsController } from '@src/phrases-collectors/controllers/phrases-collectors.controller';
import { CollectPhrasesCron } from '@src/phrases-collectors/job/collect-phrases.cron';
import { PhrasesCollectorService } from '@src/phrases-collectors/services/phrases-collectors.service';
import { PhrasesModule } from '@src/phrases/phrases.module';
import { WebScrapingModule } from '@src/web-scraping/web-scraping.module';

@Module({
  imports: [
    WebScrapingModule,
    forwardRef(() => PhrasesModule),
    CategoriesModule,
  ],
  providers: [
    PhrasesCollectorService,
    TechnologyPhrasesCollector,
    BiblicalPhrasesCollector,
    MotivationPhrasesCollector,
    HumorPhrasesCollector,
    CollectPhrasesCron,
  ],
  exports: [PhrasesCollectorService],
  controllers: [PhrasesCollectorsController],
})
export class PhraseCollectorModule {}
