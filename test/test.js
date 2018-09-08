import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/server';
import Order from '../src/models/orders';
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

const spoofOrders = () => {
  new Order(orderToMake).save();
  new Order(orderToMake).save();
  new Order(orderToMake).save();
};

describe('Activity flow:', () => {
  describe('unregistered', () => {
    it('annon user must not make orders', () => {
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

    it('annon user must not fetch orders', () => {
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

    it('logged in user can fetch specific order', () => {
      spoofOrders();

      const id = 3;

      chai
        .request(server)
        .get(`${ROOT_URL}/orders/${id}`)
        .end((err, res) => {
          expect(res.status).eq(200);
          expect(res.body.message).eq(`order found`);
          expect(typeof res.body.data).eq('object');
          expect(res.body.data.id).eq(id);
        });
    });

    it('logged in user should not fetch non-existent order', () => {
      const id = 32;

      chai
        .request(server)
        .get(`${ROOT_URL}/orders/${id}`)
        .end((err, res) => {
          expect(res.status).eq(404);
          expect(res.body.message).eq(`no order found`);
        });
    });
  });

  describe('Order states', () => {
    it('orders should be pending by default', () => {
      expect(orders.findById(1).status).eq('pending');
    });

    it('order states can be successfully mutated correctly', () => {
      const id = 1;

      ['completed', 'confirmed', 'declined'].map(x => {
        chai
          .request(server)
          .put(`${ROOT_URL}/orders/${id}`)
          .send({ status: x })
          .end((err, res) => {
            expect(res.status).eq(200);
            expect(res.body.message).eq(`order #${id} has been marked as ${x}`);
          });
      });
    });

    it('order states should not be incorrectly mutated', () => {
      const id = 1;

      ['complete', 'confirm', 'decline'].map(x => {
        chai
          .request(server)
          .put(`${ROOT_URL}/orders/${id}`)
          .send({ status: x })
          .end((err, res) => {
            expect(res.status).eq(500);
            expect(res.body.message).eq(`cannot parse invalid status "${x}" `);
          });
      });
    });
  });
});
