[![Build Status](https://travis-ci.org/ope-oguntoye/Fast-Food-Fast-Back.svg?branch=develop)](https://travis-ci.org/ope-oguntoye/Fast-Food-Fast-Back)  &nbsp; &nbsp; &nbsp;    [![codecov](https://codecov.io/gh/ope-oguntoye/Fast-Food-Fast-Back/branch/develop/graph/badge.svg)](https://codecov.io/gh/ope-oguntoye/Fast-Food-Fast-Back)

`ROOT_URL = https://fast-food-fast-server.herokuapp.com/api/v1`
# USERS
|  METHOD  |             ROUTE               |  DESC |
|  ------  |             -----               |------------ |
|   POST   |  `${ROOT_URL}/users/register`   | Register user|
|   POST   |  `${ROOT_URL}/users/login`      | Login user|
|   GET    |  `${ROOT_URL}/users/register`   | Redirect if logged in|
|   GET    |  `${ROOT_URL}/users/login`      | Redirect if logged in|

# ORDERS
|  METHOD  |             ROUTE               |  DESC |
|  ------  |             -----               |------------ |
|   POST   |  `${ROOT_URL}/orders`   | Create Order|
|   GET    |  `${ROOT_URL}/orders`      | Fetch all Orders|
|   GET    |  `${ROOT_URL}/orders/:id`      | Fetch order by id|
|   PUT    |  `${ROOT_URL}/orders/:id`      | Update single order status|

 
# SAMPLE REQUESTS
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
- [x] user tests
- [x] user registration
- [x] user login
- [x] order tests
- [x] order creation
- [x] order fetching
- [x] order fetching (by id)
- [x] order update
- [ ] admin user implementation
- [ ] restrict order update route to **only admin**
- [ ] ...extras