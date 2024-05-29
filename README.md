# Web-Carros

Bem-vindo ao projeto **Web-Carros**! Este projeto é uma aplicação web para gerenciar e visualizar carros. A aplicação permite que os usuários façam login, cadastrem-se, visualizem uma lista de carros, filtrem os carros por critérios específicos e cadastrem seus próprios carros. Além disso, os usuários podem ver uma lista dos seus carros cadastrados em um dashboard.

## Funcionalidades

- **Login**: Autenticação de usuários para acessar a aplicação.
- **Cadastro**: Registro de novos usuários.
- **Listagem de Carros**: Visualização de uma lista de carros disponíveis.
- **Filtro de Carros**: Filtragem dos carros por critérios específicos (ex: marca, modelo, ano).
- **Cadastro dos Meus Carros**: Permite que os usuários cadastrem seus próprios carros na aplicação.
- **Dashboard**: Visualização dos carros cadastrados pelo usuário.

## Tecnologias Utilizadas

- **React.js**: Biblioteca JavaScript para construção da interface do usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vite**: Ferramenta de build e bundler para projetos frontend.
- **Firebase**: Plataforma de desenvolvimento de aplicativos que inclui autenticação e banco de dados.
- **React-Hot-Toast**: Biblioteca para exibição de notificações toast.
- **React-Hook-Form**: Biblioteca para gerenciar formulários em React.
- **React-Hooks**: Hooks do React para gerenciamento de estado e efeitos colaterais.
- **Tailwind CSS**: Framework CSS utilitário para estilização da aplicação.

## Instalação e Configuração

### Pré-requisitos

- Node.js e npm instalados na máquina.
- Conta no Firebase para configuração da autenticação e banco de dados.

### Passos para Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/web-carros.git
   cd web-carros
2. Instale as dependências:
   ```bash
   npm install
3. Configure o Firebase:
Crie um projeto no Firebase.
Configure a autenticação por email/senha.
Adicione um banco de dados Firestore.
Copie as configurações do Firebase para um arquivo .env na raiz do projeto
   ```bash
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
    VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev






