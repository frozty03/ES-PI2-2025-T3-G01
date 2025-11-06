import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoEntity } from './curso.entity';
import { OfereceCursoInstituicaoEntity } from './oferece-curso-instituicao.entity';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { InstituicaoEntity } from '../instituicoes/instituicao.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CursoEntity,
      OfereceCursoInstituicaoEntity,
      InstituicaoEntity,
    ]),
  ],
  providers: [CursoService],
  controllers: [CursoController],
})
export class CursoModule {}
