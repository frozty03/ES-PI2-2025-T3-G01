// Feito por: Davi Froza 

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { CriarAlunoDTO } from "./dto/criar-aluno.dto";
import { AtualizarAlunoDTO } from "./dto/atualizar-aluno.dto";
import { AlunoService } from "./aluno.service";
import { DeletarLoteAlunoDTO } from "./dto/deletar-lote-aluno.dto";

@Controller('/alunos')
export class AlunoController {
    constructor (
        private alunoService: AlunoService
    ) {}

    @Post('/user/:userId')
    @HttpCode(HttpStatus.CREATED)
    async criar(
        @Param('userId') userId: string,
        @Body() criarAlunoDto: CriarAlunoDTO) {
            const aluno = await this.alunoService.cadastrarAluno(criarAlunoDto, userId);

            return {
                aluno,
                message: 'Aluno cadastrado com sucesso!'
            };
        }

    @Get('/turma/:turmaId/user/:userId')
    async listarPorTurma (
        @Param('turmaId') turmaId: string,
        @Param('userId') userId: string
    ) {
        return await this.alunoService.listarPorTurma(turmaId, userId);
    }


    @Delete('/lote/turma/:turmaId/user/:userId')
    @HttpCode(HttpStatus.OK)
    async deletarLote(
        @Param('userId') userId: string,
        @Param('turmaId') turmaId: string,
        @Body() deletarLoteAlunoDto: DeletarLoteAlunoDTO
        ) {
        return await this.alunoService.deletarLote(userId, turmaId, deletarLoteAlunoDto);
        }

    @Delete('/:id/turma/:turmaId/user/:userId')
    async deletarAluno (
        @Param('id') id: string,
        @Param('userId') userId: string,
        @Param('turmaId') turmaId: string 
    ) { 
        return await this.alunoService.deletarAluno(id, userId, turmaId);
    }

    @Put('/:id/user/:userId')
    async atualizarAluno (
        @Body() atualizarAlunoDTO: AtualizarAlunoDTO,
        @Param('id') id: string,
        @Param('userId') userId: string
    ) {
        const aluno = await this.alunoService.atualizarAluno(atualizarAlunoDTO, id, userId)

        return {
            aluno,
            message: 'Aluno atualizado com sucesso!'
        };
    }

}