import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstituicaoEntity } from './instituicao.entity';
import { CreateInstituicaoDto } from './criarInstituicao.dto';
import { ListInstituicoesByUserDto } from './list-instituicoes-by-user.dto';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class InstituicaoService {
  constructor(
    @InjectRepository(InstituicaoEntity)
    private readonly instituicaoRepository: Repository<InstituicaoEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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

    await this.instituicaoRepository.delete(instituicaoId);
    return { success: true };
  }
}
