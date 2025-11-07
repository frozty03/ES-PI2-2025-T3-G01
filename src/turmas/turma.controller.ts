import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { CreateTurmaDto } from './dto/criarTurma.dto';

@Controller('turmas')
export class TurmasController{
    constructor(
            private turmaService: TurmaService
        ) {}
    // criação vinculada a um usuário autenticado (userId passado aqui)
    @Post('user/:userId')
    async create(@Param('userId') userId: string,
                 @Body() createTurmaDto: CreateTurmaDto,) 
        {
            return await this.turmaService.createTurma(createTurmaDto, userId);
        }
};