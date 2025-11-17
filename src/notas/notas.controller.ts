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

@Controller('notas')
export class NotasController {
  constructor(private readonly notasService: NotasService) {}

  @Post('/lancar')
  @HttpCode(HttpStatus.CREATED)
  async lancarNota(@Body() lancarNotaDTO: LancarNotaDTO) {
    const nota = await this.notasService.lancarNota(lancarNotaDTO);
    return {
      nota,
      message: 'Nota lançada com sucesso!',
    };
  }

    @Get('turma/:turmaId/disciplina/:disciplinaId')
    async listarNotasTurmaDisciplina(
    @Param('turmaId') turmaId: string,
    @Param('disciplinaId') disciplinaId: string,) {
      return await this.notasService.listarNotasTurmaDisciplina(turmaId, disciplinaId);
    }

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
        res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: errorMessage,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: errorMessage || 'Erro ao exportar notas',
        });
      }
    }
  }
}
