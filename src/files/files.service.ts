import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as path from 'path';
import * as uuid from 'uuid';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  async createFile(file: any): Promise<string> {

    const file_types = [
      'jpg',
      'jpeg',
      'png',
      'pdf',
      'msword',
      'vnd.openxmlformats-officedocument.wordprocessingml.document',
      'octet-stream',
      'mpeg',
    ];
    console.log(file.mimetype.split('/')[1]);
    if (file_types.includes(file.mimetype.split('/')[1])) {
    } else {
      throw new BadRequestException('File with such type not allowed');
    }
    try {
      const fileName = uuid.v4() + `.${file.mimetype.split('/')[1]}`;
      const filePath = path.resolve(__dirname, '../../', 'media');
      if (!fs.existsSync(file)) {
        fs.mkdir(filePath, { recursive: true }, (err) => {
          if (err) {
            throw new BadRequestException(err.message);
          }
        });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return `http://localhost:3000/api/media/${fileName}`;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
