// Lucas Presendo Canhete
import { Test, TestingModule } from '@nestjs/testing';
import { CsvParserService } from './csv-parser.service';
import { BadRequestException } from '@nestjs/common';

describe('CsvParserService', () => {
  let service: CsvParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsvParserService],
    }).compile();

    service = module.get<CsvParserService>(CsvParserService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('parseCSV', () => {
    it('deve fazer parse corretamente de um CSV válido', () => {
      const csvContent = `Matrícula,Nome
11111,Abel Antimônio
11112,Bianca Nióbio
11113,Carla Polônio`;

      const result = service.parseCSV(csvContent);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({ ra: '11111', nome: 'Abel Antimônio' });
      expect(result[1]).toEqual({ ra: '11112', nome: 'Bianca Nióbio' });
      expect(result[2]).toEqual({ ra: '11113', nome: 'Carla Polônio' });
    });

    it('deve ignorar colunas além das duas primeiras', () => {
      const csvContent = `Matrícula,Nome,Ignorado1,Ignorado2
11111,Abel Antimônio,Valor1,Valor2
11112,Bianca Nióbio,Valor3,Valor4`;

      const result = service.parseCSV(csvContent);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ ra: '11111', nome: 'Abel Antimônio' });
      expect(result[1]).toEqual({ ra: '11112', nome: 'Bianca Nióbio' });
    });

    it('deve remover espaços em branco desnecessários', () => {
      const csvContent = `Matrícula , Nome
  11111  ,  Abel Antimônio  
11112, Bianca Nióbio `;

      const result = service.parseCSV(csvContent);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ ra: '11111', nome: 'Abel Antimônio' });
      expect(result[1]).toEqual({ ra: '11112', nome: 'Bianca Nióbio' });
    });

    it('deve lançar erro quando houver menos de 2 colunas', () => {
      const csvContent = `Matrícula
11111`;

      expect(() => service.parseCSV(csvContent)).toThrow(BadRequestException);
    });

    it('deve lançar erro quando o CSV estiver vazio', () => {
      const csvContent = '';

      expect(() => service.parseCSV(csvContent)).toThrow(BadRequestException);
    });

    it('deve lançar erro quando houver apenas cabeçalho', () => {
      const csvContent = 'Matrícula,Nome';

      expect(() => service.parseCSV(csvContent)).toThrow(BadRequestException);
    });

    it('deve lançar erro quando matrícula estiver vazia', () => {
      const csvContent = `Matrícula,Nome
,Abel Antimônio`;

      expect(() => service.parseCSV(csvContent)).toThrow(BadRequestException);
    });

    it('deve lançar erro quando nome estiver vazio', () => {
      const csvContent = `Matrícula,Nome
11111,`;

      expect(() => service.parseCSV(csvContent)).toThrow(BadRequestException);
    });

    it('deve limitar matrícula a 8 caracteres', () => {
      const csvContent = `Matrícula,Nome
111111111,Abel Antimônio`;

      const result = service.parseCSV(csvContent);

      expect(result[0].ra).toHaveLength(8);
      expect(result[0].ra).toBe('11111111');
    });

    it('deve limitar nome a 150 caracteres', () => {
      const longName = 'A'.repeat(200);
      const csvContent = `Matrícula,Nome
11111,${longName}`;

      const result = service.parseCSV(csvContent);

      expect(result[0].nome).toHaveLength(150);
    });
  });
});
