import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/server';
import { users } from '../src/datastores/userData';
import orders from '../src/datastores/orderData';

const { expect } = chai;
chai.use(chaiHttp);

const ROOT_URL = `/api/v1`;

const orderToMake = {
  name: 'nugg',
  qty: '4',
  category: 'pizza'
};

describe('app flow', () => {
  describe('unregistered', () => {
    it('annon user cannot make orders', () => {
      chai
        .request(server)
        .post(`${ROOT_URL}/orders`)
        .send(orderToMake)
        .end((err, res) => {
          expect(res.status).eq(401);
          expect(res.body.success).eq(false);
          expect(res.body.message).eq(
            `you must be logged in to access the requested resource`
          );
        });
    });

    it('annon user cannot fetch orders', () => {
      chai
        .request(server)
        .get(`${ROOT_URL}/orders`)
        .end((err, res) => {
          expect(res.status).eq(401);
          expect(res.body.success).eq(false);
          expect(res.body.message).eq(
            `you must be logged in to access the requested resource`
          );
        });
    });
  });

  /* 

  */
  describe('register -> login -> order', () => {
    const newUser = {
      username: `martin-Skope`,
      password: `blabla`,
      email: `nyet@pillow.me`
    };

    it('Should register new user', () => {
      chai
        .request(server)
        .post(`${ROOT_URL}/users/register`)
        .send(newUser)
        .end((err, res) => {
          expect(res.status).eq(201);
        });
    });

    it('Should save user to datastore', () => {
      expect(Boolean(users.findByUsername(newUser.username))).eq(true);
    });

    it('Registered user can login', () => {
      chai
        .request(server)
        .post(`${ROOT_URL}/users/login`)
        .send(newUser)
        .end((err, res) => {
          expect(res.status).eq(200);
          expect(res.body.message).eq(
            `successful login as ${newUser.username}`
          );
        });
    });

    it('logged in user can create an order', () => {
      chai
        .request(server)
        .post(`${ROOT_URL}/orders`)
        .send(orderToMake)
        .end((err, res) => {
          expect(res.status).eq(201);
          expect(res.body.message).eq(`Order created successfully`);
          expect(typeof res.body.data).eq('object');
        });
    });

    it('Should save order to datastore', () => {
      Object.keys(orderToMake).map(OrderProp => {
        expect(orders.findByProp(OrderProp)).eq(orderToMake.OrderProp);
      });
    });

    it('logged in user can fetch orders', () => {
      chai
        .request(server)
        .get(`${ROOT_URL}/orders`)
        .end((err, res) => {
          expect(res.status).eq(200);
          expect(res.body.message).eq(`fetched order list successfully`);
          expect(typeof res.body.data).eq('object');
        });
    });
  });
});
