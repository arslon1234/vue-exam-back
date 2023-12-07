import { PartialType } from '@nestjs/swagger';
import { CreateSavedDto } from './create-saved.dto';

export class UpdateSavedDto extends PartialType(CreateSavedDto) {}
