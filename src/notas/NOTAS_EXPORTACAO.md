# Sistema de Exportação de Notas em CSV

## Funcionalidades Implementadas

Este módulo permite que docentes exportem os dados de notas de uma turma em formato CSV, com as seguintes características:

### 1. **Lançamento de Notas**
- Endpoint: `POST /notas/lancar`
- Permite lançar notas de alunos em componentes de avaliação

**Request:**
```json
{
  "idAluno": "uuid-do-aluno",
  "idComponenteNota": "uuid-do-componente",
  "idTurma": "uuid-da-turma",
  "valor": 8.5
}
```

**Response:**
```json
{
  "nota": {
    "id": "uuid-da-nota",
    "valor": 8.5,
    "aluno": {...},
    "componenteNota": {...},
    "turma": {...}
  },
  "message": "Nota lançada com sucesso!"
}
```

### 2. **Validação de Notas Completas**
- Endpoint: `GET /notas/validar/:turmaId/disciplina/:disciplinaId`
- Verifica se todos os alunos da turma possuem notas em todos os componentes da disciplina

**Response:**
```json
{
  "completas": true,
  "alunosIncompletos": []
}
```

Ou em caso de notas incompletas:
```json
{
  "completas": false,
  "alunosIncompletos": [
    "João Silva (20241234) - Componente: P1",
    "Maria Santos (20245678) - Componente: T1"
  ]
}
```

### 3. **Exportação de Notas em CSV**
- Endpoint: `POST /notas/exportar/:turmaId/disciplina/:disciplinaId`
- Exporta as notas de uma turma em formato CSV

**Validações:**
- ❌ Falha se existir algum aluno com algum componente sem nota atribuída
- ✅ Sucesso apenas se todos os alunos possuem todas as notas

**Formato do Arquivo:**
- Nome: `aaaa-mm-dd_hhmmssms-TurmaX_Sigla.csv`
  - Exemplo: `2025-11-13_130245001-Turma1_POO.csv`
- Conteúdo:
  ```
  RA,Nome,P1,P2,T1
  20241234,"João Silva",8.5,7.0,9.0
  20245678,"Maria Santos",9.0,8.5,8.0
  ```

**Características:**
- ✅ Arquivo não é armazenado no banco de dados
- ✅ Download automático após exportação
- ✅ Arquivo temporário é deletado após o download
- ✅ Nomeação padronizada com data/hora da exportação

## Estrutura de Dados

### Entidade: AlunoNotaEntity
```
Aluno_Nota {
  id: UUID (PK)
  valor: NUMERIC (precision: 4, scale: 2, nullable)
  aluno: AlunoEntity (FK)
  componenteNota: ComponenteNotaEntity (FK)
  turma: TurmaEntity (FK)
  
  UNIQUE constraint: (aluno, componenteNota, turma)
}
```

## Fluxo de Uso Recomendado

1. **Lançar notas para todos os alunos:**
   ```bash
   POST /notas/lancar
   ```

2. **Validar se as notas estão completas:**
   ```bash
   GET /notas/validar/:turmaId/disciplina/:disciplinaId
   ```

3. **Exportar para CSV (se validação passar):**
   ```bash
   POST /notas/exportar/:turmaId/disciplina/:disciplinaId
   ```

## Observações

- Notas podem ser valores NULL (antes de serem lançadas)
- Ao lançar uma nota sem especificar `valor`, será armazenado como NULL
- A exportação só é permitida se **todas** as notas estiverem preenchidas
- Os arquivos temporários são salvos em `./exports/` e deletados após download
- A data/hora do arquivo segue o padrão: `aaaa-mm-dd_hhmmssms` (incluindo milissegundos)
