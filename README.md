# taskify

# Description

Rest api for task aplication. Work is still in progress.

# Used technologies

1. Nestjs
2. Microservices
3. RabbitMQ
4. haproxy (loadbalancer)
5. Docker
6. docker-compose
7. postgres
8. pgadmin
9. eslint + prettier

# Services

1. Loadbalancer - working on port 3000
2. Auth-serivce - working on port 3002
3. Users-service - working on port 3003
4. Main-service - working on port 3001

# How to run

1. go to `/server/`
2. install node_modules `npm i`
3. check if all node_modules were installed
4. goto `/docker/`
5. `sudo docker-compose up`
6. create db in pgadmin
