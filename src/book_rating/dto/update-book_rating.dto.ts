import { PartialType } from '@nestjs/swagger';
import { CreateBookRatingDto } from './create-book_rating.dto';

export class UpdateBookRatingDto extends PartialType(CreateBookRatingDto) {}
