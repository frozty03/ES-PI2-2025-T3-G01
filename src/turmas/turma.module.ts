import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurmaEntity } from './turma.entity';
import { DisciplinasEntity } from "src/disciplinas/disciplinas.entity";
import { TurmaService } from './turma.service';
import { TurmasController } from './turma.controller';
import { AlunoEntity } from 'src/alunos/aluno.entity';
import { CsvParserService } from './csv-parser.service';

@Module({
  imports: [TypeOrmModule.forFeature([TurmaEntity,DisciplinasEntity, AlunoEntity])],
  providers: [TurmaService, CsvParserService],
  controllers: [TurmasController],
  exports: [TurmaService],
})
export class TurmaModule {}