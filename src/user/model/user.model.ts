import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserAttrs {
  full_name: string;
  login: string;
  password: string;
  image: string;
  hashed_token: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @ApiProperty({ example: 'john_doe', description: 'User login/username' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  login: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: 'path/to/image.jpg',
    description: 'User profile image path',
  })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @ApiProperty({
    example: 'hashed_token',
    description: 'User hashed token',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_token: string;
}
