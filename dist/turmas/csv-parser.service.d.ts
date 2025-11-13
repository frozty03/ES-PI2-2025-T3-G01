export interface AlunoCSV {
    ra: string;
    nome: string;
}
export declare class CsvParserService {
    parseCSV(fileContent: string): AlunoCSV[];
}
