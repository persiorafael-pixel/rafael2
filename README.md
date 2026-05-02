# 📚 Sistema de Ocorrências Escolares - SaaS

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3-blue.svg)](https://www.sqlite.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-lightgrey.svg)](https://expressjs.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-orange.svg)](https://jwt.io/)

Um sistema web SaaS moderno para gerenciamento de ocorrências escolares, com autenticação multi-tenant por escola, roles de usuário (Super Admin, Admin, Usuário) e interface responsiva.

## ✨ Funcionalidades

### 👤 Sistema de Usuários
- **Super Admin**: Gerencia todas as escolas, usuários e promove admins
- **Admin**: Aprova/rejeita usuários e gerencia ocorrências da própria escola
- **Usuário**: Registra e visualiza ocorrências escolares

### 🏫 Multi-Tenancy por Escola
- Escolas: COLEGIO ADV DO CAMPO LIMPO, COLEGIO ADV PIRAJUSSARA, ESCOLA ADV DA ALVORADA
- Isolamento completo de dados por escola
- Super admin acessa todas as escolas

### 📝 Gerenciamento de Ocorrências
- Criação de ocorrências com aluno, turma, descrição, data e hora
- Visualização de ocorrências por escola
- Histórico completo

### 🔐 Segurança
- Autenticação JWT
- Senhas criptografadas com bcrypt
- Middleware de verificação de token
- Controle de acesso baseado em roles

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js, Express.js, SQLite3, JWT, bcryptjs, CORS
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Banco de Dados**: SQLite (arquivo local)
- **Deploy**: Render (Node.js web service)

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+
- Git

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/rafaelpersio-afk/siteocorrencias.git
   cd siteocorrencias
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o servidor:
   ```bash
   npm start
   ```

4. Abra no navegador: `http://localhost:3000`

## 👥 Usuários de Teste

| Usuário | Senha | Role | Escola |
|---------|-------|------|--------|
| Rafa.admin | 123 | Super Admin | Todas |
| lucas.usuario | 123 | Usuário | COLEGIO ADV DO CAMPO LIMPO |
| junior.usuario | 123 | Usuário | COLEGIO ADV PIRAJUSSARA |

## 📁 Estrutura do Projeto

```
siteocorrencias/
├── backend/
│   ├── server.js          # Servidor principal
│   ├── auth.db           # Banco de autenticação
│   └── database.db       # Banco de dados app
├── frontend/
│   ├── index.html        # Página de login
│   ├── pages/            # Páginas do sistema
│   ├── js/               # Scripts JavaScript
│   └── css/              # Estilos CSS
├── package.json          # Configurações Node.js
├── render.yaml           # Configuração Render
└── README.md             # Este arquivo
```

## 🌐 Deploy Online

O projeto está configurado para deploy no [Render](https://render.com):

1. Conecte seu repositório GitHub
2. Crie um **Web Service** (não Static Site)
3. Configure:
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables: `NODE_ENV=production`

## 📖 Como Usar

1. **Login**: Use as credenciais de teste ou registre-se
2. **Super Admin**: Gerencie escolas e usuários globais
3. **Admin**: Aprove usuários pendentes da sua escola
4. **Usuário**: Crie e visualize ocorrências

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para detalhes.

## 📞 Contato

Rafael - rafaelpersio-afk

Link do projeto: [https://github.com/rafaelpersio-afk/siteocorrencias](https://github.com/rafaelpersio-afk/siteocorrencias)

