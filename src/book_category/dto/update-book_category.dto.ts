import { PartialType } from '@nestjs/swagger';
import { CreateBookCategoryDto } from './create-book_category.dto';

export class UpdateBookCategoryDto extends PartialType(CreateBookCategoryDto) {}
