### TECHSPERTISE ASSESSMENT
- Implementation of a user registration and authentication system using NestJS and PostgreSQL. The goal is to create a secure mechanism for user registration, store user data in a PostgreSQL database, enable user authentication with the issuance of tokens, and host the project.

## Features
- Completely written in [Typescript](https://typescriptlang.org/)
- [Nestjs](https://docs.nestjs.com/) Nodejs framework
- [Postgres](https://www.postgresql.org/docs/) Powerful, open source object-relational database
- [TypeORM](https://typeorm.io/) ORM

#### RUN
- clone repo
- run `yarn install`
- run mv .env.example .env
- update the .env with local variables
- run `yarn run prepare` to install git pre-hook
- run `yarn run start:dev`

#### Creating migration file
- run `yarn run db:create <name of table/migration>`
- new migration file will be created in the project root folder
- move the migration file to the `src/migrations` folder
- edit the file to satisfaction
- run `yarn run db:migrate` to migrate the table into the db