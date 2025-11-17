# NotaDez - Sistema de Gestão de Notas

Aplicação web para gerenciamento de instituições, turmas, disciplinas, alunos e notas.

## Equipe

- Davi Alves Froza
- Julia da Silva Maia
- Lucas Presendo Canhete
- Miguel Afonso Castro de Almeida
- Pedro Henrique Bonetto da Costa

## Tecnologias

- *Backend:* Node.js + TypeScript + NestJS
- *Frontend:* HTML5, CSS3, JavaScript
- *Banco de Dados:* PostgreSQL
- *Controle de Versão:* Git + GitHub

---

## Como Rodar o Projeto

### Pré-requisitos

- *Docker* instalado
- *Docker Compose* instalado
- *Docker Desktop* instalado

### Iniciar BD com Docker

Na raiz do projeto, execute:

bash
docker-compose up


Isso iniciará:
- PostgreSQL (porta 5432)
- pgadmin do BD. (porta 8081). Nesta página, rodar o arquivo BD.sql para iniciar o banco de dados.
- Login: alvesfrozadavi@gmail.com Senha: root


### Criar .env: 
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=root
DB_PASSWORD=root
DB_NAME=PI2
DB_ADMIN_EMAIL=alvesfrozadavi@gmail.com
JWT_SECRET=PROJETOINTEGRADOR2
APP_URL=http://localhost:3000/

### Compilar o Projeto

bash
npm install
npm run build



#### Desenvolvimento :
bash
npm run start:dev


A aplicação estará disponível em: *http://localhost:3000/usuarios/login*


*Versão:* 1.0.0
