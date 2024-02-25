docker-compose build

docker-compose up -d

This will take a while since the app will start only until all mysql servers are ready

DB Migrations:

docker-compose exec backend-command npm run typeorm migration:run -- -d build/src/database.source.js

docker-compose exec backend-command npm run typeorm migration:run -- -d build/src/query-database.source.js

Architecture:
 - Mysql 1: Store all relational data
 - Mysql 2: Denormalize version of Mysql 1, synced using Redis as queue provider
 - Redis: Queue provider
 - App : Node v21

 Postman collection attached