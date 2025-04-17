No diretório do projeto executar docker compose up para subir um container docker com o banco de dados postgresql.

Execute o comando para executar o script dentro do container do banco de dados.
docker exec -i postgres psql -U postgres -d user_crud < init.sql

docker compose up -d

"migration:run": "npm run typeorm -- migration:run -d data-source.ts"
