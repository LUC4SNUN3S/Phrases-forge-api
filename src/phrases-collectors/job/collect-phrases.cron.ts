import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PhrasesCollectorService } from '@src/phrases-collectors/services/phrases-collectors.service';

@Injectable()
export class CollectPhrasesCron {
  private readonly logger = new Logger(CollectPhrasesCron.name);

  constructor(
    private readonly phrasesCollectorService: PhrasesCollectorService,
  ) {}

  @Cron(CronExpression.EVERY_WEEK)
  async handleCron() {
    this.logger.log('Run cron process to collect phrases');
    try {
      await this.phrasesCollectorService.execute();
      this.logger.log('Success to collect phrases cron');
    } catch (e) {
      console.log(e);

      this.logger.error('Error to collect phrases cron');
    }
  }
}
