import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookCategoryDto } from './dto/create-book_category.dto';
import { UpdateBookCategoryDto } from './dto/update-book_category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BookCategory } from './models/book_category.model';

@Injectable()
export class BookCategoryService {
  constructor(
    @InjectModel(BookCategory)
    private bookCategoryRepo: typeof BookCategory,
  ) {}
  async create(createBookCategoryDto: CreateBookCategoryDto) {
    try {
      const bookRating = await this.bookCategoryRepo.create(
        createBookCategoryDto,
      );
      return bookRating;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<BookCategory[]> {
    return this.bookCategoryRepo.findAll({});
  }

  async findOne(id: number): Promise<BookCategory> {
    const check = await this.bookCategoryRepo.findByPk(id);
    if (check) {
      throw new NotFoundException('not found');
    }
    const bookRating = await this.bookCategoryRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return bookRating;
  }

  async update(
    id: number,
    updateBookCategoryDto: UpdateBookCategoryDto,
  ): Promise<[number, BookCategory[]]> {
    Object.defineProperties(updateBookCategoryDto, {
      id: { enumerable: false },
    });
    const bookRating = await this.bookCategoryRepo.findByPk(id);
    if (bookRating) {
      throw new NotFoundException('not found');
    }
    const updatedbookRating = await this.bookCategoryRepo.update(
      updateBookCategoryDto,
      {
        where: { id },
        returning: true,
      },
    );
    return updatedbookRating;
  }

  async remove(id: number) {
    const bookRating = await this.bookCategoryRepo.findByPk(id);
    if (bookRating) {
      throw new NotFoundException('not found');
    }
    const deletedbookRating = await this.bookCategoryRepo.destroy({
      where: { id },
    });
    return deletedbookRating;
  }
}
