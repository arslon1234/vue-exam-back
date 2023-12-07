import { PartialType } from '@nestjs/swagger';
import { CreateBookViewDto } from './create-book_view.dto';

export class UpdateBookViewDto extends PartialType(CreateBookViewDto) {}
