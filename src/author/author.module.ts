import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from './models/author.model';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [SequelizeModule.forFeature([Author]), AdminModule],
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}
