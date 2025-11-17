// Lucas Presendo Canhete
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoEntity } from './curso.entity';
import { OfereceCursoInstituicaoEntity } from './oferece-curso-instituicao.entity';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { InstituicaoEntity } from '../instituicoes/instituicao.entity';
import { DisciplinasEntity } from "../disciplinas/disciplinas.entity";

/*
  Módulo para o domínio de Cursos.

  - Registra entidades relacionadas para o TypeORM.
  - Fornece o `CursoService` e o `CursoController`.
*/
@Module({
  imports: [
    TypeOrmModule.forFeature([
      CursoEntity,
      OfereceCursoInstituicaoEntity,
      InstituicaoEntity,
      DisciplinasEntity,
    ]),
  ],
  providers: [CursoService],
  controllers: [CursoController],
})
export class CursoModule {}
