### Nestjs Boilerplate 2

## Features
- Completely written in [Typescript](https://typescriptlang.org/)
- [Nestjs](https://docs.nestjs.com/) Nodejs framework
- [Postgres](https://www.postgresql.org/docs/) Powerful, open source object-relational database
- [MongoDB](https://www.mongodb.com/docs/manual/) A document database designed for ease of application development and scaling.
- [TypeORM](https://typeorm.io/) ORM
- [Mongoose](https://mongoosejs.com/) MongoDB object modeling

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