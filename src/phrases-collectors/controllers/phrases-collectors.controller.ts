import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from '@src/phrases-collectors/guards/api-key.guard';
import { CollectPhrasesCron } from '@src/phrases-collectors/job/collect-phrases.cron';
@ApiTags('Collector')
@Controller('phrases-collectors')
export class PhrasesCollectorsController {
  constructor(private readonly collectPhrasesCron: CollectPhrasesCron) {}

  @ApiHeader({ name: 'x-api-key', required: true })
  @Post()
  @UseGuards(ApiKeyGuard)
  async collectPhrasesManual() {
    await this.collectPhrasesCron.handleCron();
  }
}
