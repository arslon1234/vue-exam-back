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
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('saved-items')
@Controller('saved')
@ApiBearerAuth()
export class SavedController {
  constructor(private readonly savedService: SavedService) {}

  @ApiOperation({ summary: 'Create a new saved item' })
  @Post()
  create(@Body() createSavedDto: CreateSavedDto) {
    return this.savedService.create(createSavedDto);
  }

  @ApiOperation({ summary: 'Get all saved items' })
  @Get()
  findAll() {
    return this.savedService.findAll();
  }

  @ApiOperation({ summary: 'Get a saved item by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Saved item ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savedService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a saved item by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Saved item ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSavedDto: UpdateSavedDto) {
    return this.savedService.update(+id, updateSavedDto);
  }

  @ApiOperation({ summary: 'Delete a saved item by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Saved item ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savedService.remove(+id);
  }
}
