import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateBookCommentDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 1, description: 'Book ID' })
  @IsNotEmpty()
  @IsNumber()
  book_id: number;

  @ApiProperty({ example: 'Great book!', description: 'Comment text' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 355)
  text: string;
}
