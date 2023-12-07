import { Module } from '@nestjs/common';
import { BookRatingService } from './book_rating.service';
import { BookRatingController } from './book_rating.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookRating } from './models/book_rating.model';

@Module({
  imports: [SequelizeModule.forFeature([BookRating])],
  controllers: [BookRatingController],
  providers: [BookRatingService],
})
export class BookRatingModule {}
