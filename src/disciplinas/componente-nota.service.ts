// Desenvolvido por Miguel Afonso Castro de Almeida
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ComponenteNotaEntity } from "./componente-nota.entity"
import { CriarComponenteNotaDTO } from "./dto/criar-componente-nota.dto";
import { DisciplinasEntity } from "./disciplinas.entity";
import { AtualizarComponenteNotaDTO } from "./dto/atualizar-componente-nota.dto";

@Injectable()
export class ComponenteNotaService {
    constructor(
        @InjectRepository(ComponenteNotaEntity)
        private readonly componenteNotaRepository: Repository<ComponenteNotaEntity>,
        @InjectRepository(DisciplinasEntity)
        private readonly disciplinaRepository: Repository<DisciplinasEntity>,
    ) {}

    async criar(dto: CriarComponenteNotaDTO): Promise<ComponenteNotaEntity> {
    const disciplinaObj = await this.disciplinaRepository.findOneBy({ id: dto.id_disciplina });
    if (!disciplinaObj) throw new NotFoundException('Disciplina não encontrada!');
    const componente = this.componenteNotaRepository.create({
        nome: dto.nome,
        sigla: dto.sigla,
        descricao: dto.descricao,
        peso: dto.peso,
        disciplina: disciplinaObj
    });
    return await this.componenteNotaRepository.save(componente);
    }

    async atualizar(id: string, dto: AtualizarComponenteNotaDTO): Promise<ComponenteNotaEntity> {
        const componente = await this.componenteNotaRepository.findOne({ where: { id } });
        if (!componente) throw new NotFoundException("Componente de nota não encontrado");

        Object.assign(componente, dto);
        return await this.componenteNotaRepository.save(componente);
    }

    async deletar(id: string): Promise<void> {
        const result = await this.componenteNotaRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException("Componente de nota não encontrado");
    }

    async deletarPorDisciplinaId(disciplinaId: string): Promise<void> {
        await this.componenteNotaRepository.delete({ disciplina: { id: disciplinaId } });
    }
}

