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
  describe('unregistered:', () => {
    it('Annon user must not make orders', done => {
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
      done();
    });

    it('Annon user must not fetch orders', done => {
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
      done();
    });
  });
  describe('Register -> Login -> Order:', () => {
    const newUser = {
      username: `martin-Skope`,
      password: `blabla`,
      email: `nyet@pillow.me`
    };

    it('Should not register new user with missing reqirements', done => {
      ['username', 'password'].map(x => {
        chai
          .request(server)
          .post(`${ROOT_URL}/auth/signup`)
          .send({ ...newUser, ...{ [x]: undefined } })
          .end((err, res) => {
            expect(res.status).eq(400);
            expect(res.body.errors instanceof Array).eq(true);
          });
      });
      done();
    });
    it('Should not register new user with invalid email', done => {
      chai
        .request(server)
        .post(`${ROOT_URL}/auth/signup`)
        .send({ ...newUser, ...{ email: 'ropsten.io' } })
        .end((err, res) => {
          expect(res.status).eq(400);
          expect(res.body.errors instanceof Array).eq(true);
        });
      done();
    });

    it('Should register new user', done => {
      chai
        .request(server)
        .post(`${ROOT_URL}/auth/signup`)
        .send(newUser)
        .end((err, res) => {
          expect(res.status).eq(201);
        });
      done();
    });

    it('Should save user to datastore', done => {
      expect(Boolean(users.findByUsername(newUser.username))).eq(true);
      done();
    });

    it('User password should be obfuscated', done => {
      const userPass = users.findByUsername(newUser.username).password;
      expect(userPass).not.eq(newUser.password);
      done();
    });

    it('Registered should not login with missing requirements', done => {
      ['username', 'password'].map(x => {
        chai
          .request(server)
          .post(`${ROOT_URL}/auth/login`)
          .send({ ...newUser, ...{ [x]: undefined } })
          .end((err, res) => {
            expect(res.status).eq(400);
            expect(res.body.errors instanceof Array).eq(true);
          });
      });
      done();
    });

    it('Registered user can login', done => {
      chai
        .request(server)
        .post(`${ROOT_URL}/auth/login`)
        .send(newUser)
        .end((err, res) => {
          expect(res.status).eq(200);
          expect(res.body.message).eq(
            `successful login as ${newUser.username}`
          );
        });
      done();
    });

    it('logged in user can create a valid order', done => {
      chai
        .request(server)
        .post(`${ROOT_URL}/orders`)
        .send(orderToMake)
        .end((err, res) => {
          expect(res.status).eq(201);
          expect(res.body.message).eq(`Order created successfully`);
          expect(typeof res.body.data).eq('object');
        });
      done();
    });

    it('Should save order to datastore', done => {
      Object.keys(orderToMake).map(OrderProp => {
        expect(orders.findByProp(OrderProp)).eq(orderToMake.OrderProp);
      });
      done();
    });

    it('logged in user can fetch orders', done => {
      chai
        .request(server)
        .get(`${ROOT_URL}/orders`)
        .end((err, res) => {
          expect(res.status).eq(200);
          expect(res.body.message).eq(`fetched order list successfully`);
          expect(typeof res.body.data).eq('object');
        });
      done();
    });

    it('logged in user can fetch specific order', done => {
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
      done();
    });

    it('logged in user should not fetch non-existent order', done => {
      const id = 32;

      chai
        .request(server)
        .get(`${ROOT_URL}/orders/${id}`)
        .end((err, res) => {
          expect(res.status).eq(404);
          expect(res.body.message).eq(`no order found`);
        });
      done();
    });

    describe('Order states:', () => {
      it('orders should be pending by default', done => {
        expect(orders.findById(1).status).eq('pending');
        done();
      });

      it('order states cannot be mutated by unprivileged users', done => {
        const id = 1;

        ['completed', 'confirmed', 'declined'].map(x => {
          chai
            .request(server)
            .put(`${ROOT_URL}/orders/${id}`)
            .send({ status: x })
            .end((err, res) => {
              expect(res.status).eq(403);
              expect(res.body.message).eq(
                `you dont have sufficient privileges to access the requested resource`
              );
            });
        });
        done();
      });

      it('order states should not be incorrectly mutated by unprivileged user', done => {
        const id = 1;

        ['complete', 'confirm', 'decline'].map(x => {
          chai
            .request(server)
            .put(`${ROOT_URL}/orders/${id}`)
            .send({ status: x })
            .end((err, res) => {
              expect(res.status).eq(403);
              expect(res.body.message).eq(
                `you dont have sufficient privileges to access the requested resource`
              );
            });
        });
        done();
      });
    });
  });
});
