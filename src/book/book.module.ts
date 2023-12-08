import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './models/book.model';
import { BookFilesModule } from '../book_files/book_files.module';
import { FilesModule } from '../files/files.module';
import { BookFile } from '../book_files/models/book_file.model';

@Module({
  imports: [SequelizeModule.forFeature([Book]), BookFilesModule, FilesModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
