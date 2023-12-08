import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsNumberString,
  Length,
  IsPositive,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'The Great Gatsby', description: 'Book name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 1, description: 'Author ID' })
  @IsNotEmpty()
  author_id: number;

  @ApiProperty({ example: 'Chapter 1', description: 'File name' })
  @IsNotEmpty()
  @IsString()
  second_name: string;

  @ApiProperty({ example: 1, description: 'Part number' })
  @IsNotEmpty()
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
  publish_year: number;
}
