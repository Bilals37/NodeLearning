Authentication System using Express, MongoDB, and JWT

This repository contains a simple authentication system implemented using Node.js with Express for handling HTTP requests, MongoDB for data storage, bcrypt for password hashing, and JSON Web Tokens (JWT) for user authentication.

* Install dependencies:
### `npm install`


* Set up MongoDB:

Make sure you have MongoDB installed locally.
** Create a database named authentication or update the MongoDB 
** connection string in the code accordingly.

* Start the server:
### `node index.js` 

or 

* Install Nodemon then statr the server:
###  `npm install -g nodemon`
###  `nodemon index.js`


## `Usage`

1. Registration
Endpoint: POST /register

To register a new user, send a POST request to the /register endpoint with the following JSON payload:

### [`Insert Data In Body If you are using Testing Client`]

{
  "name": "Your Name",
  "email": "your.email@example.com",
  "username": "your_username",
  "password": "your_password"
}

2. Login
Endpoint: POST /login

To log in, send a POST request to the /login endpoint with the following JSON payload:

### [`Insert Data In Body If you are using Testing Client`]

{
  "username": "your_username",
  "password": "your_password"
}
Upon successful login, the server will respond with a JWT token.

3. Token Verification (Dummy Endpoint)
Endpoint: GET /post

To test token verification, include the obtained JWT token in the Authorization header of a GET request to the /post endpoint. The server will respond with a message if the token is valid.


## `Dependencies`:

** Express: Web application framework for Node.js.
** Mongoose: MongoDB object modeling for Node.js.
** bcryptjs: Library for hashing passwords.
** jsonwebtoken: Library for creating and verifying JSON Web Tokens.