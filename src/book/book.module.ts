import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './models/book.model';
import { AdminModule } from 'src/admin/admin.module';
import { AuthorModule } from 'src/author/author.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Book]),
    AdminModule,
    AuthorModule,
    CategoryModule,
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
