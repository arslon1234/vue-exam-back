import { Module } from '@nestjs/common';
import { SavedService } from './saved.service';
import { SavedController } from './saved.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Saved } from './models/saved.model';

@Module({
  imports: [SequelizeModule.forFeature([Saved])],
  controllers: [SavedController],
  providers: [SavedService],
})
export class SavedModule {}
