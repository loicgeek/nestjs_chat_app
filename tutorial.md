# Build a real world chat app with @NestJs, vuejs and MySQL. (PART1: Introduction and Authentication Module)

## Introduction

Nowadays, there are some framework trying to make nodejs code more structured and easily scalable, Some of them are AdonisJs and NestJs. The second one is parlicularly interesting because of their good documentation available at <a href="nestjs.io">Nestjs.io</a> and the growing community behind this framework. It also have a good integration with <a href="delightful.typeorm.io">TypeORM </a> which support several database like MySQL, PostgreSQL and even MongoDB database.Finally we gonna use VueJS for our frontend side of the project because we can make things ready very quickly with Vue.
<br><b>N.B:</b> This tutorial assumes you already have some basic understanding of these three technology , we also gonna deal with passport authentication with the Jwt strategy, before move forward let's see what we gonna build at then end of this tutorial series.

<img src='../chat_app_Server.gif' width='100%' height="650px">

## Features

Let see in detail all features available in this app:
<br>

 <ul type="ol">
 <li> User Registration </li>
 <li> User Authentication </li>
 <li> User online status</li>
 <li> New Message notification</li>
 <li> And More...</li>
</ul>

<h1>Project Initialization</h1>
NestJS is dropped to us a very interesting cli Nest-cli , which is build on top of the angular-cli. If you want read more about just check the official documentation <a href='https://nestjs.io'>Here!</a>. Let us create a new Project by running :

```
npm i -g @nestjs/cli

nest new chat_app_server
```

The first command gonna install the @nestjs/cli globally and the second will create a new project called <b>chat_app_server</b>. Navigate to the project directory and open it with your favorite IDE, In this tutorial, I will Use Visual Studio Code.
<br> To test is our project is successfully created, let us serve it in watch mode ( <b>that mean whenever a file change , the server will reload include these changes </b>) , run

```
npm run start:dev
```

If everything is okay, you should see the message in console :

```
[Nest] 12800   - 11/23/2019, 6:02:49 PM   [NestApplication] Nest application successfully started
```
