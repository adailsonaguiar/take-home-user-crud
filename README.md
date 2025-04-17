# 🚀 Instruções para rodar o projeto

## 📦 Instalação de dependências

No diretório raiz do projeto, execute:

```bash
yarn
```

---

## 🛠 Backend (`/apps/backend`)

### Passos:

1. Acesse a pasta do backend:

```bash
cd apps/backend
```

2. Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

3. Suba o container com o banco de dados PostgreSQL:

```bash
docker compose up -d
```

4. Execute as migrations no banco:

```bash
yarn migration:run
```

5. Inicie a aplicação em modo de desenvolvimento:

```bash
yarn start:dev
```

---

## 💻 Frontend (`/apps/frontend`)

### Passos:

1. Acesse a pasta do frontend:

```bash
cd apps/frontend
```

2. Inicie a aplicação:

```bash
yarn dev
```

---

Pronto! O projeto estará rodando com backend e frontend ativos. ✅
