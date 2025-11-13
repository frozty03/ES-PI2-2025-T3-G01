import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DisciplinasEntity } from "./disciplinas.entity";
import { CursoEntity } from "src/cursos/curso.entity";
import { DisciplinaController } from "./disciplina.controller";
import { DisciplinaService } from "./disciplina.service";
import { TurmaEntity } from "src/turmas/turma.entity";
import { ComponenteNotaEntity } from "./componente-nota.entity";
import { ComponenteNotaService } from "./componente-nota.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([DisciplinasEntity, CursoEntity, TurmaEntity,ComponenteNotaEntity])
    ],
    controllers: [DisciplinaController],
    providers: [DisciplinaService, ComponenteNotaService],
    exports: [DisciplinaService]
})
export class DisciplinaModule {}