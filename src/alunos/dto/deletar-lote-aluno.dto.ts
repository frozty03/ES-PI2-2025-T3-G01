import { IsArray, IsUUID, IsNotEmpty } from 'class-validator';

export class DeletarLoteAlunoDTO {
    @IsArray({ message: 'alunosIds deve ser um array' })
    @IsUUID('4', { each: true, message: 'Cada ID deve ser um UUID válido' })
    @IsNotEmpty({ message: 'Lista de alunos não pode estar vazia' })
    alunosIds: string[];
}