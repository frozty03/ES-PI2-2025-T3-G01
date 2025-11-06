import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CriarCursoDto } from './criar-curso.dto';
import { ListarCursoDto } from './listar-curso.dto';

@Controller('cursos')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post()
  async criarCurso(@Body() dto: CriarCursoDto): Promise<ListarCursoDto> {
    return this.cursoService.criarCurso(dto);
  }

  @Get('instituicao/:idInstituicao')
  async listarCursosPorInstituicao(
    @Param('idInstituicao') idInstituicao: string,
  ): Promise<ListarCursoDto[]> {
    return this.cursoService.listarCursosPorInstituicao(idInstituicao);
  }

  @Delete(':id')
  async deletarCurso(@Param('id') id: string): Promise<void> {
    return this.cursoService.deletarCurso(id);
  }
}
