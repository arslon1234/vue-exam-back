import { Module } from '@nestjs/common';
import { BookCommentService } from './book_comment.service';
import { BookCommentController } from './book_comment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookComment } from './models/book_comment.model';

@Module({
  imports: [SequelizeModule.forFeature([BookComment])],
  controllers: [BookCommentController],
  providers: [BookCommentService],
})
export class BookCommentModule {}
