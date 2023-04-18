import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '@src/categories/repositories/category.repository';

@Injectable()
export class GetAvailableCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute() {
    return await this.categoryRepository.getAvailableCategories();
  }
}
