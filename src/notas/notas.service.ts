import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlunoNotaEntity } from './aluno-nota.entity';
import { AlunoEntity } from 'src/alunos/aluno.entity';
import { ComponenteNotaEntity } from 'src/disciplinas/componente-nota.entity';
import { TurmaEntity } from 'src/turmas/turma.entity';
import { DisciplinasEntity } from 'src/disciplinas/disciplinas.entity';
import { LancarNotaDTO } from './dto/lancar-nota.dto';
import * as fs from 'fs';
import * as path from 'path';

export interface AlunoComNotas {
  id: string;
  ra: string;
  nome: string;
  notas: { [componenteSigla: string]: number | null };
}


@Injectable()
export class NotasService {
  constructor(
    @InjectRepository(AlunoNotaEntity)
    private readonly alunoNotaRepository: Repository<AlunoNotaEntity>,
    @InjectRepository(AlunoEntity)
    private readonly alunoRepository: Repository<AlunoEntity>,
    @InjectRepository(ComponenteNotaEntity)
    private readonly componenteNotaRepository: Repository<ComponenteNotaEntity>,
    @InjectRepository(TurmaEntity)
    private readonly turmaRepository: Repository<TurmaEntity>,
    @InjectRepository(DisciplinasEntity)
    private readonly disciplinaRepository: Repository<DisciplinasEntity>,
  ) {}

  async lancarNota(lancarNotaDTO: LancarNotaDTO): Promise<AlunoNotaEntity> {
    // Validar se aluno existe
    const aluno = await this.alunoRepository.findOne({
      where: { id: lancarNotaDTO.idAluno },
    });
    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    // Validar se componente de nota existe
    const componente = await this.componenteNotaRepository.findOne({
      where: { id: lancarNotaDTO.idComponenteNota },
    });
    if (!componente) {
      throw new NotFoundException('Componente de nota não encontrado');
    }

    // Validar se turma existe
    const turma = await this.turmaRepository.findOne({
      where: { id: lancarNotaDTO.idTurma },
    });
    if (!turma) {
      throw new NotFoundException('Turma não encontrada');
    }

    // Verificar se aluno já possui nota para este componente nesta turma
    const notaExistente = await this.alunoNotaRepository.findOne({
      where: {
        aluno: { id: lancarNotaDTO.idAluno },
        componenteNota: { id: lancarNotaDTO.idComponenteNota },
        turma: { id: lancarNotaDTO.idTurma },
      },
    });

    if (notaExistente) {
      // Atualizar nota existente
      notaExistente.valor = lancarNotaDTO.valor ?? null;
      return await this.alunoNotaRepository.save(notaExistente);
    }

    // Criar nova nota
    const nota = this.alunoNotaRepository.create({
      aluno,
      componenteNota: componente,
      turma,
      valor: lancarNotaDTO.valor ?? null,
    });

    return await this.alunoNotaRepository.save(nota);
  }

  async validarNotasCompletas(
    turmaId: string,
    disciplinaId: string,
  ): Promise<{ completas: boolean; alunosIncompletos: string[] }> {
    // Buscar turma com alunos
    const turma = await this.turmaRepository.findOne({
      where: { id: turmaId },
      relations: ['alunos', 'disciplinas'],
    });

    if (!turma) {
      throw new NotFoundException('Turma não encontrada');
    }

    // Buscar componentes da disciplina
    const componentes = await this.componenteNotaRepository.find({
      where: { disciplina: { id: disciplinaId } },
    });

    if (componentes.length === 0) {
      throw new NotFoundException(
        'Nenhum componente de nota encontrado para esta disciplina',
      );
    }

    const alunosIncompletos: string[] = [];

    // Verificar para cada aluno se possui todas as notas
    for (const aluno of turma.alunos) {
      for (const componente of componentes) {
        const nota = await this.alunoNotaRepository.findOne({
          where: {
            aluno: { id: aluno.id },
            componenteNota: { id: componente.id },
            turma: { id: turmaId },
          },
        });

        // Se não existe nota ou o valor é null, adicionar aluno à lista de incompletos
        if (!nota || nota.valor === null) {
          alunosIncompletos.push(
            `${aluno.nome} (${aluno.ra}) - Componente: ${componente.sigla}`,
          );
          break; // Não precisa verificar outros componentes deste aluno
        }
      }
    }

    return {
      completas: alunosIncompletos.length === 0,
      alunosIncompletos,
    };
  }

  async exportarNotasCSV(
    turmaId: string,
    disciplinaId: string,
  ): Promise<{ filePath: string; fileName: string }> {
    // Validar se as notas estão completas
    const validacao = await this.validarNotasCompletas(turmaId, disciplinaId);
    if (!validacao.completas) {
      throw new BadRequestException(
        `Não é possível exportar. Existem alunos com notas incompletas: ${validacao.alunosIncompletos.join(', ')}`,
      );
    }

    // Buscar turma e disciplina
    const turma = await this.turmaRepository.findOne({
      where: { id: turmaId },
      relations: ['alunos'],
    });

    const disciplina = await this.disciplinaRepository.findOne({
      where: { id: disciplinaId },
    });

    if (!turma) {
      throw new NotFoundException('Turma não encontrada');
    }

    if (!disciplina) {
      throw new NotFoundException('Disciplina não encontrada');
    }

    // Buscar componentes da disciplina
    const componentes = await this.componenteNotaRepository.find({
      where: { disciplina: { id: disciplinaId } },
      order: { sigla: 'ASC' },
    });

    // Preparar dados para o CSV
    const alunosComNotas: AlunoComNotas[] = [];

    for (const aluno of turma.alunos) {
      const registro: AlunoComNotas = {
        id: aluno.id,
        ra: aluno.ra,
        nome: aluno.nome,
        notas: {},
      };

      for (const componente of componentes) {
        const nota = await this.alunoNotaRepository.findOne({
          where: {
            aluno: { id: aluno.id },
            componenteNota: { id: componente.id },
            turma: { id: turmaId },
          },
        });

        registro.notas[componente.sigla] = nota?.valor ?? null;
      }

      alunosComNotas.push(registro);
    }

    // Gerar nome do arquivo com data e hora no formato especificado
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');
    const ms = String(agora.getMilliseconds()).padStart(3, '0');

    const timestamp = `${ano}-${mes}-${dia}_${horas}${minutos}${segundos}${ms}`;
    const fileName = `${timestamp}-Turma${turma.cod}_${disciplina.sigla}.csv`;

    // Criar pasta temporária se não existir
    const exportDir = path.join(process.cwd(), 'exports');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    const filePath = path.join(exportDir, fileName);

    // Construir conteúdo CSV manualmente
    let csvContent = 'RA,Nome';
    for (const componente of componentes) {
      csvContent += `,${componente.sigla}`;
    }
    csvContent += '\n';

    for (const aluno of alunosComNotas) {
      csvContent += `${aluno.ra},"${aluno.nome}"`;
      for (const componente of componentes) {
        const valor = aluno.notas[componente.sigla] ?? '';
        csvContent += `,${valor}`;
      }
      csvContent += '\n';
    }

    // Escrever arquivo CSV
    fs.writeFileSync(filePath, csvContent, 'utf8');

    return {
      filePath,
      fileName,
    };
  }

  obterArquivoCSV(fileName: string): Buffer {
    const filePath = path.join(process.cwd(), 'exports', fileName);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Arquivo não encontrado');
    }

    return fs.readFileSync(filePath);
  }

  // criando outra função para criar a tabela de notas
  async listarNotasTurmaDisciplina(
    turmaId: string,
    disciplinaId: string
  ): Promise<{
    alunos: AlunoComNotas[],
    componentes: Array<{ id: string, sigla: string, nome: string, peso: number }>
  }> {
    const turma = await this.turmaRepository.findOne({
      where: { id: turmaId },
      relations: ['alunos'],
    });
    if (!turma) throw new NotFoundException('Turma não encontrada');

    const componentes = await this.componenteNotaRepository.find({
      where: { disciplina: { id: disciplinaId } },
      order: { sigla: 'ASC' }
    });

    const alunosComNotas: AlunoComNotas[] = [];
    for (const aluno of turma.alunos) {
      const registro: AlunoComNotas = {
        id: aluno.id,
        ra: aluno.ra,
        nome: aluno.nome,
        notas: {}
      };
      for (const componente of componentes) {
        const nota = await this.alunoNotaRepository.findOne({
          where: {
            aluno: { id: aluno.id },
            componenteNota: { id: componente.id },
            turma: { id: turmaId }
          }
        });
        registro.notas[componente.sigla] = nota?.valor ?? null;
      }
      alunosComNotas.push(registro);
    }

    return {
      alunos: alunosComNotas,
      componentes: componentes.map(c => ({
        id: c.id,
        sigla: c.sigla,
        nome: c.nome,
        peso: c.peso
      }))
    };
  }

  deletarArquivoTemporario(fileName: string): void {
    const filePath = path.join(process.cwd(), 'exports', fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}
