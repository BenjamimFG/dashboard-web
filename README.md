# Dasboard web

## Rodando a aplicação

### 1. Instalar Docker-Compose
Baixar e instalar o docker compose conforme instruções https://docs.docker.com/compose/install/

### 2. Subir os contêineres por meio do docker-compose
Na pasta raiz do projeto rodar o comando: `docker-compose up -d`.  
`-d`: flag para rodar o docker-compose em modo detached, ou seja, devolver o controle do terminal para o usuário após subir os contêineres.  
Caso seja feita alguma alteração na API, para reconstruir a imagem utilizar:  
`docker-compose up -d --build api`

### Conectar ao contêiner database
Após subir os contêineres por meio do docker-compose, para conectar ao contêiner de database com psql:  
`docker exec -it <nome_do_conteiner> psql -U postgres`