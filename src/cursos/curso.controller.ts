import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CriarCursoDto } from './criar-curso.dto';
import { ListarCursoDto } from './listar-curso.dto';
import { AtualizarCursoDto } from './atualizar-curso.dto';

@Controller('cursos')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post('/user/:userId')
  async criarCurso(
    @Param('userId') userId: string,
    @Body() dto: CriarCursoDto): Promise<ListarCursoDto> {
    return this.cursoService.criarCurso(dto, userId);
  }

  @Get('instituicao/:idInstituicao/user/:userId') // validacao de que sera do usuario logado
  async listarCursosPorInstituicao(
    @Param('idInstituicao') idInstituicao: string,
    @Param('userId') userId: string,
  ): Promise<ListarCursoDto[]> {
    return this.cursoService.listarCursosPorInstituicao(idInstituicao, userId);
  }

  @Delete(':id/user/:userId')
  async deletarCurso(
    @Param('id') id: string,
    @Param('userId') userId: string, 
  ) : Promise<void> {
    return this.cursoService.deletarCurso(id, userId);
  }

  @Put(':id/user/:userId')
    async atualizarInstituicao(
      @Param('id') id: string,
      @Param('userId') userId: string,
      @Body() atualizarCursoDTO: AtualizarCursoDto
    ) {
        const curso = await this.cursoService.atualizarCurso(id, userId, atualizarCursoDTO);
  
        return {
          curso,
          message: 'Curso atualizado com sucesso!'
        }
    }
}
