import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { FilesService } from '../files/files.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userRepo: typeof User,
    private readonly jwtService: JwtService,
    private fileService: FilesService,
  ) {}
  async create(
    createUserDto: CreateUserDto,
    res: Response,
    req: Request,
    image: any,
  ) {
    const user = await this.userRepo.findOne({
      where: { login: createUserDto.login },
    });
    if (user) {
      throw new BadRequestException(
        'User with this username is already exists',
      );
    }

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const fileName = await this.fileService.createFile(image);
    const newUser = await this.userRepo.create({
      ...createUserDto,
      password: hashed_password,
      image: fileName,
    });
    if (!newUser) {
      throw new BadRequestException('Error while creating');
    }
    const tokens = await this.getTokens(newUser);

    const updatedUser = await this.updateRefreshToken(
      newUser.id,
      tokens.refresh_token,
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User registred',
      user: updatedUser,
      tokens,
    };

    return response;
  }

  async getTokens(user: User) {
    const jwtPayload = {
      id: user.id,
      role: 'user',
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
    userId: number,
    refreshToken: string,
  ): Promise<User> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    const updatedUser = await this.userRepo.update(
      {
        hashed_token: hashedRefreshToken,
      },
      {
        where: { id: userId },
        returning: true,
      },
    );
    return updatedUser[1][0];
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepo.findAll({
      include: { all: true },
    });
    return users;
  }

  async findOne(id: number): Promise<User> {
    const check = await this.userRepo.findByPk(id);
    if (!check) {
      throw new NotFoundException('User not found');
    }
    const user = await this.userRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<[number, User[]]> {
    Object.defineProperties(updateUserDto, {
      hashed_token: { enumerable: false },
      role: { enumerable: false },
      id: { enumerable: false },
    });
    const user = await this.userRepo.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = await this.userRepo.update(updateUserDto, {
      where: { id },
      returning: true,
    });
    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.userRepo.findByPk(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const deletedUser = await this.userRepo.destroy({
      where: { id },
    });
    return deletedUser;
  }
}
