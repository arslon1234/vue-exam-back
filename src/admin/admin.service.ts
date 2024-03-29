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
import { LoginAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private adminRepository: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAdminDto: CreateAdminDto, res: Response) {
    const admin = await this.adminRepository.findOne({
      where: { username: createAdminDto.username },
    });
    if (admin) {
      throw new BadRequestException(
        'User with this username is already exists',
      );
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminRepository.create({
      ...createAdminDto,
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
      message: 'successfully registered',
      admin: {
        id: updatedAdmin.id,
        full_name: updatedAdmin.full_name,
        username: updatedAdmin.username,
      },
      tokens,
    };

    return response;
  }

  async signin(loginAdminDto: LoginAdminDto, res: Response) {
    const admin = await this.adminRepository.findOne({
      where: { username: loginAdminDto.username },
    });
    if (!admin) {
      throw new BadRequestException('username or password is incorrect');
    }
    const isMatched = await bcrypt.compare(
      loginAdminDto.password,
      admin.password,
    );
    if (!isMatched) {
      throw new BadRequestException('username or password is incorrect');
    }

    const tokens = await this.getTokens(admin);

    const updatedAdmin = await this.updateRefreshToken(
      admin.id,
      tokens.refresh_token,
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'logged in',
      admin: {
        id: updatedAdmin.id,
        full_name: updatedAdmin.full_name,
        username: updatedAdmin.username,
      },
      tokens,
    };
    return response;
  }

  async getTokens(admin: Admin) {
    const jwtPayload = {
      id: admin.id,
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

  async findOne(id: number): Promise<Admin> {
    const check = await this.adminRepository.findByPk(id);
    if (!check) {
      throw new NotFoundException('Admin not found');
    }

    return check;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    Object.defineProperties(updateAdminDto, {
      hashed_token: { enumerable: false },
      role: { enumerable: false },
      id: { enumerable: false },
    });
    const admin = await this.adminRepository.findByPk(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    await this.adminRepository.update(updateAdminDto, {
      where: { id },
    });

    return { message: 'successfully updated' };
  }

  async logout(req: any, res: Response) {
    const user = req?.user;
    await this.adminRepository.update(
      { hashed_token: null },
      {
        where: {
          id: user?.id,
        },
      },
    );
    res.clearCookie('refresh_token');

    return { message: 'Logged out' };
  }
}
