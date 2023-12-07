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

interface SavedAttrs {
  user_id: number;
  book_id: number;
}

@Table({ tableName: 'saved_books' })
export class Saved extends Model<Saved, SavedAttrs> {
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
  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: 1, description: 'Book ID' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Book)
  book_id: number;
  @BelongsTo(() => Book)
  book: Book;
}
