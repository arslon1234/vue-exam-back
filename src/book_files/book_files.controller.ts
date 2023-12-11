import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UnsupportedMediaTypeException,
  UploadedFiles,
} from '@nestjs/common';
import { BookFilesService } from './book_files.service';
import { CreateBookFileDto } from './dto/create-book_file.dto';
import { UpdateBookFileDto } from './dto/update-book_file.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('book-files')
@Controller('book-files')
@ApiBearerAuth()
export class BookFilesController {
  constructor(private readonly bookFilesService: BookFilesService) {}

  @ApiOperation({ summary: 'Create a new book file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Book data with image, pdf, doc, docx, epub, and audio files',
    type: CreateBookFileDto,
  })
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Body() createBookFileDto: CreateBookFileDto,
    @UploadedFiles()
    files: any,
  ) {
    return this.bookFilesService.create(createBookFileDto, files);
  }

  @ApiOperation({ summary: 'Get all book files' })
  @Get()
  findAll() {
    return this.bookFilesService.findAll();
  }

  @ApiOperation({ summary: 'Get a book file by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Book file ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookFilesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a book file by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Book file ID' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookFileDto: UpdateBookFileDto,
  ) {
    return this.bookFilesService.update(+id, updateBookFileDto);
  }

  @ApiOperation({ summary: 'Delete a book file by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Book file ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookFilesService.remove(+id);
  }
}
