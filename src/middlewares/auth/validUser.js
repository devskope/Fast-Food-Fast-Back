import jwt from 'jsonwebtoken';
import env from '../../config/envConf';
import User from '../../models/users';

const verifyToken = token =>
  new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET);
      resolve(decoded);
    } catch (error) {
      reject(error);
    }
  });

export default (req, res, next) => {
  const token = req.headers['fff-auth'];
  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized! No token provided.'
    });
  } else {
    verifyToken(token)
      .then(({ username }) => {
        User.findByUsername(username)
          .then(user => {
            delete user.password; // eslint-disable-line
            req.user = user;
            next();
          })
          .catch(() =>
            res.status(400).json({
              success: false,
              message: `Ooops something happened, can't find User`
            })
          );
      })
      .catch(error => {
        res.status(401).json({
          success: false,
          message: error.message
        });
      });
  }
};
