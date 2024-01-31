import { BadRequestException, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class FilesService {
  private readonly s3 = new S3Client({
    region: this.configService.getOrThrow<string>('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow<string>('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.getOrThrow<string>(
        'AWS_SECRET_ACCESS_KEY',
      ),
    },
  });

  constructor(private readonly configService: ConfigService) {}

  async uploadFile(file: any) {
    const file_types = ['jpg', 'jpeg', 'png'];
    if (file_types.includes(file.mimetype.split('/')[1])) {
    } else {
      throw new BadRequestException('File with such type not allowed');
    }

    try {
      const fileName = uuid.v4() + `.${file.mimetype.split('/')[1]}`;
      await this.s3.send(
        new PutObjectCommand({
          Bucket: this.configService.getOrThrow<string>('AWS_BUCKET'),
          Key: `images/${fileName}`,
          Body: file?.buffer,
          ACL: 'private',
        }),
      );

      return {
        link: this.configService.getOrThrow('AWS_BUCKET_URL') + fileName,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
