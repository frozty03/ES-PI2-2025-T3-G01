// Lucas Presendo Canhete
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
      // Separar o conteúdo do arquivo em linhas (removendo linhas vazias)
      // Cada linha representa um registro (a primeira linha é o cabeçalho)
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

      // Pular cabeçalho (primeira linha) — os dados começam na segunda linha
      const dataLines = lines.slice(1);

      // Mapear cada linha de dados para o formato AlunoCSV
      // - Divide a linha por vírgulas
      // - Usa as duas primeiras colunas: RA e Nome (outras colunas são ignoradas)
      // - Realiza validações simples e truncamentos para se adequar ao schema
      const alunos: AlunoCSV[] = dataLines
        .map((line, index) => {
          // Dividir por vírgula, removendo espaços extras
          const columns = line.split(',').map((col) => col.trim());

          // Cada registro deve possuir pelo menos duas colunas (RA e Nome)
          if (columns.length < 2) {
            throw new BadRequestException(
              `Linha ${index + 2} possui menos de 2 colunas. Esperado: matrícula, nome`,
            );
          }

          const ra = columns[0];
          const nome = columns[1];

          // Validações básicas de presença
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

          // Truncar campos para garantir compatibilidade com o banco
          return {
            ra: ra.substring(0, 8), // Limitar a 8 caracteres conforme schema do banco
            nome: nome.substring(0, 150), // Limitar a 150 caracteres conforme schema do banco
          };
        })
        // Filtrar eventuais registros incompletos
        .filter((aluno) => aluno.ra && aluno.nome);

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
