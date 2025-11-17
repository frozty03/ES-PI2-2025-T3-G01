# Importação de Alunos via CSV

## Descrição

Esta funcionalidade permite que docentes importem alunos para uma turma a partir de um arquivo CSV (Comma-Separated Values). O sistema utiliza apenas as duas primeiras colunas do arquivo, considerando a primeira como matrícula (RA) e a segunda como nome completo do estudante. Qualquer coluna adicional é automaticamente desconsiderada.

## Formato do Arquivo CSV

O arquivo CSV deve conter as seguintes características:

### Estrutura
```
Matrícula,Nome
11111,Abel Antimônio
11112,Bianca Nióbio
11113,Carla Polônio
11114,Carlos Zinco
11115,Leonardo Plutônio
11116,Matheus Basalto
```

### Especificações
- **Cabeçalho**: A primeira linha deve conter os nomes das colunas (Matrícula, Nome, etc.)
- **Coluna 1 (Matrícula/RA)**: Identificador único do aluno (até 8 caracteres numéricos)
- **Coluna 2 (Nome)**: Nome completo do estudante (até 150 caracteres)
- **Colunas adicionais**: Qualquer coluna além da segunda é ignorada automaticamente
- **Codificação**: UTF-8 (com suporte a caracteres especiais como acentuação)

## Endpoint da API

### POST `/turmas/{turmaId}/importar-alunos/user/{userId}`

Importa alunos para uma turma específica a partir de um arquivo CSV.

#### Parâmetros da URL
- `turmaId` (string, UUID): Identificador da turma onde os alunos serão importados
- `userId` (string): Identificador do usuário autenticado (docente)

#### Request
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Body**: 
  - `arquivo` (file): Arquivo CSV com os dados dos alunos

#### Response (Sucesso - 200 OK)
```json
{
  "message": "Importação concluída com sucesso!",
  "alunosImportados": 5,
  "alunosJaExistentes": 1
}
```

#### Response (Erro - 400 Bad Request)
```json
{
  "statusCode": 400,
  "message": "Descrição do erro",
  "error": "Bad Request"
}
```

## Comportamento da Importação

### Casos de Sucesso
1. **Novo Aluno**: Se um aluno com o RA não existe no banco de dados, um novo aluno é criado e associado à turma.
2. **Aluno Existente**: Se um aluno com o RA já existe no banco de dados:
   - Se não está associado à turma, é adicionado à turma
   - Se já está associado à turma, nenhuma ação é realizada (contado como "já existente")

### Validações
- ✅ O arquivo deve ser do tipo CSV
- ✅ O arquivo deve conter cabeçalho e pelo menos um registro de aluno
- ✅ Cada linha deve conter no mínimo 2 colunas
- ✅ Matrícula não pode estar vazia
- ✅ Nome não pode estar vazio
- ✅ Matrícula deve conter exatamente 8 dígitos numéricos
- ✅ Nome será limitado a 150 caracteres
- ✅ Apenas o usuário que possui a turma pode importar alunos
- ✅ A turma deve existir no banco de dados

## Exemplos de Uso

### Usando cURL
```bash
curl -X POST "http://localhost:3000/turmas/550e8400-e29b-41d4-a716-446655440000/importar-alunos/user/123e4567-e89b-12d3-a456-426614174000" \
  -F "arquivo=@alunos.csv"
```

### Usando Python
```python
import requests

url = "http://localhost:3000/turmas/{turmaId}/importar-alunos/user/{userId}"
files = {'arquivo': open('alunos.csv', 'rb')}
response = requests.post(url, files=files)
print(response.json())
```

### Usando JavaScript/Fetch
```javascript
const formData = new FormData();
formData.append('arquivo', fileInput.files[0]);

fetch(`/turmas/${turmaId}/importar-alunos/user/${userId}`, {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data));
```

## Tratamento de Erros

### Arquivo não fornecido
```json
{
  "statusCode": 400,
  "message": "Arquivo CSV não fornecido",
  "error": "Bad Request"
}
```

### Arquivo não é CSV
```json
{
  "statusCode": 400,
  "message": "Apenas arquivos CSV são aceitos",
  "error": "Bad Request"
}
```

### Matrícula inválida
```json
{
  "statusCode": 400,
  "message": "RA inválido: \"12345\". Deve conter 8 dígitos numéricos",
  "error": "Bad Request"
}
```

### Turma não encontrada
```json
{
  "statusCode": 404,
  "message": "Turma não encontrada",
  "error": "Not Found"
}
```

## Notas Importantes

1. **Importação Repetida**: A funcionalidade pode ser executada múltiplas vezes. Na segunda execução, alunos que já existem na turma não serão duplicados.

2. **Integridade de Dados**: O sistema sempre utiliza apenas as duas primeiras colunas, garantindo consistência independentemente da estrutura do CSV.

3. **Atomicidade**: Se houver erro em algum registro (ex: matrícula inválida), toda a importação será abortada.

4. **Performance**: Para importações em lote com muitos alunos, todos os novos alunos são salvos em uma única operação ao banco de dados para otimizar a performance.

5. **Autorização**: Apenas docentes que possuem a turma (através de uma disciplina em uma instituição) podem importar alunos.
