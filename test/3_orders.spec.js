import Order from '../src/models/orders';
import db from '../src/datastores/index';

export default (ROOT_URL, server, chai, expect, logger) => {
  const orderToMake = {
    name: 'Mega pie',
    qty: '4',
    category: 'pizza'
  };

  logger('order tests....');

  describe('Orders', () => {
    describe('unauthorized user', () => {
      it('cannot access protected route without token', done => {
        chai
          .request(server)
          .get(`${ROOT_URL}/orders`)
          .end((err, { status, body }) => {
            expect(status).eq(401);
            expect(body.message).eq(`Unauthorized! No token provided.`);
            done();
          });
      });

      it('cannot access protected route with invalid token', done => {
        chai
          .request(server)
          .get(`${ROOT_URL}/orders`)
          .set('fff-auth', 'in.va.lid')
          .end((err, { status, body }) => {
            expect(status).eq(401);
            expect(body.message).eq('invalid token');
            done();
          });
      });

      it('cannot access protected route with non bound token', done => {
        const token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
          'eyJpbyI6ImlvIiwiaWF0IjoxNTM5MTA5ODM5fQ.' +
          '2Lhvr0g8SNu0d2Vl9wUyFM_OVpkQhrg0x8xZIJ5aWAo';
        chai
          .request(server)
          .get(`${ROOT_URL}/orders`)
          .set('fff-auth', token)
          .end((err, { status, body }) => {
            expect(status).eq(400);
            expect(body.message).eq(
              `Ooops something happened, can't find User`
            );
            done();
          });
      });
    });

    describe('valid user', () => {
      let authToken;

      before(done => {
        chai
          .request(server)
          .post(`${ROOT_URL}/auth/signup`)
          .send({
            username: `martin-Skope`,
            password: `blabla`
          })
          .end(() => {
            done();
          });
      });

      before(done => {
        chai
          .request(server)
          .post(`${ROOT_URL}/auth/login`)
          .send({
            username: `martin-Skope`,
            password: `blabla`
          })
          .end((err, { body }) => {
            expect(typeof body.token).eq('string');
            authToken = body.token;
            done();
          });
      });

      before(async () => {
        const clear = await db.query(`drop table f3.orders cascade`);
        setTimeout(() => {}, 2000);
        if (clear)
          await db.query(`CREATE TABLE f3.orders
        (
         id       SERIAL PRIMARY KEY,
         owner    VARCHAR not null,
         status   VARCHAR not null,
         name     VARCHAR not null,
         qty      INTEGER not null,
         category VARCHAR not null,
         topping  VARCHAR
        )`);
      });

      it('should fetch orders', done => {
        chai
          .request(server)
          .get(`${ROOT_URL}/orders`)
          .set('fff-auth', authToken)
          .end((err, { status, body }) => {
            expect(status).eq(200);
            expect(body.message).eq(`no orders created yet`);
            expect(typeof body.orders).eq('object');
            done();
          });
      });

      it('should not create an invalid order', () => {
        ['category', 'name', 'qty'].map(field => {
          chai
            .request(server)
            .post(`${ROOT_URL}/orders`)
            .set('fff-auth', authToken)
            .send(Object.assign({}, orderToMake, { [field]: undefined }))
            .end((err, res) => {
              expect(res.status).eq(400);
              expect(res.body.errors instanceof Array).eq(true);
            });
        });
      });

      it('should not create new order with invalid qty', done => {
        chai
          .request(server)
          .post(`${ROOT_URL}/orders`)
          .set('fff-auth', authToken)
          .send({ ...orderToMake, ...{ qty: 'iu' } })
          .end((err, { status, body }) => {
            expect(status).eq(400);
            expect(typeof body.errors[0]).eq('object');
            expect(body.errors[0].message).eq('qty should be a number');
            logger(body.errors[0].message);
            done();
          });
      });

      it('should create new order', done => {
        chai
          .request(server)
          .post(`${ROOT_URL}/orders`)
          .set('fff-auth', authToken)
          .send(orderToMake)
          .end((err, { status, body }) => {
            expect(status).eq(201);
            expect(typeof body).eq('object');
            expect(body.message).eq('Order created successfully');
            done();
          });
      });

      it('Should save orders to datastore', async () => {
        const orders = await Order.getAllOrders();
        expect(orders.length).greaterThan(0);
      });

      it('should fetch orders', done => {
        chai
          .request(server)
          .get(`${ROOT_URL}/orders`)
          .set('fff-auth', authToken)
          .end((err, { status, body }) => {
            expect(status).eq(200);
            expect(body.message).eq(`fetched order list successfully`);
            expect(typeof body.orders).eq('object');
            done();
          });
      });

      it('should not fetch non-existent order', done => {
        const id = 12;
        chai
          .request(server)
          .get(`${ROOT_URL}/orders/${id}`)
          .set('fff-auth', authToken)
          .end((err, { status, body }) => {
            expect(status).eq(404);
            expect(body.message).eq(`no order found`);
            done();
          });
      });

      it('should fetch specific order', done => {
        const id = 1;
        chai
          .request(server)
          .get(`${ROOT_URL}/orders/${id}`)
          .set('fff-auth', authToken)
          .end((err, { status, body }) => {
            expect(status).eq(200);
            expect(body.message).eq(`order found`);
            expect(typeof body.order).eq('object');
            done();
          });
      });

      it('should not be able to update order status', done => {
        const id = 12;
        chai
          .request(server)
          .put(`${ROOT_URL}/orders/${id}`)
          .send({ status: 'completed' })
          .set('fff-auth', authToken)
          .end((err, { status, body }) => {
            expect(status).eq(401);
            expect(body.message).eq(
              `You have insufficient privileges to access the requested content`
            );
            done();
          });
      });
    });

    describe('Admin user', () => {
      let authToken;

      before(done => {
        chai
          .request(server)
          .post(`${ROOT_URL}/auth/login`)
          .send({
            username: `admin`,
            password: `admin`
          })
          .end((err, { body }) => {
            expect(typeof body.token).eq('string');
            authToken = body.token;
            done();
          });
      });

      it('should not update order status incorrectly', done => {
        const id = 1;
        ['complete', 'accept'].forEach((stat, i) => {
          chai
            .request(server)
            .put(`${ROOT_URL}/orders/${id}`)
            .set('fff-auth', authToken)
            .send({ status: stat })
            .end((err, { status, body }) => {
              expect(status).eq(500);
              expect(body.message).eq(`cannot parse invalid status "${stat}"`);
              if (i === 1) done();
            });
        });
      });

      it('should not update non-existent order', done => {
        const id = 12;
        chai
          .request(server)
          .put(`${ROOT_URL}/orders/${id}`)
          .send({ status: 'completed' })
          .set('fff-auth', authToken)
          .end((err, { status, body }) => {
            expect(status).eq(404);
            expect(body.message).eq(`order #${id} not found`);
            done();
          });
      });

      it('should update order status correctly', done => {
        const id = 1;
        chai
          .request(server)
          .put(`${ROOT_URL}/orders/${id}`)
          .set('fff-auth', authToken)
          .send({ status: 'completed' })
          .end((err, { status, body }) => {
            expect(status).eq(200);
            expect(body.message).eq(
              `order #${id} has been marked as completed`
            );
            done();
          });
      });
    });
  });
};
