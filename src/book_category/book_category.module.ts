import { Module } from '@nestjs/common';
import { BookCategoryService } from './book_category.service';
import { BookCategoryController } from './book_category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookCategory } from './models/book_category.model';

@Module({
  imports: [SequelizeModule.forFeature([BookCategory])],
  controllers: [BookCategoryController],
  providers: [BookCategoryService],
})
export class BookCategoryModule {}
