[![Build Status](https://travis-ci.org/ope-oguntoye/Fast-Food-Fast-Back.svg?branch=develop)](https://travis-ci.org/ope-oguntoye/Fast-Food-Fast-Back)  &nbsp; &nbsp; &nbsp;    [![codecov](https://codecov.io/gh/ope-oguntoye/Fast-Food-Fast-Back/branch/develop/graph/badge.svg)](https://codecov.io/gh/ope-oguntoye/Fast-Food-Fast-Back)


### Description
[**Fast-Food-Fast-Back**](https://fast-food-fast-server.herokuapp.com/api/v1) is the backend application for _**Fast-Food-Fast**_, an application that allows placement, acceptance/rejection and/or confirmation of meal orders.

## Features
Currently, this API provisions the following features:
 - Registration
 - Login
 - Order creation
 - Order fetching
 - Specific order Fetching
 - Order status mutation
## To set this project up locally
* Clone this repo and change into the directory:
 `$ git clone https://github.com/ope-oguntoye/Fast-Food-Fast-Back.git && cd Fast-Food-Fast-Back`

* Install the dependencies:  `npm i`

* Create .env file with environment variables in root folder:
`$ echo "PORT=3000" >> .env`

* Start the development server: `npm run devstart`

## Testing
* To run the tests, run `npm test`
An admin account is provided with these default credentials:
 - username: admin
 - password: admin


### Dependencies

- [NodeJS](https://github.com/nodejs/node) - A JavaScript runtime environment
- [Express](https://github.com/expressjs/express) - Fast, unopinionated, minimalist web framework for node
- [Babel](https://github.com/babel/babel) - Next generation JavaScript, today (transpiler)
- [Prettier](https://github.com/babel/babel) - Prettier is an opinionated code formatter.
- [Eslint](https://github.com/eslint/eslint) - A fully pluggable tool for identifying and reporting on patterns in JavaScript
- [Mocha](https://github.com/mochajs/mocha) - Simple, flexible, fun javascript test framework for node.js & the browser
- [Chai](https://github.com/chaijs/chai) - BDD / TDD assertion framework for node.js and the browser that can be paired with any testing framework
- [Istanbul](https://github.com/istanbuljs) - Yet another JS code coverage tool that computes statement, line, function and branch coverage

