import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ example: 'John Doe', description: 'Author full name' })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({ example: '1990-01-01', description: 'Author birthdate' })
  @IsNotEmpty()
  @IsDateString()
  birthdate: Date;

  @ApiProperty({ example: 'United States', description: 'Author country' })
  @IsNotEmpty()
  @IsString()
  country: string;
}
