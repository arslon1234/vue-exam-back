import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookCommentService } from './book_comment.service';
import { CreateBookCommentDto } from './dto/create-book_comment.dto';
import { UpdateBookCommentDto } from './dto/update-book_comment.dto';

import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('book-comments')
@Controller('book-comment')
@ApiBearerAuth()
export class BookCommentController {
  constructor(private readonly bookCommentService: BookCommentService) {}

  @ApiOperation({ summary: 'Create a new book comment' })
  @Post()
  create(@Body() createBookCommentDto: CreateBookCommentDto) {
    return this.bookCommentService.create(createBookCommentDto);
  }

  @ApiOperation({ summary: 'Get all book comments' })
  @Get()
  findAll() {
    return this.bookCommentService.findAll();
  }

  @ApiOperation({ summary: 'Get a book comment by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookCommentService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a book comment by ID' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookCommentDto: UpdateBookCommentDto,
  ) {
    return this.bookCommentService.update(+id, updateBookCommentDto);
  }

  @ApiOperation({ summary: 'Delete a book comment by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookCommentService.remove(+id);
  }
}
