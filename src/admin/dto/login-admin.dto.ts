import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'Admin username ',
  })
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
