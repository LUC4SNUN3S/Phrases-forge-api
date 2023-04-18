import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class WebScrapingService {
  private readonly logger = new Logger(WebScrapingService.name);

  async scrapeData(url: string): Promise<cheerio.CheerioAPI> {
    try {
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);
      this.logger.log(`Scraping successful from ${url}`);
      return $;
    } catch (error) {
      this.logger.error(`Error scraping data from ${url}`);
    }
  }
}
