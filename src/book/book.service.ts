import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './models/book.model';
import { FilesService } from '../files/files.service';
import { BookFile } from '../book_files/models/book_file.model';
import { BookFilesService } from '../book_files/book_files.service';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book)
    private bookRepo: typeof Book,
    private bookFileService: BookFilesService,
    private fileService: FilesService,
  ) {}
  async create(createBookDto: CreateBookDto, files: any) {
    const check = await this.bookRepo.findOne({
      where: { name: createBookDto.name },
    });
    if (check) {
      throw new BadRequestException(
        'Book with this full name is already exists',
      );
    }
    try {
      const book = await this.bookRepo.create(createBookDto);
      if (book) {
        const book_file = await this.bookFileService.create(
          {
            ...createBookDto,
            book_id: book.id,
            pages: +createBookDto.pages,
            publish_year: +createBookDto.publish_year,
            part: +createBookDto.part,
          },
          files,
        );
      } else {
        throw new InternalServerErrorException('Failed while creating');
      }
      return book;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Book> {
    const check = await this.bookRepo.findByPk(id);
    if (!check) {
      throw new NotFoundException('Book not found');
    }
    const book = await this.bookRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return book;
  }

  async update(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<[number, Book[]]> {
    Object.defineProperties(updateBookDto, {
      id: { enumerable: false },
    });
    const book = await this.bookRepo.findByPk(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const updatedBook = await this.bookRepo.update(updateBookDto, {
      where: { id },
      returning: true,
    });
    if (updatedBook) {
      const book_file = await this.bookFileService.update(
        updateBookDto.file_id,
        {
          ...updateBookDto,
        },
      );
    } else {
      throw new InternalServerErrorException('Failed while creating');
    }
    return updatedBook;
  }

  async remove(id: number) {
    const book = await this.bookRepo.findByPk(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const deletedBook = await this.bookRepo.destroy({
      where: { id },
    });
    return deletedBook;
  }
}
