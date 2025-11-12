import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ComponenteNotaEntity } from "./componente-nota.entity";
import { Repository } from "typeorm";
import { CriarComponenteDTO } from "./dto/criar-componente-nota.dto";
import { TurmaEntity } from "src/turmas/turma.entity";

@Injectable()
export class ComponenteService {
    constructor(
        @InjectRepository(ComponenteNotaEntity)
        private readonly componenteRepository: Repository<ComponenteNotaEntity>,

        @InjectRepository(TurmaEntity)
        private readonly turmaRepository: Repository<TurmaEntity>
    ) {}

    async cadastrarComponente(criarComponenteDTO: CriarComponenteDTO, userId: string): Promise<ComponenteNotaEntity> {
        const componenteExiste = await this.componenteRepository.findOne({
            where: { nome: criarComponenteDTO.nome }
        });

        if (componenteExiste) {
            throw new ConflictException('Ja existe um componente de nota com esse nome')
        }

        const novoComponente = this.componenteRepository.create({
            nome: criarComponenteDTO.nome,
            peso: criarComponenteDTO.peso,
        });

        return await this.componenteRepository.save(novoComponente);
    }

}