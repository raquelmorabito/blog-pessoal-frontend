# Blog Pessoal - Frontend

## Visão Geral
Este projeto é um frontend para um blog pessoal desenvolvido em React com TypeScript, utilizando Vite como ferramenta de build. O design do projeto segue uma estrutura modular para organização de componentes e funcionalidades, garantindo manutenção e extensibilidade simplificada.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **Vite**: Ferramenta de build rápida para aplicações frontend modernas.
- **CSS**: Estilização para componentes visuais.
- **Toastify**: Implementado no arquivo utilitário para notificações (via `ToastAlerta.ts`).
- **Vercel**: Hospedagem do projeto para acesso e teste.

## Estrutura de Pastas

### **components**
Contém componentes reutilizáveis organizados por funcionalidade:
- **footer**: Componente para rodapé da aplicação.
- **navbar**: Componente da barra de navegação.
- **postagens**: Componentes relacionados à manipulação de postagens.
- **temas**: Componentes para interação e exibição de temas.

### **contexts**
- **AuthContext.tsx**: Contexto para autenticação de usuários.
- **UserContext.tsx**: Contexto para dados específicos de usuários.

### **models**
Define as interfaces utilizadas no projeto:
- **Postagem.ts**
- **Tema.ts**
- **Usuario.ts**
- **UsuarioLogin.ts**

### **pages**
Organiza as páginas principais:
- **cadastro**: Formulário de cadastro de usuários.
- **home**: Página inicial do blog.
- **login**: Tela de autenticação.
- **perfil**: Tela para exibição de informações do perfil do usuário.

### **services**
- **Service.ts**: Responsável por interação com a API backend.

### **utils**
- **ToastAlerta.ts**: Configuração e exibição de notificações.

## Como Executar o Projeto Localmente

### **Requisitos**
- Node.js instalado
- Gerenciador de pacotes (npm ou yarn)

### **Passos**
1. Clone o repositório:
   ```bash
   git clone <https://github.com/raquelmorabito/blog-pessoal-frontend>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse o projeto no navegador em `http://localhost:5173`.

## Deploy

O projeto está hospedado na Vercel e pode ser acessado através do link:

[Blog Pessoal - Frontend](https://blog-pessoal-frontend-roan.vercel.app/)

## Contribuição

1. Fork este repositório.
2. Crie uma branch para sua feature ou correção: `git checkout -b minha-feature`.
3. Realize as alterações e faça commit: `git commit -m "Minha nova feature"`.
4. Envie para o repositório remoto: `git push origin minha-feature`.
5. Abra um pull request.

