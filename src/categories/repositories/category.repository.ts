import { Injectable } from '@nestjs/common';
import { Category } from '@src/categories/entities/category.entity';
import { normalizeValue } from '@src/core/utils/normalize-value.util';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CategoryRepository {
  private repository: Repository<Category>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Category);
  }
  async getAvailableCategories(): Promise<Category[]> {
    return this.repository.find({
      select: ['id', 'name'],
    });
  }

  async getRandomCategory(): Promise<Category> {
    return this.repository
      .createQueryBuilder('category')
      .orderBy('RANDOM()')
      .take(1)
      .select(['category.id', 'category.name'])
      .getOne();
  }

  async getCategoryById(id: string): Promise<Category> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async getCategoryByAlias(alias: string): Promise<Category> {
    return this.repository.findOne({
      where: {
        alias: normalizeValue(alias),
      },
    });
  }
}
