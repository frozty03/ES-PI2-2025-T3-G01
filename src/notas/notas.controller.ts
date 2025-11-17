// Lucas Presendo Canhete
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { NotasService } from './notas.service';
import { LancarNotaDTO } from './dto/lancar-nota.dto';

/*
  Controller do módulo de notas.

  Responsabilidades:
  - Expor endpoints para lançar notas, validar preenchimento e exportar CSV.
  - Delegar lógica para o `NotasService` e transformar/responder ao cliente.
*/
@Controller('notas')
export class NotasController {
  constructor(private readonly notasService: NotasService) {}

  // Endpoint para lançar (ou atualizar) uma nota de um aluno para um componente
  @Post('/lancar')
  @HttpCode(HttpStatus.CREATED)
  async lancarNota(@Body() lancarNotaDTO: LancarNotaDTO) {
    const nota = await this.notasService.lancarNota(lancarNotaDTO);
    return {
      nota,
      message: 'Nota lançada com sucesso!',
    };
  }

  // Retorna a tabela de notas para uma turma e disciplina (alunos + componentes)
  @Get('turma/:turmaId/disciplina/:disciplinaId')
  async listarNotasTurmaDisciplina(
    @Param('turmaId') turmaId: string,
    @Param('disciplinaId') disciplinaId: string,
  ) {
    return await this.notasService.listarNotasTurmaDisciplina(turmaId, disciplinaId);
  }

  // Valida se todas as notas foram preenchidas para os alunos da turma
  @Get('validar/:turmaId/disciplina/:disciplinaId')
  async validarNotas(
    @Param('turmaId') turmaId: string,
    @Param('disciplinaId') disciplinaId: string,
  ) {
    const validacao = await this.notasService.validarNotasCompletas(
      turmaId,
      disciplinaId,
    );
    return validacao;
  }

  /*
    Gera e envia o CSV das notas.

    - Chama o serviço para gerar o arquivo temporário.
    - Envia o arquivo usando `res.download`.
    - Depois do envio, solicita a remoção do arquivo temporário.
    - Trata erros devolvendo códigos HTTP adequados.
  */
  @Post('exportar/:turmaId/disciplina/:disciplinaId')
  @HttpCode(HttpStatus.OK)
  async exportarNotas(
    @Param('turmaId') turmaId: string,
    @Param('disciplinaId') disciplinaId: string,
    @Res() res: Response,
  ) {
    try {
      const { filePath, fileName } = await this.notasService.exportarNotasCSV(
        turmaId,
        disciplinaId,
      );

      // Enviar arquivo como download
      res.download(filePath, fileName, (err) => {
        if (err) {
          console.error('Erro ao enviar arquivo:', err);
        }
        // Deletar arquivo temporário após o download (sem await)
        void this.notasService.deletarArquivoTemporario(fileName);
      });
    } catch (error: unknown) {
      const errorObj = error as Record<string, unknown>;
      const errorMessage = (errorObj?.message as string) || '';
      
      if (errorMessage.includes('Não é possível exportar')) {
        // Erro de validação (notas incompletas)
        res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: errorMessage,
        });
      } else {
        // Erro inesperado
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: errorMessage || 'Erro ao exportar notas',
        });
      }
    }
  }
}
