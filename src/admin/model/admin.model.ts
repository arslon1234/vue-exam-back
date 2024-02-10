import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

interface AdminAttrs {
  full_name: string;
  login: string;
  password: string;
  role: string;
  hashed_token: string;
}

@Table({ tableName: 'admins', timestamps: false })
export class Admin extends Model<Admin, AdminAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'Admin full name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @ApiProperty({ example: 'john_doe', description: 'Admin login' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @ApiProperty({
    example: 'password',
    description: 'Admin password',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: 'hashed_token',
    description: 'Admin hashed token',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_token: string;
}
