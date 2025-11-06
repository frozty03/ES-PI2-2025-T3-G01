import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { DisciplinaService } from "./disciplina.service";
import { CriarDisciplinaDTO } from "./dto/criar-disciplina.dto";
import { ListarDisciplinaDTO } from "./dto/listar-disciplina.dto";
import { AtualizarDisciplinaDTO } from "./dto/atualizar-discplina.dto";
import { userInfo } from "os";

@Controller('/disciplinas')
export class DisciplinaController {
    constructor( private disciplinaService: DisciplinaService ) {}

    @Post('/user/:userId')
    @HttpCode(HttpStatus.CREATED)
    async criar(
        @Param('userId') userId: string,
        @Body() criarDisciplinaDTO: CriarDisciplinaDTO) {
        const disciplina = await this.disciplinaService.criarDisciplina(criarDisciplinaDTO, userId);

        return {
            disciplina: new ListarDisciplinaDTO(
                disciplina.id,
                disciplina.cod,
                disciplina.nome,
                disciplina.sigla,
                disciplina.periodo,
                disciplina.cursos.map(c => ({ id: c.id, nome: c.nome }))
            ),
            message: 'Disciplina criada com sucesso!'
        };
    }

    @Get('curso/:cursoId/user/:userId')
    async listarPorCurso(
        @Param('cursoId') cursoId: string,
        @Param('userId') userId: string,
    ) {
        const disciplinas = await this.disciplinaService.listarPorCurso(cursoId, userId);
    
        return disciplinas.map(d => new ListarDisciplinaDTO(
            d.id,
            d.cod,
            d.nome,
            d.sigla,
            d.periodo,
            d.cursos.map(c => ({ id: c.id, nome: c.nome }))
        ));
    }

    @Put(':id/user/:userId')
    async atualizar(
        @Param('id') id: string,
        @Param('userId') userId: string,
        @Body() atualizarDisciplinaDTO: AtualizarDisciplinaDTO ) {
            const disciplina = await this.disciplinaService.atualizarDisciplina(id, userId, atualizarDisciplinaDTO);

            return {
                disciplina: new ListarDisciplinaDTO(
                    disciplina.id,
                    disciplina.cod,
                    disciplina.nome,
                    disciplina.sigla,
                    disciplina.periodo,
                    disciplina.cursos.map(c => ({ id: c.id, nome: c.nome }))
                ),
                message: 'Disciplina atualizada com sucesso!'
            };
    }

    @Delete(':id/user/:userId')
    async deletar(
        @Param('id') id: string,
        @Param('userId') userId: string,
    ) {
        return await this.disciplinaService.deletar(id, userId);
    }
}