import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ComponenteNotaEntity } from "./componente-nota.entity"
import { CriarComponenteNotaDTO } from "./dto/criar-componente-nota.dto";
import { DisciplinasEntity } from "./disciplinas.entity";

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
}

