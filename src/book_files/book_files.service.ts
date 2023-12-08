import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookFileDto } from './dto/create-book_file.dto';
import { UpdateBookFileDto } from './dto/update-book_file.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BookFile } from './models/book_file.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class BookFilesService {
  constructor(
    @InjectModel(BookFile)
    private bookFileRepo: typeof BookFile,
    private fileService: FilesService,
  ) {}
  async create(createBookFileDto: CreateBookFileDto, files: any, id: number) {
    console.log(files);
    Object.defineProperties(createBookFileDto, {
      name: { enumerable: false },
      author_id: { enumerable: false },
    });
    const fileImage = await this.fileService.createFile(files['image']);
    // console.log(fileImage);
    const filePdf = await this.fileService.createFile(files['pdf']);
    const fileDoc = files['doc']
      ? await this.fileService.createFile(files['doc'])
      : null;
    const fileDocx = files['docx']
      ? await this.fileService.createFile(files['docx'])
      : null;
    const fileEpub = files['epub']
      ? await this.fileService.createFile(files['epub'])
      : null;
    const fileAudio = files['audio']
      ? await this.fileService.createFile(files['audio'])
      : null;
    const book_file = await this.bookFileRepo.create({
      ...createBookFileDto,
      book_id: id,
      image: fileImage,
      pdf_file: filePdf,
      doc_file: fileDoc,
      docx_file: fileDocx,
      epub_file: fileEpub,
      audio_file: fileAudio,
    });
    if (!book_file) {
      throw new BadRequestException('Error while creating');
    }
    return book_file;
  }

  async findAll(): Promise<BookFile[]> {
    return this.bookFileRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<BookFile> {
    const check = await this.bookFileRepo.findByPk(id);
    if (check) {
      throw new NotFoundException('Book not found');
    }
    const book = await this.bookFileRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return book;
  }

  async update(
    id: number,
    updateBookFileDto: UpdateBookFileDto,
  ): Promise<[number, BookFile[]]> {
    Object.defineProperties(updateBookFileDto, {
      id: { enumerable: false },
    });
    const book = await this.bookFileRepo.findByPk(id);
    if (book) {
      throw new NotFoundException('Book not found');
    }
    const updatedBook = await this.bookFileRepo.update(updateBookFileDto, {
      where: { id },
      returning: true,
    });
    return updatedBook;
  }

  async remove(id: number) {
    const book = await this.bookFileRepo.findByPk(id);
    if (book) {
      throw new NotFoundException('Book not found');
    }
    const deletedBook = await this.bookFileRepo.destroy({
      where: { id },
    });
    return deletedBook;
  }
}
