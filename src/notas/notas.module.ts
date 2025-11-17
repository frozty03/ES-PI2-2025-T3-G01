// Lucas Presendo Canhete
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoNotaEntity } from './aluno-nota.entity';
import { NotasService } from './notas.service';
import { NotasController } from './notas.controller';
import { AlunoEntity } from 'src/alunos/aluno.entity';
import { ComponenteNotaEntity } from 'src/disciplinas/componente-nota.entity';
import { TurmaEntity } from 'src/turmas/turma.entity';
import { DisciplinasEntity } from 'src/disciplinas/disciplinas.entity';

/*
  Módulo NestJS para o domínio de notas.

  - Importa entidades necessárias para o TypeORM.
  - Registra o `NotasService` como provider e o `NotasController`.
  - Exporta o serviço para uso em outros módulos, se necessário.
*/
@Module({
  imports: [
    TypeOrmModule.forFeature([
      AlunoNotaEntity,
      AlunoEntity,
      ComponenteNotaEntity,
      TurmaEntity,
      DisciplinasEntity,
    ]),
  ],
  providers: [NotasService],
  controllers: [NotasController],
  exports: [NotasService],
})
export class NotasModule {}
