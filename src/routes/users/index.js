import express from 'express';
import controllers from './userController';

const router = express.Router();

router.post('/register', controllers.createUser);
router.post('/login', controllers.userLogin);
router.get('/register', controllers.redirectAuthPages);
router.get('/login', controllers.redirectAuthPages);
router.get('/logout', controllers.userLogout);

export default router;
