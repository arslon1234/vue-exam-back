import {
  Controller,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/fie-upload.dto';
import { FilesService } from './files.service';
import { ValidFileValidator } from 'src/validators/file.validator';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Files')
@Controller('files')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'upload file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image (png, jpeg)*',
    type: FileUploadDto,
  })
  @Post('upload')
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new ValidFileValidator({})],
      }),
    )
    file: any,
  ) {
    return this.filesService.uploadFile(file);
  }
}
