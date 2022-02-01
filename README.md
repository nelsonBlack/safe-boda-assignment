


## Description
Application was buit with 
[Nest](https://github.com/nestjs/nest) A progressive Node.js framework for building efficient, reliable and scalable server-side applications.

[Typeorm](https://typeorm.io/) A type based Orm for node

[Swagger](https://typeorm.io/) For api documentation

[Docker](https://typeorm.io/) For containarization

[Postgress](https://typeorm.io/) Sql Database



![2](https://user-images.githubusercontent.com/13407936/151975228-46109ea7-1a36-43a4-a53f-bd074d63c1cb.gif)



## Installation

```bash
$ npm install
```

## Running the app in Container

```bash
# development
docker-compose up --build

```

## Viewing app endpoints in swagger and testing out 

```bash
# 
Navigate to http://localhost:3000/api/

Go to endpoint named /staffs/login in swagger and execute /click try out i.3 call login endpoint

You will get JWT token in response , use that token in all other endpoints 

NB App auto creates stafff/admin with the followng details
[Code link to where app auto creates admin](https://github.com/nelsonBlack/safe-boda-assignment/blob/f5bebcba2c906becaa64516fa0dd9d75dbd329f1/src/modules/staffs/staffs.service.ts#L16)

 email: `test@mail.comm`,
  password: 'pass', 


```
## Running the app in local with by connecting database container image to local run app

```bash
 run npm install
Go to .env file and change line 2 from POSTGRES_HOST=postgres-db to POSTGRES_HOST=localhost
docker-compose up --build db

After db container boots run :- npm run start:local

```
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

