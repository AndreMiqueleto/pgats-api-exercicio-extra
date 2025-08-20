# pgats-api-exercicio-extra
# API REST de Login

Esta é uma API REST simples de login construída com Node.js, Express e banco de dados em memória. A estrutura do projeto está dividida em controller, service e model. A documentação da API está disponível via Swagger.

## Estrutura do Projeto

- `controller/`: Lógica dos endpoints
- `service/`: Regras de negócio
- `model/`: Dados em memória
- `app.js`: Configuração da aplicação Express
- `server.js`: Inicialização do servidor
- `swagger.json`: Documentação Swagger

## Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install express swagger-ui-express
   ```

## Executando a API

```bash
node server.js
```

A API estará disponível em `http://localhost:3000`.

## Endpoints

- `POST /register`: Registra um novo usuário
- `POST /login`: Realiza login
- `GET /api-docs`: Documentação Swagger

## Testes
Para testar com Supertest, importe o `app.js` sem o método `listen()`.

## Observações
- Os dados dos usuários são armazenados apenas em memória e serão perdidos ao reiniciar o servidor.
- Para produção, utilize um banco de dados persistente.

