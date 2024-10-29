# This project uses Clean Architecture

# Instructions
1. Clonar el archivo .env.template y renombrarlo a .env
2. Configurar las variables de entorno

```
PORT=
MAILER_EMAIL=
MAILER_SECRET_KEY= 
PROD=
```
3. Ejecutar el comando ```npm install```
4. Ejecutar el comando ```npm run dev```

## Obtener Gmail Key
[Google AppPasswords](https://myaccount.google.com/u/0/apppasswords)

## Presentation

It is the layer in charge of interacting with the user, presenting the data in an understandable way and managing interactions with the application. It communicates with the domain layer through use cases to obtain or modify data, but never contains business logic. Your responsibility is only to manage how the data is presented and how the user interacts with it.


## Domain (Business logic & rules)

- datasources (is implemented in the outer layer "Infrastructure")
    * data sources abstractions (db, API's, etc)
    * data sources interfaces (db, API's, etc)
    * NO IMPLEMENTATION HERE, ONLY CONTRACTS

- entities
    * represent objects business or domain models
    * encapsulate data and associated logic

- repository 
    * interfaces / abstract classes (contracts)
    * access data needed by entitites or use cases
    * they serve as intermediaries between data sources (database, APIs, etc.) and business rules.
    * example: log.repository defines abstract methods like saveLog or getLogs without implementation

- use-cases 
    * it contains app logic
    * they are the intermediaries between entities and repositories
    * each use case represents a specific operation that the user can make within the system


# Intrastructure

Implementations of the repositories or data sources defined in the domain layer. This is where you define the details of how you connect databases, external APIs, caching, file systems, or any other external services.