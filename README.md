# Twoutch

## Requirement

- Node js version 17+ ✅

## 🛠️ Installation

- create .env with .env_exemple, add your database connection and generate your token with the following command :

```bash 
node

require('crypto').randomBytes(64).toString('hex')
```

- npm install

## Start project

For start the project, use one of this following command :

- npm run dev

- npm run start

## Documentation

Once you run the application, you can  access to swagger documentation here :

http://localhost:3000/api-docs/


## Features

This API contain 3 type of users :

- Public : Can search a movie or a serie in our catalog, create an account and register.

- User : Can update his profile, interact with his favorite, playlist , recommandation and delete his account.

- Admin : Can add, update and delete movies and series, see userlist and consult a user.