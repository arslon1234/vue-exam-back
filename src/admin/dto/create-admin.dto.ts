import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'John Doe', description: 'Admin full name' })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({ example: 'john_doe', description: 'Admin username' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'password123',
    description: 'Admin password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
