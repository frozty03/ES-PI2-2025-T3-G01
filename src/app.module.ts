import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.services';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { UserEntity } from './users/user.entity';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { InstituicaoModule } from './instituicoes/instituicao.module';
import { InstituicaoEntity } from './instituicoes/instituicao.entity';

@Module({
  imports: [
    UserModule,
    InstituicaoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
