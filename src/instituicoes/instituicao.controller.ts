import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { InstituicaoService } from './instituicao.service';
import { CreateInstituicaoDto } from './criarInstituicao.dto';
import { ListInstituicoesByUserDto } from './list-instituicoes-by-user.dto';

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
