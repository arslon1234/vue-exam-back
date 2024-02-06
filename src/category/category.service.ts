import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { AuthGuard } from 'src/guards/auth.guard';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private categoryRepo: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const check = await this.categoryRepo.findOne({
      where: {
        name: createCategoryDto.name,
      },
    });
    if (check) {
      throw new BadRequestException('This category is already exists');
    }
    try {
      const category = await this.categoryRepo.create(createCategoryDto);
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepo.findAll();
  }

  async findOne(id: number): Promise<Category> {
    const check = await this.categoryRepo.findByPk(id);
    if (!check) {
      throw new NotFoundException('Not found');
    }
    const category = await this.categoryRepo.findOne({
      where: { id: id },
      include: { all: true },
    });
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    Object.defineProperties(updateCategoryDto, {
      id: { enumerable: false },
    });

    const updatedSaved = await this.categoryRepo.update(updateCategoryDto, {
      where: { id: id },
    });
    console.log(updatedSaved);
    return updatedSaved;
  }

  async remove(id: number) {
    const deletedSaved = await this.categoryRepo.destroy({
      where: { id: id },
    });
    console.log(deletedSaved);
    return deletedSaved;
  }
}
