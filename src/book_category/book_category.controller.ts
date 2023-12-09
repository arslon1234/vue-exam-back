import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookCategoryService } from './book_category.service';
import { CreateBookCategoryDto } from './dto/create-book_category.dto';
import { UpdateBookCategoryDto } from './dto/update-book_category.dto';

import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('book-categories')
@Controller('book-category')
@ApiBearerAuth()
export class BookCategoryController {
  constructor(private readonly bookCategoryService: BookCategoryService) {}

  @ApiOperation({ summary: 'Create a new book category' })
  @Post()
  create(@Body() createBookCategoryDto: CreateBookCategoryDto) {
    return this.bookCategoryService.create(createBookCategoryDto);
  }

  @ApiOperation({ summary: 'Get all book categories' })
  @Get()
  findAll() {
    return this.bookCategoryService.findAll();
  }

  @ApiOperation({ summary: 'Get a book category by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookCategoryService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a book category by ID' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookCategoryDto: UpdateBookCategoryDto,
  ) {
    return this.bookCategoryService.update(+id, updateBookCategoryDto);
  }

  @ApiOperation({ summary: 'Delete a book category by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookCategoryService.remove(+id);
  }
}
