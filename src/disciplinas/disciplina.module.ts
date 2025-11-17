import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DisciplinasEntity } from "./disciplinas.entity";
import { CursoEntity } from "src/cursos/curso.entity";
import { DisciplinaController } from "./disciplina.controller";
import { DisciplinaService } from "./disciplina.service";
import { TurmaEntity } from "src/turmas/turma.entity";
import { ComponenteNotaEntity } from "./componente-nota.entity";
import { ComponenteNotaService } from "./componente-nota.service";
import { ComponenteNotaController } from "./componente-nota.controller";
import { TurmaModule } from '../turmas/turma.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([DisciplinasEntity, CursoEntity, TurmaEntity,ComponenteNotaEntity]),
        TurmaModule
    ],
    controllers: [DisciplinaController,ComponenteNotaController],
    providers: [DisciplinaService, ComponenteNotaService],
    exports: [DisciplinaService]
})
export class DisciplinaModule {}