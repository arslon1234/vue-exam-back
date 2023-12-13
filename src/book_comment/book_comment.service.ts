import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookCommentDto } from './dto/create-book_comment.dto';
import { UpdateBookCommentDto } from './dto/update-book_comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BookComment } from './models/book_comment.model';

@Injectable()
export class BookCommentService {
  constructor(
    @InjectModel(BookComment)
    private bookCommentRepo: typeof BookComment,
  ) {}
  async create(createBookCommentDto: CreateBookCommentDto) {
    try {
      const bookComment = await this.bookCommentRepo.create(
        createBookCommentDto,
      );
      return bookComment;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<BookComment[]> {
    return this.bookCommentRepo.findAll({});
  }

  async findOne(id: number): Promise<BookComment> {
    const check = await this.bookCommentRepo.findByPk(id);
    if (!check) {
      throw new NotFoundException(' not found');
    }
    const bookComment = await this.bookCommentRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return bookComment;
  }

  async update(
    id: number,
    updateBookCommentDto: UpdateBookCommentDto,
  ): Promise<[number, BookComment[]]> {
    Object.defineProperties(updateBookCommentDto, {
      id: { enumerable: false },
    });
    const bookComment = await this.bookCommentRepo.findByPk(id);
    if (!bookComment) {
      throw new NotFoundException(' not found');
    }
    const updatedbookComment = await this.bookCommentRepo.update(
      updateBookCommentDto,
      {
        where: { id },
        returning: true,
      },
    );
    return updatedbookComment;
  }

  async remove(id: number) {
    const bookComment = await this.bookCommentRepo.findByPk(id);
    if (!bookComment) {
      throw new NotFoundException(' not found');
    }
    const deletedbookComment = await this.bookCommentRepo.destroy({
      where: { id },
    });
    return deletedbookComment;
  }
}
