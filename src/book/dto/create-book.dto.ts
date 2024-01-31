import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsNumberString,
  Length,
  IsPositive,
  Min,
  IsUrl,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'The Great Gatsby', description: 'Book name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 1, description: 'Author ID' })
  @IsNumber()
  @Min(1)
  author_id: number;

  @ApiProperty({ example: 10000, description: 'Book price' })
  @IsNumber()
  @Min(1)
  price: number;

  @ApiProperty({ example: '10000', description: 'Book code' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 1, description: 'Author ID' })
  @IsNumber()
  @Min(1)
  janr_id: number;

  @ApiProperty({ example: 'link to book image', description: 'image' })
  @IsUrl()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ example: 'Introduction', description: 'Book description' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
