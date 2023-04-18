import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAvailableCategoriesUseCase } from '@src/categories/use-cases/get-available-categories.usecase';
import { responseApiData } from '@src/core/utils/response.util';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly getAvailableCategoriesUseCase: GetAvailableCategoriesUseCase,
  ) {}

  @Get()
  async getAvailableCategories() {
    const categories = await this.getAvailableCategoriesUseCase.execute();
    return responseApiData(categories);
  }
}
