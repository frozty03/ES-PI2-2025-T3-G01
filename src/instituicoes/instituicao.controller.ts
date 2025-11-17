// Lucas Presendo Canhete
import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { InstituicaoService } from './instituicao.service';
import { CreateInstituicaoDto } from './criarInstituicao.dto';
import { ListInstituicoesByUserDto } from './list-instituicoes-by-user.dto';

/*
  Controller para operações sobre Instituições.

  Endpoints:
  - `POST /instituicoes/user/:userId`: cria instituição vinculada ao usuário.
  - `DELETE /instituicoes/:id/user/:userId`: deleta instituição (verifica associação).
  - `GET /instituicoes/user/:userId`: lista instituições associadas ao usuário.
*/
@Controller('instituicoes')
export class InstituicaoController {
  constructor(private readonly instituicaoService: InstituicaoService) {}

  // criação vinculada a um usuário autenticado (userId passado aqui)
  @Post('user/:userId')
  async create(
    @Param('userId') userId: string,
    @Body() createInstituicaoDto: CreateInstituicaoDto,
  ) {
    return this.instituicaoService.createInstituicao(
      createInstituicaoDto,
      userId,
    );
  }

  // deletar instituição — apenas usuário associado pode deletar
  @Delete(':id/user/:userId')
  async delete(@Param('id') id: string, @Param('userId') userId: string) {
    return this.instituicaoService.deleteInstituicao(id, userId);
  }

  @Get('user/:userId')
  async findByUser(
    @Param('userId') userId: string,
  ): Promise<ListInstituicoesByUserDto> {
    return this.instituicaoService.findByUserId(userId);
  }
}
