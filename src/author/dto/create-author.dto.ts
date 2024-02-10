import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ example: 'John Doe', description: 'Author full name' })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({ example: '1990-12-31', description: 'Author birthdate' })
  @IsNotEmpty()
  @IsDateString()
  birthdate: Date;

  @ApiProperty({ example: 'United States', description: 'Author country' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ example: 'link to book image', description: 'image' })
  @IsUrl()
  @IsNotEmpty()
  image: string;
}
