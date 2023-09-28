# door-game-api

Esta é uma API em Node JS com Express, para manipulação de um banco de dados SQL, implementando o modelo MVC para o CRUD das entidades.

## Como rodar?

- rodar sudo apt-get install mysql-server

- rodar mysql -u `usuario` -p `senha do usuario`

- executar o arquivo sql/door_Game.sql

- no projeto, rodar npm i

- npm run start

- Pronto :D

# testes

A única biblioteca de testes implementada foi o jest, que usa o jest-mock-expanded para mockar algumas classes.

## para executar:

npm test

# Hooks

Há o husky instalado, para rodar os hooks de pré-commit.

## utilidades:

1. git config --global alias.send '!git add -A && git commit'
2. adicione um commit com o 'git send -m"commit".

# enpoints

1. **GET /extendedTexts**

   - Parâmetros: Nenhum.
   - Retorno: Retorna uma lista de todos os `extendedTexts`.

2. **GET /extendedTexts/:id**

   - Parâmetros:
     - `id`: ID do `extendedText` desejado.
   - Retorno: Retorna as informações do `extendedText` com o ID fornecido.

3. **POST /extendedTexts**

   - Parâmetros:
     - Body JSON: Propriedades do `extendedText` a ser inserido.
   - Retorno: Confirmação de inserção do `extendedText`.

4. **PUT /extendedTexts/:id**

   - Parâmetros:
     - `id`: ID do `extendedText` a ser atualizado.
     - Body JSON: Propriedades atualizadas do `extendedText`.
   - Retorno: Confirmação de atualização do `extendedText`.

5. **DELETE /extendedTexts/:id**
   - Parâmetros:
     - `id`: ID do `extendedText` a ser deletado.
   - Retorno: Confirmação de exclusão do `extendedText`.
