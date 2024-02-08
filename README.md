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
- run `yarn run huskyprepare` to install git pre-hook
- run `yarn run start:dev`

#### Creating migration file
- run `yarn run new:migration <name of table/migration>`
- new migration file will be created in `src/migrations`
- edit the file to satisfaction
- run `yarn run migrate` to migrate the table into the db

#### Documentation
- Postman [Documentaion link](https://documenter.getpostman.com/view/25225100/2s9YyzbcfG)