import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstituicaoEntity } from './instituicao.entity';
import { InstituicaoService } from './instituicao.service';
import { InstituicaoController } from './instituicao.controller';
import { UserEntity } from '../users/user.entity';
import { CursoEntity } from '../cursos/curso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstituicaoEntity, UserEntity,CursoEntity])],
  providers: [InstituicaoService],
  controllers: [InstituicaoController],
  exports: [InstituicaoService],
})
export class InstituicaoModule {}
