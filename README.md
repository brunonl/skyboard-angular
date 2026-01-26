# Skyboard Angular 19

Um quadro Kanban desenvolvido para demonstrar habilidades avançadas em **Angular** e **Arquitetura Front-end**, integrando design moderno com persistência de dados em tempo real.

![Angular](https://img.shields.io/badge/Angular-19-dd0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e?style=for-the-badge&logo=supabase&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-SCSS-c69?style=for-the-badge&logo=sass&logoColor=white)

---

## 🚀 Funcionalidades

- **Gerenciamento de Estado**: Controle fluido de cards entre colunas (To Do, Doing, Done).
- **Drag & Drop Avançado**: Implementação utilizando **Angular CDK** para performance otimizada e feedback visual suave.
- **CRUD Completo**: Criação, edição e remoção de tarefas com persistência imediata no Supabase.
- **UI/UX Moderna**: Design system próprio com tema escuro, modais responsivos e micro-interações.

## 👨‍💻 Destaques Técnicos (Para Recrutadores)

Este projeto foi construído focando em **boas práticas**, **arquitetura limpa** e **código escalável**:

- **Modern Angular**: Uso das features mais recentes do framework (v19).
- **SCSS Modular**: Arquitetura de estilos organizada com **Design Tokens** (`_variables.scss`) e componentes isolados (`components/`), facilitando a escalabilidade.
- **Service Layer Pattern**: Lógica de negócios e comunicação com API totalmente separada dos componentes de visualização.
- **Tipagem Estrita**: Uso rigoroso de interfaces TypeScript para garantir segurança e previsibilidade do código.
- **CI/CD Simplificado**: Workflow no GitHub Actions configurado para manutenção autônoma do banco de dados (Keep Alive).

## 🛠️ Stack Tecnológica

- **Core**: Angular 19, TypeScript
- **Estilização**: SASS, BEM Methodology, Bootstrap 5 (Grid/Utils)
- **Backend/DB**: Supabase (PostgreSQL)
- **Libs Auxiliares**: `@angular/cdk` (DragDrop), `ngx-bootstrap`

---

## 🏗️ Estrutura do Projeto

A organização segue uma abordagem baseada em features e serviços:

```bash
src/
├── app/
│   ├── interfaces/     # Modelos de dados (Card Interface)
│   ├── pages/
│   │   └── board/      # Módulo principal do Kanbman
│   ├── services/       # Camada de API e Regras de Negócio (CardService)
│   └── shared/         # Componentes reutilizáveis
├── assets/
│   └── scss/           # Arquitetura de estilos (BEM / Modular SCSS)
└── environments/       # Configurações de ambiente
```

## 🔧 Instalação e Execução

O projeto está pronto para rodar localmente:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/brunonl/skyboard-angular.git
   cd skyboard-angular
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis:**
   Atualize `src/environments/environment.ts` com suas chaves do Supabase.

4. **Execute:**
   ```bash
   npm start
   ```
   Acesse via `http://localhost:4200`.

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.
