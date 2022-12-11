<h1 align="center">
🌐 Parking Booking System  - MERN Stack
</h1>
<p align="center">
MongoDB, Expressjs, React/Redux (TypeScript), Nodejs
</p>

<p align="center">
   <a href="">
      <img src="https://img.shields.io/badge/License-MIT-green.svg" />
   </a>
</p>

> MERN is a fullstack implementation in MongoDB, Expressjs, React/Redux, Nodejs.

Parking booking system created with MERN stack. Back end API is developed with Express.js with Javascript and Front End is developed with React JS with Redux Thunk using TypeScript.

## clone or download
```terminal
$ git clone https://github.com/ravinthedev/parking-booking-system.git
$ yarn # or npm i
```

## project structure
```terminal
LICENSE
api/
   package.json
   .env (to create .env, check [prepare your secret session])
client/
   package.json
db   
...
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd client          // go to client folder
$ yarn # or npm i    // npm install packages
$ npm start        // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

## Server-side usage(PORT: 8000)

### Prepare your secret

run the script at the first level:

(You need to check and properly set JWT_KEY, JWT_SECRET and MONGO_URI in .env to connect to MongoDB and etc.)

### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm run server // run it locally
```

### Demo URL:

You can find full working demo version of this app at 
```javascript
   <a href="http://15.206.123.52:3000/register">http://15.206.123.52:3000/register</a>
```

## Author
[ravinthedev](https://github.com/ravinthedev)
