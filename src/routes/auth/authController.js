import User from '../../models/users';
import { hashPass, passMatch } from '../../helpers/password_helpers';
import generateToken from '../../helpers/tokenGen';

const createUser = (req, res) => {
  const { username, password, email } = req.body;
  User.findByUsername(username)
    .then(user => {
      if (user) {
        res.status(409).json({
          success: false,
          message: `user '${username}' already exists`
        });
      } else {
        const newUser = new User({
          username,
          password,
          email
        });
        newUser.password = hashPass(newUser.password);
        newUser.save(1).then(({ createSuccess }) => {
          res.status(201).json({
            success: true,
            createSuccess,
            message: `user ${newUser.username} registered successfully`
          });
        });
      }
    })
    .catch();
};

const userLogin = (req, res) => {
  User.findByUsername(req.body.username)
    .then(user => {
      passMatch(req.body.password, user.password).then(match => {
        if (match) {
          if (user.email === null) delete user.email;
          delete user.password;

          const token = generateToken({
            id: user.id,
            is_admin: user.is_admin,
            username: user.username
          });

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
        } else
          res.status(400).json({
            success: false,
            message: `password incorrect`
          });
      });
    })
    .catch(() => {
      res.status(401).json({
        success: false,
        message: `user ${req.body.username} not registered`
      });
    });
};

export default { createUser, userLogin };
