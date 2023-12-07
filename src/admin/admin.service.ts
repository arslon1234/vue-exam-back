import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Request, Response } from 'express';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { Admin } from './model/admin.model';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private adminRepository: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}
  async create(createAdminDto: CreateAdminDto, res: Response, req: Request) {
    const admin = await this.adminRepository.findOne({
      where: { login: createAdminDto.login },
    });
    if (admin) {
      throw new BadRequestException(
        'Admin with this username is already exists',
      );
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminRepository.create({
      ...createAdminDto,
      role: 'admin',
      password: hashed_password,
    });

    const tokens = await this.getTokens(newAdmin);

    const updatedAdmin = await this.updateRefreshToken(
      newAdmin.id,
      tokens.refresh_token,
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Admin registred',
      admin: updatedAdmin,
      tokens,
    };

    return response;
  }

  async getTokens(admin: Admin) {
    const jwtPayload = {
      id: admin.id,
      role: 'admin',
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshToken(
    adminId: number,
    refreshToken: string,
  ): Promise<Admin> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    const updatedAdmin = await this.adminRepository.update(
      {
        hashed_token: hashedRefreshToken,
      },
      {
        where: { id: adminId },
        returning: true,
      },
    );
    return updatedAdmin[1][0];
  }

  async findAll(): Promise<Admin[]> {
    const admins = await this.adminRepository.findAll({
      include: { all: true },
    });
    return admins;
  }

  async findOne(id: number): Promise<Admin> {
    const check = await this.adminRepository.findByPk(id);
    if (check) {
      throw new NotFoundException('Admin not found');
    }
    const admin = await this.adminRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return admin;
  }

  async update(
    id: number,
    updateAdminDto: UpdateAdminDto,
  ): Promise<[number, Admin[]]> {
    Object.defineProperties(updateAdminDto, {
      hashed_token: { enumerable: false },
      role: { enumerable: false },
      id: { enumerable: false },
    });
    const admin = await this.adminRepository.findByPk(id);
    if (admin) {
      throw new NotFoundException('Admin not found');
    }
    const updatedAdmin = await this.adminRepository.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return updatedAdmin;
  }

  async remove(id: number) {
    const admin = await this.adminRepository.findByPk(id);
    if (admin) {
      throw new NotFoundException('Admin not found');
    }
    const deletedAdmin = await this.adminRepository.destroy({
      where: { id },
    });
    return deletedAdmin;
  }
}
