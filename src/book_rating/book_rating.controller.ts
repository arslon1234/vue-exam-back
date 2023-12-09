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

import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('book-ratings')
@Controller('book-rating')
@ApiBearerAuth()
export class BookRatingController {
  constructor(private readonly bookRatingService: BookRatingService) {}

  @ApiOperation({ summary: 'Create a new book rating' })
  @Post()
  create(@Body() createBookRatingDto: CreateBookRatingDto) {
    return this.bookRatingService.create(createBookRatingDto);
  }

  @ApiOperation({ summary: 'Get all book ratings' })
  @Get()
  findAll() {
    return this.bookRatingService.findAll();
  }

  @ApiOperation({ summary: 'Get a book rating by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Book rating ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookRatingService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a book rating by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Book rating ID' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookRatingDto: UpdateBookRatingDto,
  ) {
    return this.bookRatingService.update(+id, updateBookRatingDto);
  }

  @ApiOperation({ summary: 'Delete a book rating by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Book rating ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookRatingService.remove(+id);
  }
}
