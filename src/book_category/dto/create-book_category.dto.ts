import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookCategoryDto {
  @ApiProperty({ example: 1, description: 'Book ID' })
  @IsNotEmpty()
  @IsNumber()
  book_id: number;

  @ApiProperty({ example: 1, description: 'Category ID' })
  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @ApiProperty({ example: 1, description: 'Subcategory ID' })
  @IsNotEmpty()
  @IsNumber()
  subcategory_id: number;
}
