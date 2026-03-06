# 🧠 Banco de Trocas de Conhecimento - Frontend

## 🎯 Objetivo do Projeto

Esta aplicação web foi desenvolvida para tornar o processo de aprendizado mais acessível e organizado. Ela permite o cadastro e a visualização de conhecimentos oferecidos por pessoas da comunidade, conectando de forma simples e intuitiva quem deseja ensinar com quem deseja aprender.

O sistema atende a todos os requisitos do projeto DFS-2026.1, fornecendo uma interface amigável para gerenciamento de ofertas de conhecimento, incluindo a criação, listagem, edição e exclusão (CRUD completo).

✨ **Diferencial Implementado:** Sistema de Autenticação JWT. Apenas o usuário que criou a oferta possui permissão para editá-la ou excluí-la, garantindo a segurança dos dados.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

| Tecnologia | Descrição |
|---|---|
| **ReactJS** | Biblioteca principal para construção da interface |
| **Vite** | Ferramenta de build rápida para o ambiente de desenvolvimento |
| **Tailwind CSS** | Framework utilitário de CSS para padronização do Design System e responsividade |
| **Axios** | Cliente HTTP para comunicação com a API (Backend) |
| **React Router Dom** | Gerenciamento de rotas e navegação da aplicação |
| **JWT Decode** | Decodificação segura do token de autenticação no lado do cliente |

---

## 🚀 Como Executar a Aplicação

### Pré-requisitos

- Node.js instalado na máquina
- O Backend da aplicação rodando localmente (por padrão na porta `3000`)

### Passo a Passo

**1. Clone o repositório:**
```bash
git clone https://github.com/SEU_USUARIO/frontend-avanti.git
```

**2. Acesse a pasta do projeto:**
```bash
cd frontend-avanti
```

**3. Instale as dependências:**

Isso instalará o React, Tailwind e todas as bibliotecas necessárias.
```bash
npm install
```

**4. Configure a Variável de Ambiente (Opcional):**

A aplicação tentará se conectar ao backend em `http://localhost:3000` por padrão. Se o seu backend estiver em outra porta, crie um arquivo `.env` na raiz do projeto com:
```env
VITE_API_URL=http://localhost:SUA_PORTA
```

**5. Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

**6. Acesse no navegador:**

Abra o link fornecido no terminal (geralmente `http://localhost:5173`).