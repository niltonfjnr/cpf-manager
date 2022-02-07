## Dependencies
<a href="http://nodejs.org" target="_blank">Node.js (LTS)</a>
<a href="https://docs.docker.com/compose/install/" target="_blank">Docker Compose</a>

## Description
<p align="center">Used [Nest](https://github.com/nestjs/nest) framework because it brings TypeScript and Jest configurated, also a lot of design patterns which allows easy to maintain good practices in the project.</p>
<p align="center">
  <a href="http://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>



## Running the app (container)
```bash
# development
$ sudo docker-compose up
```

## Running the app (local)
```bash
# database
$ sudo docker-compose up db
```
```bash
# development
$ npm install
$ npm run start:dev
```
```bash
# unit tests
$ npm run test

```