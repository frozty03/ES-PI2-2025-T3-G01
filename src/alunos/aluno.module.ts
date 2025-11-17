// Feito por: Davi Froza 

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TurmaEntity } from "src/turmas/turma.entity";
import { AlunoEntity } from "./aluno.entity";
import { AlunoController } from "./aluno.controller";
import { AlunoService } from "./aluno.service";


@Module({
    imports: [TypeOrmModule.forFeature([TurmaEntity, AlunoEntity])],
    providers: [AlunoService],
    controllers: [AlunoController],
    exports: [AlunoService],
})
export class AlunoModule {}