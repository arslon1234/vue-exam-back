import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { BookFilesService } from '../book_files/book_files.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('books')
@Controller('book')
@ApiBearerAuth()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Create a new book with files' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Book data with image, pdf, doc, docx, epub, and audio files',
    type: CreateBookDto,
  })
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'pdf', maxCount: 1 },
      { name: 'doc', maxCount: 1 },
      { name: 'docx', maxCount: 1 },
      { name: 'epub', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(
    @Body() createBookDto: CreateBookDto,
    @UploadedFiles()
    files: {
      image?: any;
      pdf?: any;
      doc?: any;
      docx?: any;
      epub?: any;
      audio?: any;
    },
  ) {
    return this.bookService.create(createBookDto, files);
  }

  @ApiOperation({ summary: 'Get all books' })
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @ApiOperation({ summary: 'Get a book by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a book by ID' })
  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'pdf', maxCount: 1 },
      { name: 'doc', maxCount: 1 },
      { name: 'docx', maxCount: 1 },
      { name: 'epub', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @UploadedFiles()
    files: {
      image?: any;
      pdf?: any;
      doc?: any;
      docx?: any;
      epub?: any;
      audio?: any;
    },
  ) {
    return this.bookService.update(+id, updateBookDto,files);
  }

  @ApiOperation({ summary: 'Delete a book by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
