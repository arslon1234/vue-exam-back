import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private categoryRepo: typeof Category,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const check = await this.categoryRepo.findOne({
      where: {
        category_name: createCategoryDto.category_name,
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
    return this.categoryRepo.findAll({});
  }

  async findOne(id: number): Promise<Category> {
    const check = await this.categoryRepo.findByPk(id);
    if (!check) {
      throw new NotFoundException('Not found');
    }
    const category = await this.categoryRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<[number, Category[]]> {
    Object.defineProperties(updateCategoryDto, {
      id: { enumerable: false },
    });
    const category = await this.categoryRepo.findByPk(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const updatedSaved = await this.categoryRepo.update(updateCategoryDto, {
      where: { id },
      returning: true,
    });
    return updatedSaved;
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findByPk(id);
    if (!category) {
      throw new NotFoundException('Not found');
    }
    const deletedSaved = await this.categoryRepo.destroy({
      where: { id },
    });
    return deletedSaved;
  }
}
