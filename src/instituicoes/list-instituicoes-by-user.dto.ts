// Lucas Presendo Canhete
/*
  DTO retornado ao listar instituições por usuário.

  - `userId`: id do usuário consultado.
  - `instituicoes`: lista com objetos contendo `id` e `nome`.
*/
export class ListInstituicoesByUserDto {
  userId: string;
  instituicoes: {
    id: string;
    nome: string;
  }[];
}
