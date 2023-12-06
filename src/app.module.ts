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
      models: [Admin, User],
    }),
    AdminModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply the middleware to all routes
    // consumer.apply(ResponseLoggingMiddleware).forRoutes('*');
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
// export class AppModule {}
