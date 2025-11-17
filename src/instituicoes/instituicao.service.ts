// Lucas Presendo Canhete
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstituicaoEntity } from './instituicao.entity';
import { CreateInstituicaoDto } from './criarInstituicao.dto';
import { ListInstituicoesByUserDto } from './list-instituicoes-by-user.dto';
import { UserEntity } from '../users/user.entity';
import { CursoEntity } from '../cursos/curso.entity';

/*
  Serviço responsável por operações de CRUD/consulta para Instituições.

  Principais regras de negócio:
  - Ao criar, vincula a instituição ao usuário criador.
  - Ao listar por usuário, retorna apenas instituições associadas.
  - Ao deletar, verifica associação do usuário e ausência de cursos vinculados.
*/
@Injectable()
export class InstituicaoService {
  constructor(
    @InjectRepository(InstituicaoEntity)
    private readonly instituicaoRepository: Repository<InstituicaoEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CursoEntity)
    private readonly cursoRepository: Repository<CursoEntity>
  ) {}

  // criar instituição e associar obrigatoriamente a um usuário (userId do usuário logado)
  async createInstituicao(
    createInstituicaoDto: CreateInstituicaoDto,
    userId: string,
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const instituicao = this.instituicaoRepository.create({
      nome: createInstituicaoDto.nome,
      users: [user],
    });

    await this.instituicaoRepository.save(instituicao);
    return instituicao;
  }

  // Retorna uma lista simples de instituições associadas a um usuário
  async findByUserId(userId: string): Promise<ListInstituicoesByUserDto> {
    // procurar instituições associadas ao usuário via tabela associativa
    const instituicoes = await this.instituicaoRepository
      .createQueryBuilder('i')
      .innerJoin('i.users', 'u', 'u.id = :userId', { userId })
      .select(['i.id', 'i.nome'])
      .getMany();

    if (!instituicoes || instituicoes.length === 0) {
      throw new UnauthorizedException(
        'Nenhuma instituição encontrada para este usuário',
      );
    }

    return {
      userId,
      instituicoes: instituicoes.map((inst) => ({
        id: inst.id,
        nome: inst.nome,
      })),
    };
  }

  // Deleta uma instituição se o usuário estiver associado e não houver cursos vinculados
  async deleteInstituicao(instituicaoId: string, userId: string) {
    const instituicao = await this.instituicaoRepository.findOne({
      where: { id: instituicaoId },
      relations: ['users'],
    });
    if (!instituicao) throw new NotFoundException('Instituição não encontrada');

    const isAssociated = (instituicao.users || []).some((u) => u.id === userId);
    if (!isAssociated) {
      throw new UnauthorizedException(
        'Usuário não autorizado a deletar esta instituição',
      );
    }

    const cursosVinculados = await this.cursoRepository
    .createQueryBuilder('curso')
    .innerJoin('curso.instituicoes', 'instituicao')
    .where('instituicao.id = :id', { id: instituicaoId })
    .getCount();

    if (cursosVinculados > 0) {
      throw new ConflictException('Não é possível excluir a instituição: existem cursos vinculados.');
    }

    await this.instituicaoRepository.delete(instituicaoId);
    return { success: true };
  }
}
