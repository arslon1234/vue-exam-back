import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Author } from 'src/author/models/author.model';
import { Category } from 'src/category/models/category.model';

interface BookAttrs {
  name: string;
  author_id: number;
}

@Table({ tableName: 'books' })
export class Book extends Model<Book, BookAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'The Great Gatsby', description: 'Book name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 1, description: 'Author ID' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Author)
  author_id: number;

  @BelongsTo(() => Author)
  author: Author;

  @ForeignKey(() => Category)
  janr_id: number;

  @BelongsTo(() => Category)
  janr: Category[];

  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;

  @Column({ type: DataType.STRING, allowNull: false })
  code: string;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
}
