import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { responseApiData } from '@src/core/utils/response.util';
import { GetPhraseByCategoryUseCase } from '@src/phrases/use-cases/get-phrase-by-category.usecase';

import { CategoryIdDto } from '../dtos/category-id.dto';
@ApiTags('Phrases')
@Controller('phrases')
export class PhrasesController {
  constructor(
    private readonly getPhraseByCategoryUseCase: GetPhraseByCategoryUseCase,
  ) {}

  @Get()
  async getPhraseByCategory(
    @Query()
    { categoryId }: CategoryIdDto,
  ) {
    const phrases = await this.getPhraseByCategoryUseCase.execute(categoryId);
    return responseApiData(phrases);
  }
}
