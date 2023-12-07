import { PartialType } from '@nestjs/swagger';
import { CreateBookFileDto } from './create-book_file.dto';

export class UpdateBookFileDto extends PartialType(CreateBookFileDto) {}
