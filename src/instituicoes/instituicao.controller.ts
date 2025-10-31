import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InstituicaoService } from './instituicao.service';
import { CreateInstituicaoDto } from './criarInstituicao.dto';
import { ListInstituicoesByUserDto } from './list-instituicoes-by-user.dto';

@Controller('instituicoes')
export class InstituicaoController {
  constructor(private readonly instituicaoService: InstituicaoService) {}

  @Post()
  async create(@Body() createInstituicaoDto: CreateInstituicaoDto) {
    return this.instituicaoService.createInstituicao(createInstituicaoDto);
  }

  @Get('user/:userId')
  async findByUser(
    @Param('userId') userId: string,
  ): Promise<ListInstituicoesByUserDto> {
    return this.instituicaoService.findByUserId(userId);
  }
}
