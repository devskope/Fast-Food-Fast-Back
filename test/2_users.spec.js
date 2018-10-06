import User from '../src/models/users';
import db from '../src/datastores/index';

export default (ROOT_URL, server, chai, expect, logger) => {
  const newUser = {
    username: `martin-Skope`,
    password: `blabla`,
    email: `nyet@pillow.me`
  };

  logger('user tests....');

  describe('Sign up -> Log in:', () => {
    before(async () => {
      const clear = await db.query(`drop table f3.users cascade`);
      setTimeout(() => {}, 2000);

      if (clear)
        await db.query(`
        CREATE TABLE f3.users
          (
           id       SERIAL PRIMARY KEY,
           is_admin BOOL,
           email    VARCHAR,
           username VARCHAR UNIQUE not null,
           password VARCHAR not null
          )`);
      await new User({
        username: 'admin',
        password:
          '$2a$10$4DhhXb8vXCMh/Xf1p3VuzeFdBqzJJkCwwhTXE55PLpYrkeuNQQci6',
        email: 'max@fff.chow'
      }).save(0);
    });

    it('Should not register new user with missing reqirements', done => {
      ['username', 'password'].forEach(x => {
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
        .end((err, { status, body }) => {
          expect(status).eq(201);
          expect(body.message).eq(
            `user ${newUser.username} registered successfully`
          );
        });
      done();
    });

    it('Should save user to datastore', done => {
      User.findByUsername(newUser.username).then(user => {
        expect(user.username).eq(newUser.username);
        done();
      });
    });

    it('User password should be obfuscated', done => {
      User.findByUsername(newUser.username).then(user => {
        const userPass = user.password;
        expect(userPass).not.eq(newUser.password);
        done();
      });
    });

    it('Registered should not login with missing requirements', done => {
      ['username', 'password'].forEach(x => {
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

    it('should not login with incorrect password', done => {
      chai
        .request(server)
        .post(`${ROOT_URL}/auth/login`)
        .send({ ...newUser, ...{ password: 'incorrect' } })
        .end((err, { status, body }) => {
          expect(status).eq(400);
          expect(body.message).eq('password incorrect');
          done();
        });
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

    describe('Existing user', () => {
      after(async () => {
        const clear = await db.query(`drop table f3.users cascade`);
        setTimeout(() => {}, 2000);

        if (clear)
          await db.query(`
        CREATE TABLE f3.users
          (
           id       SERIAL PRIMARY KEY,
           is_admin BOOL,
           email    VARCHAR,
           username VARCHAR UNIQUE not null,
           password VARCHAR not null
          )`);
        await new User({
          username: 'admin',
          password:
            '$2a$10$4DhhXb8vXCMh/Xf1p3VuzeFdBqzJJkCwwhTXE55PLpYrkeuNQQci6',
          email: 'max@fff.chow'
        }).save(0);
      });

      it('Should not register existing user', done => {
        chai
          .request(server)
          .post(`${ROOT_URL}/auth/signup`)
          .send(newUser)
          .end((err, { status, body }) => {
            expect(status).eq(409);
            expect(body.message).eq(
              `user '${newUser.username}' already exists`
            );
            done();
          });
      });

      it('should not login non-existent user', done => {
        chai
          .request(server)
          .post(`${ROOT_URL}/auth/login`)
          .send({ ...newUser, ...{ username: 'iDontExist' } })
          .end((err, { status, body }) => {
            expect(status).eq(401);
            expect(body.success).eq(false);
            done();
          });
      });
    });
    describe('admin user', () => {
      it('Admin user can login', done => {
        chai
          .request(server)
          .post(`${ROOT_URL}/auth/login`)
          .send({ username: 'admin', password: 'admin' })
          .end((err, { status, body }) => {
            expect(status).eq(200);
            expect(body.message).eq(`successful login as Admin user`);
            done();
          });
      });
    });
  });
};
