"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvParserService = void 0;
const common_1 = require("@nestjs/common");
let CsvParserService = class CsvParserService {
    parseCSV(fileContent) {
        try {
            const lines = fileContent
                .trim()
                .split('\n')
                .map((line) => line.trim())
                .filter((line) => line.length > 0);
            if (lines.length < 2) {
                throw new common_1.BadRequestException('Arquivo CSV deve conter cabeçalho e pelo menos um registro de aluno');
            }
            const dataLines = lines.slice(1);
            const alunos = dataLines
                .map((line, index) => {
                const columns = line.split(',').map((col) => col.trim());
                if (columns.length < 2) {
                    throw new common_1.BadRequestException(`Linha ${index + 2} possui menos de 2 colunas. Esperado: matrícula, nome`);
                }
                const ra = columns[0];
                const nome = columns[1];
                if (!ra || ra.length === 0) {
                    throw new common_1.BadRequestException(`Linha ${index + 2}: Matrícula não pode estar vazia`);
                }
                if (!nome || nome.length === 0) {
                    throw new common_1.BadRequestException(`Linha ${index + 2}: Nome não pode estar vazio`);
                }
                return {
                    ra: ra.substring(0, 8),
                    nome: nome.substring(0, 150),
                };
            })
                .filter((aluno) => aluno.ra && aluno.nome);
            if (alunos.length === 0) {
                throw new common_1.BadRequestException('Nenhum aluno válido encontrado no arquivo CSV');
            }
            return alunos;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Erro ao processar arquivo CSV: ${error.message}`);
        }
    }
};
exports.CsvParserService = CsvParserService;
exports.CsvParserService = CsvParserService = __decorate([
    (0, common_1.Injectable)()
], CsvParserService);
//# sourceMappingURL=csv-parser.service.js.map