import { Category } from '@src/categories/entities/category.entity';
import { normalizeValue } from '@src/core/utils/normalize-value.util';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class populateCategories1681829069150 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Category, {
      name: 'Tecnologia',
      alias: normalizeValue('Tecnologia'),
    });
    await queryRunner.manager.insert(Category, {
      name: 'Bíblicos',
      alias: normalizeValue('Bíblicos'),
    });
    await queryRunner.manager.insert(Category, {
      name: 'Motivação',
      alias: normalizeValue('Motivação'),
    });
    await queryRunner.manager.insert(Category, {
      name: 'Humor',
      alias: normalizeValue('Humor'),
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
