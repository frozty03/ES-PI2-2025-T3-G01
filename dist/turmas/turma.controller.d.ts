import { TurmaService } from './turma.service';
import { CreateTurmaDto } from './dto/criarTurma.dto';
export declare class TurmasController {
    private turmaService;
    constructor(turmaService: TurmaService);
    create(userId: string, createTurmaDto: CreateTurmaDto): Promise<import("./turma.entity").TurmaEntity>;
}
