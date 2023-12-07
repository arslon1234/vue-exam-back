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

interface BookRatingAttrs {
  user_id: number;
  book_id: number;
  rating: number;
}

@Table({ tableName: 'book_ratings' })
export class BookRating extends Model<BookRating, BookRatingAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'User ID' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => User)
  user_id: number;

  @ApiProperty({ example: 1, description: 'Book ID' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Book)
  book_id: number;

  @ApiProperty({ example: 4.5, description: 'Book rating' })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  rating: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Book)
  book: Book;
}
