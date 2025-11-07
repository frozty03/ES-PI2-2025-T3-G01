import { ConflictException, Injectable, UnauthorizedException, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TurmaEntity } from './turma.entity';
import { CreateTurmaDto } from './dto/criarTurma.dto';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class TurmaService {
  constructor(
    @InjectRepository(TurmaEntity)
    private readonly turmaRepository: Repository<TurmaEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // criar turma
  async createTurma(turmaCreateDto: CreateTurmaDto, userId: string,) {
        const codigoExiste = await this.turmaRepository.findOne({
            where: { cod: turmaCreateDto.cod },
        });

        if (codigoExiste) {
            throw new ConflictException('Turma já cadastrada');
        }

        // criando a turma
        const turma = this.turmaRepository.create({
            cod: turmaCreateDto.cod,
        });

        return await this.turmaRepository.save(turma); 
      }
      
}