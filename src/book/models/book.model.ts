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
import { Author } from '../../author/models/author.model';
import { BookRating } from '../../book_rating/models/book_rating.model';
import { Saved } from '../../saved/models/saved.model';
import { BookView } from '../../book_view/models/book_view.model';
import { BookComment } from '../../book_comment/models/book_comment.model';
import { BookFile } from '../../book_files/models/book_file.model';
import { Category } from '../../category/models/category.model';
import { BookCategory } from '../../book_category/models/book_category.model';

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

  @HasMany(() => BookRating)
  bookRatings: BookRating[];

  @HasMany(() => BookView)
  bookView: BookView[];

  @HasMany(() => BookComment)
  bookComment: BookComment[];

  @HasMany(() => BookFile)
  bookFile: BookFile[];

  @BelongsToMany(() => Category, () => BookCategory)
  category: Category[];

  @HasMany(() => Saved)
  saved: Saved[];
}
