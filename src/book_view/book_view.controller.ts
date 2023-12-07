import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookViewService } from './book_view.service';
import { CreateBookViewDto } from './dto/create-book_view.dto';
import { UpdateBookViewDto } from './dto/update-book_view.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('book-view')
@ApiBearerAuth()
export class BookViewController {
  constructor(private readonly bookViewService: BookViewService) {}

  @Post()
  create(@Body() createBookViewDto: CreateBookViewDto) {
    return this.bookViewService.create(createBookViewDto);
  }

  @Get()
  findAll() {
    return this.bookViewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookViewService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookViewDto: UpdateBookViewDto,
  ) {
    return this.bookViewService.update(+id, updateBookViewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookViewService.remove(+id);
  }
}
