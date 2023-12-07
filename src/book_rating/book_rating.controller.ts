import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookRatingService } from './book_rating.service';
import { CreateBookRatingDto } from './dto/create-book_rating.dto';
import { UpdateBookRatingDto } from './dto/update-book_rating.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('book-rating')
@ApiBearerAuth()
export class BookRatingController {
  constructor(private readonly bookRatingService: BookRatingService) {}

  @Post()
  create(@Body() createBookRatingDto: CreateBookRatingDto) {
    return this.bookRatingService.create(createBookRatingDto);
  }

  @Get()
  findAll() {
    return this.bookRatingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookRatingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookRatingDto: UpdateBookRatingDto,
  ) {
    return this.bookRatingService.update(+id, updateBookRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookRatingService.remove(+id);
  }
}
