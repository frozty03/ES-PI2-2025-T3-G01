import { Repository } from 'typeorm';
import { TurmaEntity } from './turma.entity';
import { CreateTurmaDto } from './dto/criarTurma.dto';
import { UserEntity } from '../users/user.entity';
export declare class TurmaService {
    private readonly turmaRepository;
    private readonly userRepository;
    constructor(turmaRepository: Repository<TurmaEntity>, userRepository: Repository<UserEntity>);
    createTurma(turmaCreateDto: CreateTurmaDto, userId: string): Promise<TurmaEntity>;
}
