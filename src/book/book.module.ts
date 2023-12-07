import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './models/book.model';

@Module({
  imports: [SequelizeModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
