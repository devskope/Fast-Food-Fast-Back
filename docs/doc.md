[![Build Status](https://travis-ci.org/ope-oguntoye/Fast-Food-Fast-Back.svg?branch=develop)](https://travis-ci.org/ope-oguntoye/Fast-Food-Fast-Back)  &nbsp; &nbsp; &nbsp;    [![codecov](https://codecov.io/gh/ope-oguntoye/Fast-Food-Fast-Back/branch/develop/graph/badge.svg)](https://codecov.io/gh/ope-oguntoye/Fast-Food-Fast-Back)

## Local Setup and testing
```
$ git clone https://github.com/ope-oguntoye/Fast-Food-Fast-Back.git && cd Fast-Food-Fast-Back

$ npm i

$ echo "PORT='port to listen on'" >> .env   // ex: PORT=3000


$ npm run devstart  // start development server

$ npm test // test

```
#

To manualy test endpoints in deveplopment with [Postman](https://getpostman.com):

- Import the [postman dev collection](https://github.com/ope-oguntoye/Fast-Food-Fast-Back/tree/develop-patch/utils/fff-dev.postman_collection.json) into postman.
- start the development server (_on `port 3000`_)
- Send requests using postman


---
&nbsp;
# API

`SITE_ROOT = https://fast-food-fast-server.herokuapp.com`

`ROOT_URL = https://fast-food-fast-server.herokuapp.com/api/v1`
# USERS
|  METHOD  |             ROUTE               |  DESC |
|  ------  |             -----               |------------ |
|   POST   |  `${ROOT_URL}/users/register`   | Register user|
|   POST   |  `${ROOT_URL}/users/login`      | Login user|
|   GET    |  `${ROOT_URL}/users/register`   | Redirect if logged in|
|   GET    |  `${ROOT_URL}/users/login`      | Redirect if logged in|
|   GET    |  `${ROOT_URL}/users/logout`     | Logout user|

# ADMIN
|  METHOD  |             ROUTE               |  DESC |
|  ------  |             -----               |------------ |
|   POST   |  `${SITE_ROOT}/super/login`   | Login admin|
|   POST   |  `${SITE_ROOT}/super/logout`   | Logout admin|

# ORDERS
|  METHOD  |             ROUTE               |  DESC |
|  ------  |             -----               |------------ |
|   POST   |  `${ROOT_URL}/orders`   | Create Order|
|   GET    |  `${ROOT_URL}/orders`      | Fetch all Orders|
|   GET    |  `${ROOT_URL}/orders/:id`      | Fetch order by id|
|   PUT    |  `${ROOT_URL}/orders/:id`      | Update single order status (**_Only Admin_**)|

 
# SAMPLE REQUESTS

 See [postman docs.](https://documenter.getpostman.com/view/5312930/RWaKRTSa)

## USER 

## _Reg -> Login:_

```javascript
{
  username: ${uname},
  password: ${pass},
  email: ${email}    // optional on reg, absent onLogin 
}
```
## ORDERS

## _Creation:_

```javascript
 /*
  * Order id, status added onsave
  * 
 */
{ 
  category: ${category},  // maybe pizza :) 
  name: ${name},         // what kind of pizza
  qty: ${qty},          // a thousand please!
  ...extras            //  obj ex. { topping: 'hotsauce', ...x}
}
```
## _Updating:_


```javascript
{
  status: 'completed' || 'declined' || 'confirmed'
}
```

 TODO:
- [x] User tests
- [x] User registration
- [x] User login
- [x] Order tests
- [x] Order creation
- [x] Order fetching
- [x] Order fetching (by id)
- [x] Order update
- [x] Admin user implementation
- [x] Restrict order update route to _**only admin**_
- [x] More tests
- [ ] ...extras