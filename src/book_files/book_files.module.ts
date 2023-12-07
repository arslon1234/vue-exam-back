import { Module } from '@nestjs/common';
import { BookFilesService } from './book_files.service';
import { BookFilesController } from './book_files.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookFile } from './models/book_file.model';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [SequelizeModule.forFeature([BookFile]), FilesModule],
  controllers: [BookFilesController],
  providers: [BookFilesService],
})
export class BookFilesModule {}
