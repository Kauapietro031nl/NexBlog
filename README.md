# NexBlog 

NexBlog é uma aplicação web de blog moderna, construída com **React**, **Vite**, e **Firebase**. O objetivo é permitir que usuários criem, editem, busquem e excluam postagens com uma interface intuitiva e responsiva.

## ✨ Funcionalidades

- ✅ Cadastro e login de usuários com Firebase Authentication
- 📝 Criação, edição e exclusão de postagens
- 🔍 Busca de postagens por palavra-chave
- 📁 Interface organizada por páginas (Home, Dashboard, Login, etc.)
- 🎨 Estilização modular com CSS Modules
- 🔒 Proteção de rotas com contexto de autenticação

## 🛠️ Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Firebase (Firestore + Auth)](https://firebase.google.com/)
- [React Router](https://reactrouter.com/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [ESLint](https://eslint.org/)

## 🚀 Como executar localmente

1. Clone o repositório:

```bash
git clone https://github.com/Kauapietro031nl/NexBlog.git
cd NexBlog
````

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` com as configurações do Firebase:

```env
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id
```

4. Inicie a aplicação:

```bash
npm run dev
```

Abra `http://localhost:3000` no navegador.

## 📂 Estrutura do Projeto

```
NexBlog/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── firebase/
│   ├── hooks/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```

## 🧑‍💻 Autor

**Kauã Pietro**
🔗 [GitHub](https://github.com/Kauapietro031nl)
📧 Em desenvolvimento :)



## ⭐ Contribua!

Quer sugerir melhorias ou reportar bugs? Fique à vontade para abrir uma [issue](https://github.com/Kauapietro031nl/NexBlog/issues) ou fazer um pull request.
