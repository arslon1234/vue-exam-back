import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookViewDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 1, description: 'Book ID' })
  @IsNotEmpty()
  @IsNumber()
  book_id: number;
}
