# Comentários e Discussões do Projeto (backend)

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

- feat (Alunos): implementação do endpoint
  - criação dos endpoints CRUD a partir da herança da classe abstrata BaseController

## Decisões de Arquitetura

### Abstração do CRUD

#### Implementação de Classe Abstrata BaseController

**Contexto:**

- Múltiplos controllers compartilhavam lógica similar de CRUD
- Duplicação de código em operações básicas (index, store, update e delete)
- Dificuldade em manter consistência entre endpoints

**Solução Implementada:**

- //app/Controllers/Http/BaseController.ts

  - export default abstract class BasesController {}

- Exemplo controller concreto

  - import BasesController from './bases_controller.js'

  - export default class StudentsController extends BasesController {
  - protected getModel() {
  - return Student
  - }
  - }

**Vantagens:**

- Redução de ~70% de código duplicado
- Manutenção centralizada da lógica comum
- Consistência garantida entre endpoints
- Facilidade de implementação de novos controllers

**Customizações Possíveis:**

- Sobrescrever métodos quando necessário para customizações específicas
- Adicionar hooks pré/pós operação
- Extender funcionalidades base

## Melhorias

- Com mais tempo poderiam ser criadas mais validações para garantir ainda mais a segurança dos dados repassados para a API.
- Criação do endpoint para autenticação de usuários na plataforma.

## Bibliotecas de Terceiros
