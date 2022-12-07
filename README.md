# studyfy.io

# Description

Projekt aplikacji wspomagającej studenckie życie leniwych ludzi.

_Dla leniwych ludzi od leniwych ludzi_

# Jak to odpalić

## Co musisz mieć

Aby odplaić środowisko lokalnie musisz mieć:

1. Node 16.16.1
2. Docker
3. Docker-compose
4. OPCJONALNIE: `Postman`
5. Dużo cierpliwości

## Instalacja node_modules

1. Przejdź do `server`
2. Wpisz `npm i` i możesz iść na kawę bo chwilę poptrwa
3. Przejdź do folderu `/server/common` i wpisz `npm i`

## Odpalanie dockera

1. Przejdź do `docker`
2. Uruchom `docker-compose up`

Stworzą się kontenery:

1. Serwisu Autorycacji !
2. Serwisu Użytkownika !
3. Serwisu Main
4. Bazy danych postgress !
5. Pgadmina
6. LoadBanalcera !
7. RabbitMQ !

Ponieważ są to mikroserwisy, są to osobne byty każdy życjący swoim życiem, będące jedynie lekko zależne od siebie.

**_Jeśli masz problemy z ramem lub czymś innym spokojnie możesz wyłączyć serwisy nie posiadające koło siebie wykrzyknika_**

# Dokumentajca

## Backend

Każdy serwis pracuje wraz z swaggerem dziąłającym pod adresem `http:localhost:PORT_MIKROSERWISU/api/docs`

Można też sprawdzać korzystając z `postmana` wykonując requesty bezpośrenio na loadbalancer `:3000` lub każdy mikroserwis osobno

## Logowanie

Każdy endpoint wyposażony jest w logi

TODO napisz konwencje logowania dla:

1. Debugu
2. Successu
3. Erroru

# Formatowanie kodu

**_====================UWAGA====================_**

_Żaden Pull Request nie zostanie wpuszczony jeśli nie będzie przejdzie testów eslint i prettier_

## Serwer

Skonfugurowany jest prettier i eslint dbające o poprawne coding patterns oraz czystość pisanego kodu.

Formatowanie można sprawdzić za pomocą `npm run format` wykonanej w `/server`

# Testy

TODO napisz testy do serwisóœ i wszsyskitego co się da

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
