import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSavedDto } from './dto/create-saved.dto';
import { UpdateSavedDto } from './dto/update-saved.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Saved } from './models/saved.model';

@Injectable()
export class SavedService {
  constructor(
    @InjectModel(Saved)
    private savedRepo: typeof Saved,
  ) {}
  async create(createSavedDto: CreateSavedDto) {
    const check = await this.savedRepo.findOne({
      where: {
        book_id: createSavedDto.book_id,
        user_id: createSavedDto.user_id,
      },
    });
    if (check) {
      throw new BadRequestException('This book is already in saved list');
    }
    try {
      const saved = await this.savedRepo.create(createSavedDto);
      return saved;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<Saved[]> {
    return this.savedRepo.findAll({});
  }

  async findOne(id: number): Promise<Saved> {
    const check = await this.savedRepo.findByPk(id);
    if (!check) {
      throw new NotFoundException('Not found');
    }
    const saved = await this.savedRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return saved;
  }

  async update(
    id: number,
    updateSavedDto: UpdateSavedDto,
  ): Promise<[number, Saved[]]> {
    Object.defineProperties(updateSavedDto, {
      id: { enumerable: false },
    });
    const saved = await this.savedRepo.findByPk(id);
    if (!saved) {
      throw new NotFoundException('Saved not found');
    }
    const updatedSaved = await this.savedRepo.update(updateSavedDto, {
      where: { id },
      returning: true,
    });
    return updatedSaved;
  }

  async remove(id: number) {
    const saved = await this.savedRepo.findByPk(id);
    if (!saved) {
      throw new NotFoundException('Not found');
    }
    const deletedSaved = await this.savedRepo.destroy({
      where: { id },
    });
    return deletedSaved;
  }
}
