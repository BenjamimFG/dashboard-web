# Dashboard web
## Sumário
1. [Bibliotecas utilizadas](#bibliotecas-utilizadas)  
2. [Rodando a aplicação com docker compose](#rodando-a-aplicação-com-docker-compose)  
3. [Rodando serviços individualmente](#rodando-serviços-individualmente)  
    3.1. [DB](#db)  
    3.2. [API](#api-1)  
    3.3. [WEB](#frontend-web-1) 
4. [Observações](#observações) 

## Bibliotecas utilizadas
### Banco de dados
  * PostgreSQL
### API
  * Python
  * Flask
  * psycopg (conector para DB PostgreSQL)
### Frontend WEB
  * ReactJS
  * D3.js
  * Material UI (para alguns botões)

## Rodando a aplicação com docker compose
Na pasta base da aplicação:
### Instalar docker compose
[Documentação de instalação](https://docs.docker.com/compose/install/)

### Subir aplicação
```bash
docker compose up -d
```
Após executar este comando o front-end deverá estar acessível em http://localhost:8080/

### Subir aplicação e forçar rebuild de todos os contêineres
Utilizar caso hajam alterações nas aplicação, caso contrário o docker uilizará uma imagem em cache já buildada previamente, opcionalmente utilizar o nome do serviço que quer re-buildar.
```bash
docker compose up -d --build
```
```bash
docker compose up -d --build api
```
```bash
docker compose up -d --build web
```

### Derrubar aplicação
```bash
docker compose down
```

### Resetar o banco de dados
O contêiner postgresql salva os dados do banco de dados no volume em ./db/data, para resetar o banco basta deletar esta pasta
```bash
rm -rf ./db/data
```

## Rodando serviços individualmente
### DB
1. Instalar o PostgreSQL:
* [Baixar e instalar na máquina host](https://www.postgresql.org/download/)  
OU  
* Subir um contêiner docker:
```bash
docker run --name my-db-name -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres:16.1
```

2. Rodar arquivos .sql iniciais
* Postgres instalado na máquina host:
  ```bash
  psql -U postgres -f db/sql/01-table-definition.sql && \
  psql -U postgres -f db/sql/01-table-definition.sql
  ```
* Postgres rodando como contêiner docker  

  copiar arquivos sql para o contêiner:
  ```bash
  docker cp ./db/sql/ my-db-name:/
  ```
  executar os arquivos sql no banco:
  ```bash
  docker exec my-db-name psql -U postgres -f /sql/01-table-definition.sql && \
  docker exec my-db-name psql -U postgres -f /sql/02-data-insert.sql
  ```

### API
[Instalar o python 3](https://www.python.org/downloads/)

Instalar Virtual Environment:
```bash
pip install virtualenv
```

Mudar de diretório para api:  
```bash
cd api
```

Criar virtual environment:
```bash
python -m venv .venv
```

Ativar virtual environment:
```bash
source .venv/bin/activate
```

Instalar bibliotecas:
```bash
pip install -r requirements.txt
```

Editar arquivo .env com as informações do banco de dados de acordo com o que foi instalado no passo anterior:
```bash
# arquivo .env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=postgres
```

Subir api:
```bash
python src/server.py
```

### Frontend WEB
[Instalar Node JS](https://nodejs.org/en/download)

Na pasta raiz, mudar de diretório para web:  
```bash
cd web
```

Instalar dependências:
```bash
npm i
```

Editar .env de acordo com a porta utilizada na aplicação web
(porta padrão do flask é 5000)
```bash
# arquivo .env
REACT_APP_API_URL=http://localhost:5000
```

Subir aplicação em modo desenvolvedor:
```bash
npm start
```

## Observações
A aplicação foi desenvolvida em um curto período de tempo, por tanto cabe uma vasta lista de melhorias à mesma, segue uma lista com **algumas** sugestões com possíveis pontos de melhora para a aplicação:

* DB  
  * Utilizar credenciais seguras ao invés das padrão
  * Utilizar Secrets do docker compose para passar as credenciais para o banco de dados
  * Salvar ranking dos indices no banco de dados e atualizar sempre que ouver uma alteração dos indíces (trigger)
* API
  * Utilizar uma ORM, como SQLAlchemy, caso necessário
  * Realizar tratamento de erros e retornar os devidos códigos HTTP de acordo com o padrão REST
  * Adicionar camada de cache
  * Servir em modo deploy com um servidor WSGI
* Frontend WEB
  * Adicionar backdrop com spinner para sinalizar ao usuário que a aplicação está carregando
  * Adicionar tooltips ao mapa na página /ranking
  * Utilizar CSS modules ou uma biblioteca de UI padronizada como bootstrap ou tailwind
  * Tratar possíveis erros dos dados recebidos da api
  * Tornar o layout responsivo
