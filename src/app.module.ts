import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin/model/admin.model';
import { Author } from './author/models/author.model';
import { Book } from './book/models/book.model';
import { Category } from './category/models/category.model';
import { AdminModule } from './admin/admin.module';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    JwtModule.register({
      global: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      logging: false,
      models: [Admin, Author, Book, Category],
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '../', 'media'),
      serveRoot: '/api/media',
      exclude: ['/api/media/index.html'],
    }),
    AdminModule,
    AuthorModule,
    BookModule,
    CategoryModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
