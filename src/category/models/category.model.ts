import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Book } from '../../book/models/book.model';
import { BookCategory } from '../../book_category/models/book_category.model';

interface CategoryAttrs {
  category_name: string;
  parent_category_id: number;
  status: boolean;
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Fantasy', description: 'Category name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category_name: string;

  @ApiProperty({ example: 1, description: 'Parent category ID' })
  @Column({
    type: DataType.INTEGER,
  })
  parent_category_id: number;

  @ApiProperty({ example: true, description: 'Category status' })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  status: boolean;

  @BelongsToMany(() => Book, () => BookCategory)
  book: Book[];
}
