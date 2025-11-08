import { IsArray, IsNotEmpty, IsUUID } from "class-validator";

export class ListarCursoDto {
  id: string;
  nome: string;
}
