import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SavedService } from './saved.service';
import { CreateSavedDto } from './dto/create-saved.dto';
import { UpdateSavedDto } from './dto/update-saved.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('saved')
@ApiBearerAuth()
export class SavedController {
  constructor(private readonly savedService: SavedService) {}

  @Post()
  create(@Body() createSavedDto: CreateSavedDto) {
    return this.savedService.create(createSavedDto);
  }

  @Get()
  findAll() {
    return this.savedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSavedDto: UpdateSavedDto) {
    return this.savedService.update(+id, updateSavedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savedService.remove(+id);
  }
}
