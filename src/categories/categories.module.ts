import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from '@src/categories/controllers/category.controller';
import { Category } from '@src/categories/entities/category.entity';
import { CategoryRepository } from '@src/categories/repositories/category.repository';
import { GetAvailableCategoriesUseCase } from '@src/categories/use-cases/get-available-categories.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [GetAvailableCategoriesUseCase, CategoryRepository],
  exports: [TypeOrmModule, CategoryRepository],
})
export class CategoriesModule {}
