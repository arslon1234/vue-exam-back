import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsPositive,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateBookFileDto {
  @ApiProperty({ example: 1, description: 'Book ID' })
  @IsNotEmpty()
  @IsNumberString()
  book_id: number;

  @ApiProperty({ example: 'Chapter 1', description: 'File name' })
  @IsNotEmpty()
  @IsString()
  second_name: string;

  @ApiProperty({ example: 1, description: 'Part number' })
  @IsNotEmpty()
  @IsNumberString()
  part: number;

  @ApiProperty({ example: 'Introduction', description: 'File description' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 355)
  description: string;

  @ApiProperty({ example: 300, description: 'Number of pages' })
  @IsNotEmpty()
  pages: number;

  @ApiProperty({ example: 2022, description: 'Year of publication' })
  @IsNotEmpty()
  // @Min(1000)
  publish_year: number;
}
