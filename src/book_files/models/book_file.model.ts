import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Book } from '../../book/models/book.model';

interface BookFilesAttrs {
  book_id: number;
  second_name: string;
  image: string;
  part: number;
  description: string;
  pdf_file: string;
  epub_file: string;
  doc_file: string;
  docx_file: string;
  audio_file: string;
  pages: number;
  publish_year: number;
}

@Table({ tableName: 'book_files' })
export class BookFile extends Model<BookFile, BookFilesAttrs> {
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

  @ApiProperty({ example: 'Chapter 1', description: 'File name' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  second_name: string;

  @ApiProperty({ example: 'path/to/image.jpg', description: 'File image path' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

  @ApiProperty({ example: 1, description: 'Part number' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  part: number;

  @ApiProperty({ example: 'Introduction', description: 'File description' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: 'path/to/pdf_file.pdf',
    description: 'PDF file path',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  pdf_file: string;

  @ApiProperty({
    example: 'path/to/epub_file.epub',
    description: 'EPUB file path',
  })
  @Column({
    type: DataType.STRING,
  })
  epub_file: string;

  @ApiProperty({
    example: 'path/to/doc_file.doc',
    description: 'DOC file path',
  })
  @Column({
    type: DataType.STRING,
  })
  doc_file: string;

  @ApiProperty({
    example: 'path/to/docx_file.docx',
    description: 'DOCX file path',
  })
  @Column({
    type: DataType.STRING,
  })
  docx_file: string;

  @ApiProperty({
    example: 'path/to/audio_file.mp3',
    description: 'Audio file path',
  })
  @Column({
    type: DataType.STRING,
  })
  audio_file: string;

  @ApiProperty({ example: 200, description: 'Number of pages' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pages: number;

  @ApiProperty({ example: 2022, description: 'Publish year' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  publish_year: number;
}
