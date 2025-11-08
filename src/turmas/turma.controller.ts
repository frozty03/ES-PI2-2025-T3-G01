import { Body, Controller, Get, Param, Post, HttpCode, HttpStatus, Delete } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { CreateTurmaDto } from './dto/criarTurma.dto';

@Controller('turmas')
export class TurmasController{
    constructor(
            private turmaService: TurmaService
        ) {}

    // criação vinculada a um usuário autenticado (userId passado aqui)
    @Post('/user/:userId')
        @HttpCode(HttpStatus.CREATED)
        async criar(
            @Param('userId') userId: string,
            @Body() createTurmaDTO: CreateTurmaDto) {
            const turma = await this.turmaService.createTurma(createTurmaDTO, userId);
    
            return {
                turma,
                message: 'Turma criada com sucesso!'
            };
        }

    @Get('disciplina/:disciplinaId/user/:userId')
        async listarPorDisciplina(
            @Param('disciplinaId') disciplinaId: string,
            @Param('userId') userId: string,
        ) {
            return await this.turmaService.listarPorDisciplina(disciplinaId, userId);
        }

    @Delete(':id/user/:userId')
    async deletar(
        @Param('id') id: string,
        @Param('userId') userId: string,
    ) {
        return await this.turmaService.deletarTurma(id, userId);
    }
};