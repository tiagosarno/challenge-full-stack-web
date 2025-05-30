## Pré-requisitos

- Node.js (versão 16 ou superior)
- NPM (vem com o Node.js) ou Yarn (opcional)
- Banco de dados (MySQL)

## Instalação

Clone o repositório

git clone URL_DO_PROJETO

Acesse a pasta do projeto:

cd seu-projeto

# Instalação das dependências

npm install

Copie o arquivo .env.example para .env e configure as variáveis de ambiente:

cp .env.example .env

Gere a chave APP_KEY (necessária para o Adonis.js):

node ace generate:key

## Configuração do Banco de Dados (MySQL)

Configure as credenciais do banco de dados no arquivo .env

## Migrations

node ace migration:run

## Executando a Aplicação

Para iniciar o servidor em modo desenvolvimento:

node ace serve --watch

## O servidor estará disponível em: http://localhost:3333
