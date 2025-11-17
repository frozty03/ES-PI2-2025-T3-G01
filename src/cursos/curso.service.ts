// Feito por: Lucas Presende e Davi Froza
import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CursoEntity } from './curso.entity';
import { InstituicaoEntity } from '../instituicoes/instituicao.entity';
import { CriarCursoDto } from './criar-curso.dto';
import { ListarCursoDto } from './listar-curso.dto';
import { DisciplinasEntity } from "../disciplinas/disciplinas.entity";
import { AtualizarCursoDto } from './atualizar-curso.dto';

/*
  Serviço que implementa a lógica de negócio para Cursos.

  Principais responsabilidades:
  - Criar curso associado a instituições e usuário.
  - Listar cursos pertencentes a uma instituição (verificando o user).
  - Remover curso (checando vínculos com disciplinas).
*/
@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(CursoEntity)
    private readonly cursoRepository: Repository<CursoEntity>,
    @InjectRepository(InstituicaoEntity)
    private readonly instituicaoRepository: Repository<InstituicaoEntity>,
    @InjectRepository(DisciplinasEntity)
  private readonly disciplinaRepository: Repository<DisciplinasEntity>
  ) {}

  // Cria um curso e vincula às instituições informadas (se forem do usuário)
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

  // Lista cursos de uma instituição, garantindo que a instituição esteja
  // associada ao userId informado (controle de acesso básico)
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

  // Remove um curso se o usuário tiver permissão e se não houver disciplinas vinculadas
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

    const disciplinasVinculadas = await this.disciplinaRepository
    .createQueryBuilder('disciplina')
    .innerJoin('disciplina.cursos', 'curso')
    .where('curso.id = :id', { id })
    .getCount();

    if (disciplinasVinculadas > 0) {
      throw new ConflictException('Não é possível excluir o curso: existem disciplinas vinculadas.');
    }
    await this.cursoRepository.remove(curso);
  }

  async buscarCursoId(id: string, userId: string): Promise<CursoEntity> {
            const curso = await this.cursoRepository
                .createQueryBuilder('curso')
                .innerJoin('curso.instituicoes', 'instituicao')
                .innerJoin('instituicao.users', 'user')
                .leftJoinAndSelect('curso.instituicoes', 'instituicoes')
                .where('curso.id = :id', { id })
                .andWhere('user.id = :userId', { userId })
                .getOne(); 
    
            if (!curso) {
                throw new NotFoundException('Curso não encontrado');
            }
    
            return curso;
        }
  
    async atualizarCurso(
            id: string,
            userId: string,
            atualizarCursoDTO: AtualizarCursoDto
        ): Promise<CursoEntity> {
            const curso = await this.buscarCursoId(id, userId);
    
            Object.assign(curso, {
                nome: atualizarCursoDTO.nome ?? curso.nome
            }); 
    
            return await this.cursoRepository.save(curso);
        }
}
