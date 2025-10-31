import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstituicaoEntity } from './instituicao.entity';
import { InstituicaoService } from './instituicao.service';
import { InstituicaoController } from './instituicao.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InstituicaoEntity])],
  providers: [InstituicaoService],
  controllers: [InstituicaoController],
  exports: [InstituicaoService],
})
export class InstituicaoModule {}
