# Site RARA - Sistema de Ocorrências Escolares

Sistema web SaaS para ocorrências escolares com login por usuário e escola.

## Estrutura
- `backend/`: servidor Node.js com Express, SQLite, JWT e autenticação.
- `frontend/`: páginas HTML, CSS e JS para login, super admin, admin e dashboard.

## Instruções de instalação
1. Abra o Git Bash ou PowerShell.
2. Navegue até `Site completo/backend`.
3. Execute:
   ```bash
   npm install
   npm start
   ```
4. Acesse `frontend/index.html` no navegador.

## Usuários principais
- Super Admin: `Rafa.admin` / `123`
- Lucas usuario: `lucas.usuario` / `123`
- Junior usuario: `junior.usuario` / `123`

## Observações
- Novos cadastros pela página inicial são criados como `pendente`.
- Admin aprova ou recusa usuários da própria escola.
- Super Admin vê todos os usuários e promove usuários a admin.
- O backend está configurado para ouvir em `0.0.0.0` e permitir acesso em rede local.

