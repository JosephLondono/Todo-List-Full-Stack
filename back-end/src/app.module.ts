import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import configurationAuth from './configuration/auth.config';
import configurationUrl from './configuration/url.config';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurationAuth, configurationUrl],
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
