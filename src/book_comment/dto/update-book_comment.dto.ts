import { PartialType } from '@nestjs/swagger';
import { CreateBookCommentDto } from './create-book_comment.dto';

export class UpdateBookCommentDto extends PartialType(CreateBookCommentDto) {}
