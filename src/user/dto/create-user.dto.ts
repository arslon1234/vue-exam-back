import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({ example: 'john_doe', description: 'User login/username' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'path/to/image.jpg',
    description: 'User profile image path',
  })
  @IsString()
  image: string;
}
