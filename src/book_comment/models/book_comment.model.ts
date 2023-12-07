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

interface BookCommentAttrs {
  user_id: number;
  book_id: number;
  text: string;
}

@Table({ tableName: 'book_comments' }) 
export class BookComment extends Model<BookComment, BookCommentAttrs> {
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

  @ApiProperty({ example: 'Great book!', description: 'Comment text' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Book)
  book: Book;
}
