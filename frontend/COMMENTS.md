# Comentários e Discussões do Projeto (frontend)

Este arquivo documenta decisões importantes, revisões de código e discussões relevantes.

## Índice

- [Padrões de Commit](#padrões-de-commit)
- [Decisões de Arquitetura](#decisões-de-arquitetura)
- [Melhorias](#melhorias)
- [Bibliotecas de Terceiros](#bibliotecas-de-terceiros)

## Padrões de Commit

Foi adotado o padrão de commit "Conventional Commits" para ajudar a padronizar e automatizar o versionamento do projeto, sendo:

- feat: Nova funcionalidade
- fix: Correção de bug
- docs: Alterações na documentação
- style: Mudanças de formatação (espaços, vírgulas, etc.)
- refactor: Refatoração de código (sem mudança de comportamento)
- test: Adição ou ajuste de testes
- chore: Tarefas de manutenção (configurações, dependências, etc.)

exemplo:

- feat (Alunos): interface de listagem dos alunos
  - Pesquisa de alunos, cadastro, edição e exclusão de registros.

## Decisões de Arquitetura

### Implementação baseada em componentização de interfaces

**Contexto:**

- Utilização do Vue3 com Typescript, tornando a aplicação atual e robusta
- Utilização do Vuetify devido grandes vantagens deste framework de UI como:
  - Componentes prontos e altamente personalizáveis
  - Design responsivo e Mobile-First
  - Integração com Vue 3 e Composition API
  - Padronização visual com Material Design
  - Facilidade de prototipagem e desenvolvimento rápido
  - Suporte a internacionalização (i18n) e acessibilidade (a11y)
  - Comunidade ativa e documentação rica
- Componentização das interfaces para torna-las mais legíveis e de fácil manutenção
- Utilização de uma camada de serviços "services", onde foi utilizada a biblioteca "axios" para prover comunicação com a API

**Importante**

- Foi criada uma variável de ambiente "VUE_APP_API_URL" no arquivo .env para apontar para a URL da API

**Vantagens:**

- Redução de tempo para manutenções corretivas e adaptativas
- Lógica simples
- Escalável
- Facilidade de implementação de novas funcionalidades

## Melhorias

- Poderia ser pensado formas melhores para se trabalhar a validação das informações de interface e granularização dos componentes e páginas.
- Ao realizar o crescimento da plataforma poderia ser trabalho o uso de centralizadores de variáveis de estado da aplicação por meio do "Pinia", para entregar uma experiência de usuário fluída devido compartilhamento de estados entre os componentes da aplicação.

## Bibliotecas de Terceiros

- axios
- eslint-config-vuetify
- vite-plugin-vuetify
- cpf-cnpj-validator
- vue-the-mask
- vuetify
