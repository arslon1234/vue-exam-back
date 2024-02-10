import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Book } from '../../book/models/book.model';

interface AuthorAttrs {
  full_name: string;
  birthdate: Date;
  country: string;
  image: string;
}

@Table({ tableName: 'authors' })
export class Author extends Model<Author, AuthorAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'Author full name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @ApiProperty({ example: '1990-01-01', description: 'Author birthdate' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthdate: Date;

  @ApiProperty({ example: 'United States', description: 'Author country' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;

  @ApiProperty({
    example: 'path/to/author_image.jpg',
    description: 'Author profile image path',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @HasMany(() => Book)
  books: Book[];
}
