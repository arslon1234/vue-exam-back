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

import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('book-views')
@Controller('book-view')
@ApiBearerAuth()
export class BookViewController {
  constructor(private readonly bookViewService: BookViewService) {}

  @ApiOperation({ summary: 'Create a new book view record' })
  @Post()
  create(@Body() createBookViewDto: CreateBookViewDto) {
    return this.bookViewService.create(createBookViewDto);
  }

  @ApiOperation({ summary: 'Get all book view records' })
  @Get()
  findAll() {
    return this.bookViewService.findAll();
  }

  @ApiOperation({ summary: 'Get a book view record by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Book view ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookViewService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a book view record by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Book view ID' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookViewDto: UpdateBookViewDto,
  ) {
    return this.bookViewService.update(+id, updateBookViewDto);
  }

  @ApiOperation({ summary: 'Delete a book view record by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Book view ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookViewService.remove(+id);
  }
}
