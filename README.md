# Kanban Angular

Um aplicativo de quadro Kanban desenvolvido com Angular 14 e Supabase para persistência de dados.

![Angular](https://img.shields.io/badge/Angular-14-red?logo=angular)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?logo=supabase)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Funcionalidades

- ✅ Quadro Kanban com 3 colunas: **To Do**, **Doing**, **Done**
- ✅ Adicionar, editar e excluir cards
- ✅ Mover cards entre colunas
- ✅ Persistência via Supabase (PostgreSQL)
- ✅ Interface responsiva

## 📋 Pré-requisitos

- Node.js 16+
- npm ou yarn
- Conta no [Supabase](https://supabase.com) (gratuito)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/brunonl/kanban-angular.git
cd kanban-angular
```

2. Instale as dependências:
```bash
npm install --legacy-peer-deps
```

3. Configure o Supabase:
   - Crie um projeto no [Supabase](https://supabase.com)
   - Crie a tabela `cards`:
   ```sql
   CREATE TABLE cards (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     titulo TEXT NOT NULL,
     conteudo TEXT NOT NULL,
     lista TEXT NOT NULL DEFAULT 'ToDo'
   );
   ```
   - Copie a **URL** e **anon key** do projeto

4. Configure as credenciais em `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  supabaseUrl: 'SUA_URL_DO_SUPABASE',
  supabaseKey: 'SUA_ANON_KEY'
};
```

5. Execute o projeto:
```bash
npm start
```

6. Acesse: http://localhost:4200

## 🏗️ Estrutura do Projeto

```
├── src/
│   ├── app/
│   │   ├── interfaces/     # Tipos TypeScript
│   │   ├── pages/          # Componentes de página
│   │   │   └── board/      # Quadro Kanban principal
│   │   ├── services/       # Services (CardService, SupabaseService)
│   │   └── shared/         # Componentes compartilhados
│   └── environments/       # Configurações de ambiente
├── angular.json
├── package.json
└── tsconfig.json
```

## 🛠️ Tecnologias

- **Frontend**: Angular 14, TypeScript, SCSS
- **UI Components**: ngx-bootstrap
- **Database**: Supabase (PostgreSQL)
- **Icons**: Bootstrap Icons

## 📄 Licença

Este projeto está sob a licença MIT.
