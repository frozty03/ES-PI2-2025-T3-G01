import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DisciplinasEntity } from "./disciplinas.entity";
import { CursoEntity } from "src/cursos/curso.entity";
import { DisciplinaController } from "./disciplina.controller";
import { DisciplinaService } from "./disciplina.service";
import { TurmaEntity } from "src/turmas/turma.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([DisciplinasEntity, CursoEntity, TurmaEntity])
    ],
    controllers: [DisciplinaController],
    providers: [DisciplinaService],
    exports: [DisciplinaService]
})
export class DisciplinaModule {}