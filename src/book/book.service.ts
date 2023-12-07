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

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book)
    private bookRepo: typeof Book,
  ) {}
  async create(createBookDto: CreateBookDto) {
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
    if (check) {
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
    if (book) {
      throw new NotFoundException('Book not found');
    }
    const updatedBook = await this.bookRepo.update(updateBookDto, {
      where: { id },
      returning: true,
    });
    return updatedBook;
  }

  async remove(id: number) {
    const book = await this.bookRepo.findByPk(id);
    if (book) {
      throw new NotFoundException('Book not found');
    }
    const deletedBook = await this.bookRepo.destroy({
      where: { id },
    });
    return deletedBook;
  }
}
