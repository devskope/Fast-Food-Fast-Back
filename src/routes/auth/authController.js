import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../../models/users';

const { env } = process;

const createUser = (req, res) => {
  User.findByUsername(req.body.username).then(user => {
    if (user) {
      res.status(409).json({
        success: false,
        message: `user '${req.body.username}' already exists`
      });
    } else {
      const userToCreate = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email || null
      };

      const newUser = new User(userToCreate);

      bcrypt.genSalt(10, (gErr, salt) => {
        if (gErr) {
          res.status(500).json({
            success: false,
            message: `An unexpected error occured, please try again`
          });
        } else {
          bcrypt.hash(newUser.password, salt, (hErr, hash) => {
            if (hErr) {
              res.status(500).json({
                success: false,
                message: `An unexpected error occured, please try again`
              });
            } else {
              newUser.password = hash;
              newUser.save(1).then(({ user: u, createSuccess }) => {
                delete u.password; // eslint-disable-line no-param-reassign
                res.status(201).json({
                  success: true,
                  createSuccess,
                  message: `user ${newUser.username} registered successfully`
                });
              });
            }
          });
        }
      });
    }
  });
};

const userLogin = (req, res) => {
  User.findByUsername(req.body.username)
    .then(user => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        delete user.password; // eslint-disable-line no-param-reassign
        const token = jsonwebtoken.sign(
          {
            id: user.id,
            is_admin: user.is_admin,
            username: user.username
          },
          env.JWT_SECRET,
          { expiresIn: '7d' }
        );
        if (user.is_admin) {
          res.status(200).json({
            success: true,
            message: `successful login as Admin user`,
            token,
            user
          });
        } else {
          res.status(200).json({
            success: true,
            message: `successful login as ${user.username}`,
            token,
            user
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: `password incorrect`
        });
      }
    })
    .catch(noUser => {  // eslint-disable-line
      res.status(401).json({
        success: false,
        message: `user ${req.body.username} not registered`
      });
    });
};

export default { createUser, userLogin };
