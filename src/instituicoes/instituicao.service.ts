import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstituicaoEntity } from './instituicao.entity';
import { CreateInstituicaoDto } from './criarInstituicao.dto';
import { ListInstituicoesByUserDto } from './list-instituicoes-by-user.dto';

@Injectable()
export class InstituicaoService {
  constructor(
    @InjectRepository(InstituicaoEntity)
    private readonly instituicaoRepository: Repository<InstituicaoEntity>,
  ) {}

  async createInstituicao(createInstituicaoDto: CreateInstituicaoDto) {
    const instituicao = this.instituicaoRepository.create({
      nome: createInstituicaoDto.nome,
      userId: createInstituicaoDto.userId,
    });

    await this.instituicaoRepository.save(instituicao);
    return instituicao;
  }

  async findByUserId(userId: string): Promise<ListInstituicoesByUserDto> {
    const instituicoes = await this.instituicaoRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    if (!instituicoes) {
      throw new UnauthorizedException(
        'Nenhuma instituição encontrada para este usuário',
      );
    }

    return {
      userId,
      instituicoes: instituicoes.map((inst) => ({
        id: inst.id,
        nome: inst.nome,
        createdAt: inst.createdAt,
        updatedAt: inst.updatedAt,
      })),
    };
  }
}
