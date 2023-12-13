import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookRatingDto } from './dto/create-book_rating.dto';
import { UpdateBookRatingDto } from './dto/update-book_rating.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BookRating } from './models/book_rating.model';

@Injectable()
export class BookRatingService {
  constructor(
    @InjectModel(BookRating)
    private bookRatingRepo: typeof BookRating,
  ) {}
  async create(createBookRatingDto: CreateBookRatingDto) {
    const check = await this.bookRatingRepo.findOne({
      where: {
        book_id: createBookRatingDto.book_id,
        user_id: createBookRatingDto.user_id,
      },
    });
    if (check) {
      throw new BadRequestException(
        'bookRatingwith this full name is already exists',
      );
    }
    try {
      const bookRating = await this.bookRatingRepo.create(createBookRatingDto);
      return bookRating;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<BookRating[]> {
    return this.bookRatingRepo.findAll({});
  }

  async findOne(id: number): Promise<BookRating> {
    const check = await this.bookRatingRepo.findByPk(id);
    if (!check) {
      throw new NotFoundException('Rating not found');
    }
    const bookRating = await this.bookRatingRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return bookRating;
  }

  async update(
    id: number,
    updateBookRatingDto: UpdateBookRatingDto,
  ): Promise<[number, BookRating[]]> {
    Object.defineProperties(updateBookRatingDto, {
      id: { enumerable: false },
    });



    const bookRating = await this.bookRatingRepo.findByPk(id);

    if (!bookRating) {
      throw new NotFoundException('Rating not found');
    }
    const updatedbookRating = await this.bookRatingRepo.update(
      updateBookRatingDto,
      {
        where: { id },
        returning: true,
      },
    );
    return updatedbookRating;
  }

  async remove(id: number) {



    const bookRating = await this.bookRatingRepo.findByPk(id);

    if (!bookRating) {
      throw new NotFoundException('Rating not found');
    }
    const deletedbookRating = await this.bookRatingRepo.destroy({
      where: { id },
    });
    return deletedbookRating;
  }
}
