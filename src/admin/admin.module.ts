import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeMethod } from 'sequelize/types/utils';
import { SequelizeModule } from '@nestjs/sequelize';

import { JwtModule } from '@nestjs/jwt';
import { Admin } from './model/admin.model';

@Module({
  imports: [SequelizeModule.forFeature([Admin]), JwtModule.register({})],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
