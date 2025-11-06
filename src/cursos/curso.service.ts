import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CursoEntity } from './curso.entity';
import { InstituicaoEntity } from '../instituicoes/instituicao.entity';
import { CriarCursoDto } from './criar-curso.dto';
import { ListarCursoDto } from './listar-curso.dto';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(CursoEntity)
    private readonly cursoRepository: Repository<CursoEntity>,
    @InjectRepository(InstituicaoEntity)
    private readonly instituicaoRepository: Repository<InstituicaoEntity>,
  ) {}

  async criarCurso(dto: CriarCursoDto, userId: string): Promise<ListarCursoDto> {
    // buscar todas as instituições informadas
    const instituicoes = await this.instituicaoRepository.findBy({
      id: In(dto.instituicoesIds)
    });

    if (instituicoes.length !== dto.instituicoesIds.length) {
      throw new NotFoundException('Uma ou mais instituições não foram encontradas');
    }

    // validar se as instituicoes pertencem ao userId
    const instituicoesDoUser = await this.instituicaoRepository
      .createQueryBuilder('instituicao')
      .innerJoin('instituicao.users', 'user')
      .where('instituicao.id IN (:...ids)', { ids: dto.instituicoesIds })
      .andWhere('user.id = :userId', { userId })
      .getMany();

    if (instituicoesDoUser.length !== dto.instituicoesIds.length) {
      throw new UnauthorizedException('Uma ou mais instituições não pertencem a você');
    }

    const curso = this.cursoRepository.create({
      nome: dto.nome,
      instituicoes: instituicoes 
    });

    await this.cursoRepository.save(curso);

    return { 
      id: curso.id, 
      nome: curso.nome,
    };
  }

  async listarCursosPorInstituicao(
    idInstituicao: string,
    userId: string,
  ): Promise<ListarCursoDto[]> {
    const instituicao = await this.instituicaoRepository // validar por instituicao e user
      .createQueryBuilder('instituicao')
      .innerJoin('instituicao.users', 'user')
      .where('instituicao.id = :idInstituicao', { idInstituicao })
      .andWhere('user.id = :userId', { userId })
      .leftJoinAndSelect('instituicao.cursos', 'cursos')
      .getOne();

    if (!instituicao) {
      throw new NotFoundException('Instituição não encontrada');
    }
    return (instituicao.cursos || []).map((curso) => ({
      id: curso.id,
      nome: curso.nome,
    }));
  }

  async deletarCurso(id: string, userId: string): Promise<void> {
    const curso = await this.cursoRepository
      .createQueryBuilder('curso')
      .innerJoin('curso.instituicoes', 'instituicao')
      .innerJoin('instituicao.users', 'user')
      .where('curso.id = :id', { id })
      .andWhere('user.id = :userId', { userId })
      .getOne();

    if (!curso) {
      throw new NotFoundException('Curso não encontrado');
    }
    await this.cursoRepository.remove(curso);
  }
}
