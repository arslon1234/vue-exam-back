import { NestModule, MiddlewareConsumer } from '@nestjs/common';

import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from './user/user.module';

import { ServeStaticModule } from '@nestjs/serve-static';

import { resolve } from 'path';

import * as cookieParser from 'cookie-parser';
import { Admin } from './admin/model/admin.model';
import { User } from './user/model/user.model';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { BookRatingModule } from './book_rating/book_rating.module';
import { SavedModule } from './saved/saved.module';
import { BookViewModule } from './book_view/book_view.module';
import { Saved } from './saved/models/saved.model';
import { BookView } from './book_view/models/book_view.model';
import { Author } from './author/models/author.model';
import { Book } from './book/models/book.model';
import { BookRating } from './book_rating/models/book_rating.model';
import { BookCommentModule } from './book_comment/book_comment.module';
import { BookComment } from './book_comment/models/book_comment.model';
import { CategoryModule } from './category/category.module';
import { BookCategoryModule } from './book_category/book_category.module';
import { BookFilesModule } from './book_files/book_files.module';
import { BookFile } from './book_files/models/book_file.model';
import { Category } from './category/models/category.model';
import { BookCategory } from './book_category/models/book_category.model';
import { ResponseLoggingMiddleware } from './middlewares/response-logging.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    JwtModule.register({
      global: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '../', 'media'),
      serveRoot: '/api/media',
      exclude: ['/api/media/index.html'],
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
      models: [
        Admin,
        User,
        Saved,
        BookView,
        Author,
        Book,
        BookRating,
        BookComment,
        BookFile,
        Category,
        BookCategory,
      ],
    }),
    AdminModule,
    UserModule,
    AuthorModule,
    BookModule,
    BookRatingModule,
    SavedModule,
    BookViewModule,
    BookCommentModule,
    CategoryModule,
    BookCategoryModule,
    BookFilesModule,
  ],
  controllers: [],
  providers: [],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     // Apply the middleware to all routes
//     // consumer.apply(ResponseLoggingMiddleware).forRoutes('*');
//     consumer.apply(cookieParser()).forRoutes('*');
//   }
// }
export class AppModule {}
