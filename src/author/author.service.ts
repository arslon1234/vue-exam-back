import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './models/author.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author)
    private authorRepo: typeof Author,
    private fileService: FilesService,
  ) {}
  async create(createAuthorDto: CreateAuthorDto, image: any) {
    const check = await this.authorRepo.findOne({
      where: { full_name: createAuthorDto.full_name },
    });
    if (check) {
      throw new BadRequestException(
        'Author with this full name is already exists',
      );
    }
    try {
      const fileName = await this.fileService.createFile(image);
      const author = await this.authorRepo.create({
        ...createAuthorDto,
        image: fileName,
      });
      if (!author) {
        throw new BadRequestException('Error while creating');
      }
      return author;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll(): Promise<Author[]> {
    return this.authorRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Author> {
    const check = await this.authorRepo.findByPk(id);
    if (!check) {
      throw new NotFoundException('Author not found');
    }
    const author = await this.authorRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return author;
  }

  async update(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<[number, Author[]]> {
    Object.defineProperties(updateAuthorDto, {
      id: { enumerable: false },
    });
    const author = await this.authorRepo.findByPk(id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    const updatedAuthor = await this.authorRepo.update(updateAuthorDto, {
      where: { id },
      returning: true,
    });
    return updatedAuthor;
  }

  async remove(id: number) {
    const author = await this.authorRepo.findByPk(id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    const deletedAuthor = await this.authorRepo.destroy({
      where: { id },
    });
    return deletedAuthor;
  }
}
