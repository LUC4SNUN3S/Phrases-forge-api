import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CategoriesModule } from '@src/categories/categories.module';
import { DatabaseModule } from '@src/database/database.module';
import { PhraseCollectorModule } from '@src/phrases-collectors/phrases-collector.module';
import { PhrasesModule } from '@src/phrases/phrases.module';
import { WebScrapingModule } from '@src/web-scraping/web-scraping.module';

@Module({
  imports: [
    DatabaseModule,
    PhrasesModule,
    CategoriesModule,
    PhraseCollectorModule,
    WebScrapingModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
