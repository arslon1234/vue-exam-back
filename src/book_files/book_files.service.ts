import { Length } from 'class-validator';
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
import { where } from 'sequelize';

@Injectable()
export class BookFilesService {
  constructor(
    @InjectModel(BookFile)
    private bookFileRepo: typeof BookFile,
    private fileService: FilesService,
  ) {}
  async create(createBookFileDto: CreateBookFileDto, files: any) {
    Object.defineProperties(createBookFileDto, {
      name: { enumerable: false },
      author_id: { enumerable: false },
      doc: { enumerable: false },
      docx: { enumerable: false },
      epub: { enumerable: false },
    });
    const fileImage = files.image?.length
      ? await this.fileService.createFile(files.image[0])
      : '';
    const filePdf = files.pdf?.length
      ? await this.fileService.createFile(files.pdf[0])
      : '';
    const fileDoc = files.doc?.length
      ? await this.fileService.createFile(files.doc[0])
      : '';
    const fileDocx = files.docx?.length
      ? await this.fileService.createFile(files.docx[0])
      : '';
    const fileEpub = files.epub?.length
      ? await this.fileService.createFile(files.epub[0])
      : '';
    const fileAudio = files.audio?.length
      ? await this.fileService.createFile(files.audio[0])
      : '';

    const book_file = await this.bookFileRepo.create({
      ...createBookFileDto,
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
    if (!check) {
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
    files: any,
  ): Promise<[number, BookFile[]]> {
    Object.defineProperties(updateBookFileDto, {
      id: { enumerable: false },
    });
    const book = await this.bookFileRepo.findByPk(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    // const updatedBook = await this.bookFileRepo.update(updateBookFileDto, {
    //   where: { id },
    //   returning: true,
    // });
    Object.defineProperties(updateBookFileDto, {
      name: { enumerable: false },
      author_id: { enumerable: false },
      doc: { enumerable: false },
      docx: { enumerable: false },
      epub: { enumerable: false },
    });
    const fileImage = files.image?.length
      ? await this.fileService.createFile(files.image[0])
      : '';
    const filePdf = files.pdf?.length
      ? await this.fileService.createFile(files.pdf[0])
      : '';
    const fileDoc = files.doc?.length
      ? await this.fileService.createFile(files.doc[0])
      : '';
    const fileDocx = files.docx?.length
      ? await this.fileService.createFile(files.docx[0])
      : '';
    const fileEpub = files.epub?.length
      ? await this.fileService.createFile(files.epub[0])
      : '';
    const fileAudio = files.audio?.length
      ? await this.fileService.createFile(files.audio[0])
      : '';

    const book_file = await this.bookFileRepo.update(
      {
        ...updateBookFileDto,
        image: fileImage,
        pdf_file: filePdf,
        doc_file: fileDoc,
        docx_file: fileDocx,
        epub_file: fileEpub,
        audio_file: fileAudio,
      },
      { where: { id }, returning: true },
    );
    if (!book_file) {
      throw new BadRequestException('Error while creating');
    }
    return book_file;
  }

  async remove(id: number) {
    const book = await this.bookFileRepo.findByPk(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const deletedBook = await this.bookFileRepo.destroy({
      where: { id },
    });
    return deletedBook;
  }
}
