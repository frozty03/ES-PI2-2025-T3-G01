import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DisciplinasEntity } from "./disciplinas.entity";
import { In, Repository } from "typeorm";
import { CursoEntity } from "src/cursos/curso.entity";
import { CriarDisciplinaDTO } from "./dto/criar-disciplina.dto";
import { AtualizarDisciplinaDTO } from "./dto/atualizar-discplina.dto";
import { ComponenteNotaService } from "./componente-nota.service";
import { TurmaService } from '../turmas/turma.service';

@Injectable()
export class DisciplinaService {
    constructor(
        @InjectRepository(DisciplinasEntity)
        private readonly disciplinaRepository: Repository<DisciplinasEntity>,

        @InjectRepository(CursoEntity)
        private readonly cursoRepository: Repository<CursoEntity>,
        private readonly componenteNotaService: ComponenteNotaService,
        private readonly turmaService: TurmaService //
    ) {}

    async criarDisciplina(criarDisciplinaDTO: CriarDisciplinaDTO, userId: string): Promise<DisciplinasEntity> {// "prometendo" a entrega assincrona de um valor resultante DisciplinasEntity
        const codigoExiste = await this.disciplinaRepository.findOne({
            where: { cod: criarDisciplinaDTO.cod }
        });

        if (codigoExiste) {
            throw new ConflictException('Código de disciplina já cadastrado');
        }

        // validacao se os cursos pertencem ao userId
        const cursos = await this.cursoRepository
            .createQueryBuilder('curso')
            .innerJoin('curso.instituicoes', 'instituicao')
            .innerJoin('instituicao.users', 'user')
            .where('curso.id IN (:...ids)', { ids: criarDisciplinaDTO.cursosIds })
            .andWhere('user.id = :userId', { userId })
            .getMany();

        if (cursos.length !== criarDisciplinaDTO.cursosIds.length) {
            throw new NotFoundException('Um ou mais cursos informados nao foram encontradsos');
        }

        let disciplina = this.disciplinaRepository.create({
            cod: criarDisciplinaDTO.cod,
            nome: criarDisciplinaDTO.nome,
            sigla: criarDisciplinaDTO.sigla,
            periodo: criarDisciplinaDTO.periodo,
            cursos: cursos
        });

        disciplina = await this.disciplinaRepository.save(disciplina); 

        if (criarDisciplinaDTO.componentesNota?.length) {
            for (const comp of criarDisciplinaDTO.componentesNota) {
                await this.componenteNotaService.criar({
                ...comp,
                id_disciplina: disciplina.id
                });
            }
        }

        return disciplina;
    }

    // validar se pertence ao curso que pertence ao userId '-'
    async listarPorCurso(cursoId: string, userId: string): Promise<DisciplinasEntity[]> {
    const curso = await this.cursoRepository
        .createQueryBuilder('curso')
        .innerJoin('curso.instituicoes', 'instituicao')
        .innerJoin('instituicao.users', 'user')
        .where('curso.id = :cursoId', { cursoId })
        .andWhere('user.id = :userId', { userId })
        .getOne();

    if (!curso) {
        throw new NotFoundException('Curso não encontrado');
    }

    // buscar disciplinas vinculadas a esse curso
    return await this.disciplinaRepository
        .createQueryBuilder('disciplina')
        .innerJoin('disciplina.cursos', 'curso') // JOIN na tabela intermediária
        .leftJoinAndSelect('disciplina.cursos', 'cursos')
        .where('curso.id = :cursoId', { cursoId })
        .getMany();
    }

    async buscarDisciplinaId(id: string, userId: string): Promise<DisciplinasEntity> {
        const disciplina = await this.disciplinaRepository
            .createQueryBuilder('disciplina')
            .innerJoin('disciplina.cursos', 'curso')
            .innerJoin('curso.instituicoes', 'instituicao')
            .innerJoin('instituicao.users', 'user')
            .leftJoinAndSelect('disciplina.cursos', 'cursos')
            .where('disciplina.id = :id', { id })
            .andWhere('user.id = :userId', { userId })
            .getOne(); // so para validar que o user ao buscar pelo ID

        if (!disciplina) {
            throw new NotFoundException('Disciplina não encontrada');
        }

        return disciplina;
    }

    async atualizarDisciplina(
        id: string,
        userId: string,
        atualizarDisciplinaDTO: AtualizarDisciplinaDTO
    ): Promise<DisciplinasEntity> {
        const disciplina = await this.buscarDisciplinaId(id, userId);

        if (atualizarDisciplinaDTO.codigo && atualizarDisciplinaDTO.codigo !== disciplina.cod) {
            const codigoExiste = await this.disciplinaRepository.findOne({
                where: { cod: atualizarDisciplinaDTO.codigo }
            });

            if (codigoExiste) {
                throw new ConflictException('Codigo de disciplina ja cadastrado');
            }
        }

        // se fornecerem os cursos (opcional no dto)
        if (atualizarDisciplinaDTO.cursosIds) {
            const cursos = await this.cursoRepository
                .createQueryBuilder('curso')
                .innerJoin('curso.instituicoes', 'instituicao')
                .innerJoin('instituicao.users', 'user')
                .where('curso.id IN (:...ids)', { ids: atualizarDisciplinaDTO.cursosIds })
                .andWhere('user.id = :userId', { userId })
                .getMany();

            if (cursos.length != atualizarDisciplinaDTO.cursosIds.length) {
                throw new NotFoundException('Um ou mais cursos informados nao foram encontrados');
            }

            disciplina.cursos = cursos;
        }

        Object.assign(disciplina, {
            codigo: atualizarDisciplinaDTO.codigo ?? disciplina.cod,
            nome: atualizarDisciplinaDTO.nome ?? disciplina.nome,
            sigla: atualizarDisciplinaDTO.sigla ?? disciplina.sigla,
            periodo: atualizarDisciplinaDTO.periodo ?? disciplina.periodo,
        }); // cursos ja foram atualizados

        return await this.disciplinaRepository.save(disciplina);
    }


    async deletar(id: string, userId: string): Promise<{ message: string }> {
        const disciplina = await this.buscarDisciplinaId(id, userId);

        const turmasVinculadas = await this.turmaService.listarPorDisciplina(id, userId);
        if (turmasVinculadas.length > 0) {
            throw new ConflictException("Não é possível excluir a disciplina: há turmas vinculadas.");
        }

        await this.componenteNotaService.deletarPorDisciplinaId(disciplina.id); // precisa deleter os componenentes antes pq o banco de dados n tá com delete on cascade (até melhor pra ter um conrole melhor do que tá acontecendo)
        await this.disciplinaRepository.remove(disciplina);
        return { message: 'Disciplina excluida com sucesso' };
    }
}