import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/model/user.model';
import { Book } from '../../book/models/book.model';
import { Category } from '../../category/models/category.model';

interface BookCategoryAttrs {
  book_id: number;
  category_id: number;
  subcategory_id: number;
}

@Table({ tableName: 'book_categories' })
export class BookCategory extends Model<BookCategory, BookCategoryAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Book ID' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Book)
  book_id: number;
  @BelongsTo(() => Book)
  book: Book;

  @ApiProperty({ example: 1, description: 'Category ID' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Category)
  category_id: number;
  @BelongsTo(() => Category)
  category: Category;

  @ApiProperty({ example: 1, description: 'Subcategory ID' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Category)
  subcategory_id: number;
  @BelongsTo(() => Category)
  subcategory: Category;
}
