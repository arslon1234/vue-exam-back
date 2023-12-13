import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookViewDto } from './dto/create-book_view.dto';
import { UpdateBookViewDto } from './dto/update-book_view.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BookView } from './models/book_view.model';

@Injectable()
export class BookViewService {
  constructor(
    @InjectModel(BookView)
    private bookViewRepo: typeof BookView,
  ) {}

  async create(createBookViewDto: CreateBookViewDto) {
    const check = await this.bookViewRepo.findOne({
      where: {
        book_id: createBookViewDto.book_id,
        user_id: createBookViewDto.user_id,
      },
    });
    if (check) {
      throw new BadRequestException('View already registred');
    }
    try {
      const book_viewd = await this.bookViewRepo.create(createBookViewDto);
      return book_viewd;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<BookView[]> {
    return this.bookViewRepo.findAll({});
  }

  async findOne(id: number): Promise<BookView> {
    const check = await this.bookViewRepo.findByPk(id);
    if (!check) {
      throw new NotFoundException('Not found');
    }
    const book_viewd = await this.bookViewRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return book_viewd;
  }

  async update(
    id: number,
    updateBookViewDto: UpdateBookViewDto,
  ): Promise<[number, BookView[]]> {
    Object.defineProperties(updateBookViewDto, {
      id: { enumerable: false },
    });
    const book_viewd = await this.bookViewRepo.findByPk(id);
    if (!book_viewd) {
      throw new NotFoundException('BookView not found');
    }
    const updatedBookViewd = await this.bookViewRepo.update(updateBookViewDto, {
      where: { id },
      returning: true,
    });
    return updatedBookViewd;
  }

  async remove(id: number) {
    const book_viewd = await this.bookViewRepo.findByPk(id);
    if (!book_viewd) {
      throw new NotFoundException('Not found');
    }
    const deletedBookView = await this.bookViewRepo.destroy({
      where: { id },
    });
    return deletedBookView;
  }
}
