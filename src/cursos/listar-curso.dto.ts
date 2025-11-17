// Lucas Presendo Canhete
import { IsArray, IsNotEmpty, IsUUID } from "class-validator";

/*
  DTO usado para retornar dados básicos de cursos.
  Contém apenas `id` e `nome` para exibição/listagens.
*/
export class ListarCursoDto {
  id: string;
  nome: string;
}
