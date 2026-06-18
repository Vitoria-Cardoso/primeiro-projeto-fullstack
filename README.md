# 🌍 Busca de Países — Projeto 2

Aplicação web fullstack em 3 camadas para buscar e inserir informações sobre países.

**Disciplina:** ES47B - Programação Web Fullstack  
**Aluna:** Vitoria Cardoso

---

## 🛠️ Tecnologias

| Camada         | Tecnologia           |
| -------------- | -------------------- |
| Frontend       | React.js + Vite      |
| Backend        | Node.js + Express.js |
| Banco de dados | PostgreSQL           |

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) v18 ou superior
- [PostgreSQL](https://www.postgresql.org/) v14 ou superior
- [Git](https://git-scm.com/)

---

## 🚀 Passo a passo para rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Vitoria-Cardoso/primeiro-projeto-fullstack.git
cd primeiro-projeto-fullstack
```

---

### 2. Configurar o banco de dados

Abra o **pgAdmin** ou o terminal do PostgreSQL e execute:

```sql
CREATE DATABASE fullstack_p2;
```

Com o banco criado, execute o script de criação das tabelas. No pgAdmin, abra a Query Tool conectado ao banco `fullstack_p2` e rode o conteúdo do arquivo `backend/scripts/init.sql`.

Ou pelo terminal:

```bash
psql -U postgres -d fullstack_p2 -f backend/scripts/init.sql
```

> ⚠️ **Importante:** o arquivo `init.sql` cria as tabelas `users`, `countries` e `token_blacklist`. Se preferir criar manualmente, cole o SQL abaixo no pgAdmin:

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS countries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  capital VARCHAR(120),
  population BIGINT,
  region VARCHAR(80),
  flag_url TEXT,
  created_by INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS token_blacklist (
  id SERIAL PRIMARY KEY,
  token TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### 3. Configurar o backend

Entre na pasta do backend:

```bash
cd backend
```

O arquivo `.env` já está configurado com os valores padrão. Altere para a senha necessaria.

Instale as dependências e rode o seed (cria o usuário e popula os países):

```bash
npm install
npm run seed
```

O seed deve exibir:

```
✅ Usuário seed criado/atualizado (id=1)
🌍 Inserindo 25 países no banco...
✅ Seed concluído: 25 países inseridos.
```

Inicie o servidor:

```bash
npm run dev
```

O backend estará rodando em: **http://localhost:3001**

---

### 4. Configurar o frontend

Abra um **novo terminal** e entre na pasta do frontend:

```bash
cd frontend
npm install
npm run dev
```

O frontend estará rodando em: **http://localhost:5173**

---

## 🔑 Credenciais de acesso

| Campo | Valor             |
| ----- | ----------------- |
| Email | vitoria@email.com |
| Senha | 123456            |
