import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './models/book.model';
import { CategoryService } from 'src/category/category.service';
import { AuthorService } from 'src/author/author.service';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book)
    private bookRepo: typeof Book,
    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
    @Inject(forwardRef(() => AuthorService))
    private readonly authorService: AuthorService,
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
    const author = await this.authorService.findOne(createBookDto?.author_id);
    if (!author) {
      throw new BadRequestException('Author not found');
    }
    const category = await this.categoryService.findOne(createBookDto?.janr_id);
    if (!category) {
      throw new BadRequestException('Janr not found');
    }
    try {
      const book = await this.bookRepo.create(createBookDto);

      if (!book) {
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
    const book = await this.bookRepo.findByPk(id, { include: { all: true } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    Object.defineProperties(updateBookDto, {
      id: { enumerable: false },
    });

    const updatedBook = await this.bookRepo.update(updateBookDto, {
      where: { id },
    });

    console.log(updatedBook);
    return updatedBook;
  }

  async remove(id: number) {
    const deletedBook = await this.bookRepo.destroy({
      where: { id },
    });
    console.log(deletedBook);
    return deletedBook;
  }
}
