import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { LoginAdminDto } from './dto/login-admin.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Create a new admin' })
  @Post()
  create(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    return this.adminService.create(createAdminDto, res, req);
  }

  @ApiOperation({ summary: 'Sign in an admin' })
  @Post('signin')
  signin(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signin(loginAdminDto, res);
  }

  @ApiOperation({ summary: 'Get all admins' })
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Get an admin by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an admin by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Delete an admin by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
