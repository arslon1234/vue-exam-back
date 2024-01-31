import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './models/book.model';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [SequelizeModule.forFeature([Book]), AdminModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
