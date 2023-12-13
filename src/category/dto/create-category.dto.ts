import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Fantasy', description: 'Category name' })
  @IsNotEmpty()
  @IsString()
  category_name: string;

  @ApiProperty({ example: 1, description: 'Parent category ID' })
  @IsNumber()
  @IsPositive()
  parent_category_id: number | null;

  @ApiProperty({ example: true, description: 'Category status' })
  @IsNotEmpty()
  status: boolean;
}
