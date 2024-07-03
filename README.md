# Basic Backend Log-in Project :lock:

## Overview :mag:

Welcome to the Basic Log-in Backend Form with Authorization! This project provides a simple and secure way to handle user authentication and authorization for your web applications. It includes essential features to manage user sessions and protect restricted resources.

### Features :sparkles:

- **User Registration** :clipboard:

  - Users can create accounts by providing a unique username and a password.
  - The password is hashed and securely stored in the database to ensure that plain-text passwords are never saved.

- **Log-in Authentication** :key:

  - Users can log in using their registered username and password.
  - The system verifies the credentials against the stored hashed password.
  - On successful authentication, a JSON Web Token (JWT) is issued to the user for session management.

- **Session Management** :hourglass_flowing_sand:

  - The JWT token is used to maintain user sessions.
  - Users can stay logged in and access protected resources until the token expires or they log out.
  - The token can be stored on the client-side (e.g., in local storage or cookies).

- **Authorization** :shield:

  - Protects specific routes and ensures only authenticated users can access them.
  - Middleware functions check the presence and validity of the JWT before granting access to protected endpoints.
  - Users are granted different levels of access based on their roles or permissions defined in the JWT payload.

- **Password Encryption** :key:

  - Uses bcrypt to hash and salt user passwords before storing them in the database.
  - Bcrypt is an industry-standard library that ensures passwords are stored securely and are resilient against common attacks like brute force or rainbow tables.

## Useful Keywords :key:

- Bcrypt
- JWT (JSON Web Token)
- Authentication
- Authorization
- Protected Routes
- Middleware
- Hashing
- Salting
- Client-Server Architecture
- Refresh Tokens
- Access Tokens
- Endpoint Protection

## Technologies Used :computer:

This project is designed to be flexible and allows you to choose the technologies that best fit your needs. Below are some recommended options, but feel free to substitute with your preferred tools and libraries:

- **Backend Framework** :hammer_and_wrench:

  - [Express.js](https://expressjs.com/) - A fast, unopinionated, minimalist web framework for Node.js.
  - Alternatives: [Koa.js](https://koajs.com/), [Hapi.js](https://hapi.dev/), [NestJS](https://nestjs.com/).

- **Database** :card_file_box:

  - [MongoDB](https://www.mongodb.com/) - A flexible, scalable NoSQL database.
  - Alternatives: [PostgreSQL](https://www.postgresql.org/), [MySQL](https://www.mysql.com/), [SQLite](https://www.sqlite.org/), [Firebase Firestore](https://firebase.google.com/products/firestore).

- **Authentication** :key:

  - [JWT (JSON Web Tokens)](https://jwt.io/) - Compact, URL-safe tokens for securely transmitting information.
  - Alternatives: [OAuth 2.0](https://oauth.net/2/), [Passport.js](http://www.passportjs.org/), [Auth0](https://auth0.com/).

- **Password Encryption** :lock:

  - [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - A library for hashing and salting passwords.
  - Alternatives: [argon2](https://github.com/ranisalt/node-argon2), [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2), [scrypt](https://nodejs.org/api/crypto.html#crypto_crypto_scrypt_password_salt_keylen_options_callback).
