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
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('book-files')
@ApiBearerAuth()
export class BookFilesController {
  constructor(private readonly bookFilesService: BookFilesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @Body() createBookFileDto: CreateBookFileDto,
    @UploadedFiles()
    files: any,
  ) {
    // console.log(createBookFileDto, doc_file);
    return this.bookFilesService.create(createBookFileDto, files);
  }

  @Get()
  findAll() {
    return this.bookFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookFilesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookFileDto: UpdateBookFileDto,
  ) {
    return this.bookFilesService.update(+id, updateBookFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookFilesService.remove(+id);
  }
}
