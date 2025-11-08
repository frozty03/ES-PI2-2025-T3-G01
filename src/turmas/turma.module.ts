import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurmaEntity } from './turma.entity';
import { DisciplinasEntity } from "src/disciplinas/disciplinas.entity";
import { TurmaService } from './turma.service';
import { TurmasController } from './turma.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TurmaEntity,DisciplinasEntity])],
  providers: [TurmaService],
  controllers: [TurmasController],
  exports: [TurmaService],
})
export class InstituicaoModule {}