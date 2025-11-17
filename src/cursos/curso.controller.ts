// Lucas Presendo Canhete
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CriarCursoDto } from './criar-curso.dto';
import { ListarCursoDto } from './listar-curso.dto';

/*
  Controller para endpoints relacionados a Cursos.

  Endpoints principais:
  - `POST /cursos/user/:userId` : criar curso vinculado ao usuário.
  - `GET /cursos/instituicao/:idInstituicao/user/:userId`: listar cursos
     de uma instituição garantindo que pertençam ao usuário.
  - `DELETE /cursos/:id/user/:userId`: deletar curso (autorização pelo user).
*/
@Controller('cursos')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post('/user/:userId')
  async criarCurso(
    @Param('userId') userId: string,
    @Body() dto: CriarCursoDto,
  ): Promise<ListarCursoDto> {
    return this.cursoService.criarCurso(dto, userId);
  }

  // Lista cursos de uma instituição, verificando associação com o user
  @Get('instituicao/:idInstituicao/user/:userId')
  async listarCursosPorInstituicao(
    @Param('idInstituicao') idInstituicao: string,
    @Param('userId') userId: string,
  ): Promise<ListarCursoDto[]> {
    return this.cursoService.listarCursosPorInstituicao(idInstituicao, userId);
  }

  // Deleta um curso se o usuário estiver associado à instituição que o oferece
  @Delete(':id/user/:userId')
  async deletarCurso(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    return this.cursoService.deletarCurso(id, userId);
  }
}
