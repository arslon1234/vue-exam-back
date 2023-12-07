import { Module } from '@nestjs/common';
import { BookViewService } from './book_view.service';
import { BookViewController } from './book_view.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookView } from './models/book_view.model';

@Module({
  imports: [SequelizeModule.forFeature([BookView])],
  controllers: [BookViewController],
  providers: [BookViewService],
})
export class BookViewModule {}
