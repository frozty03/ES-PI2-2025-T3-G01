import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async criarCurso(dto: CriarCursoDto): Promise<ListarCursoDto> {
    const instituicao = await this.instituicaoRepository.findOne({
      where: { id: dto.idInstituicao },
      relations: ['cursos'],
    });
    if (!instituicao) {
      throw new NotFoundException('Instituição não encontrada');
    }
    const curso = this.cursoRepository.create({ nome: dto.nome });
    await this.cursoRepository.save(curso);
    instituicao.cursos = [...(instituicao.cursos || []), curso];
    await this.instituicaoRepository.save(instituicao);
    return { id: curso.id, nome: curso.nome };
  }

  async listarCursosPorInstituicao(
    idInstituicao: string,
  ): Promise<ListarCursoDto[]> {
    const instituicao = await this.instituicaoRepository.findOne({
      where: { id: idInstituicao },
      relations: ['cursos'],
    });
    if (!instituicao) {
      throw new NotFoundException('Instituição não encontrada');
    }
    return (instituicao.cursos || []).map((curso) => ({
      id: curso.id,
      nome: curso.nome,
    }));
  }

  async deletarCurso(id: string): Promise<void> {
    const curso = await this.cursoRepository.findOne({ where: { id } });
    if (!curso) {
      throw new NotFoundException('Curso não encontrado');
    }
    await this.cursoRepository.remove(curso);
  }
}
