import { Module } from '@nestjs/common';
import { WebScrapingService } from '@src/web-scraping/services/web-scraping.service';

@Module({
  providers: [WebScrapingService],
  exports: [WebScrapingService],
})
export class WebScrapingModule {}
