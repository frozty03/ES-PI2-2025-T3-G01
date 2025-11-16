import { Injectable, BadRequestException } from '@nestjs/common';

export interface AlunoCSV {
  ra: string;
  nome: string;
}

@Injectable()
export class CsvParserService {
  /**
   * Faz parse de um arquivo CSV retornando apenas as duas primeiras colunas
   * Coluna 1: RA (matrícula)
   * Coluna 2: Nome
   * Outras colunas são ignoradas
   */
  parseCSV(fileContent: string): AlunoCSV[] {
    try {
      const lines = fileContent
        .trim()
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      if (lines.length < 2) {
        throw new BadRequestException(
          'Arquivo CSV deve conter cabeçalho e pelo menos um registro de aluno',
        );
      }

      // Pular cabeçalho (primeira linha)
      const dataLines = lines.slice(1);

      const alunos: AlunoCSV[] = dataLines
        .map((line, index) => {
          // Dividir por vírgula, considerando possíveis espaços
          const columns = line.split(',').map((col) => col.trim());

          if (columns.length < 2) {
            throw new BadRequestException(
              `Linha ${index + 2} possui menos de 2 colunas. Esperado: matrícula, nome`,
            );
          }

          const ra = columns[0];
          const nome = columns[1];

          // Validações básicas
          if (!ra || ra.length === 0) {
            throw new BadRequestException(
              `Linha ${index + 2}: Matrícula não pode estar vazia`,
            );
          }

          if (!nome || nome.length === 0) {
            throw new BadRequestException(
              `Linha ${index + 2}: Nome não pode estar vazio`,
            );
          }

          return {
            ra: ra.substring(0, 8), // Limitar a 8 caracteres conforme schema do banco
            nome: nome.substring(0, 150), // Limitar a 150 caracteres conforme schema do banco
          };
        })
        .filter((aluno) => aluno.ra && aluno.nome); // Filtrar registros vazios

      if (alunos.length === 0) {
        throw new BadRequestException(
          'Nenhum aluno válido encontrado no arquivo CSV',
        );
      }

      return alunos;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Erro ao processar arquivo CSV: ${error.message}`,
      );
    }
  }
}
