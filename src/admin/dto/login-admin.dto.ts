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
    example: 'jhonedoe',
    description: 'Admin login ',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    example: 'password',
    description: 'Admin password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
