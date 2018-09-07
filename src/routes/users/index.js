import express from 'express';
import contollers from './userController';

const router = express.Router();

router.post('/register', contollers.createUser);
router.post('/login', contollers.userLogin);
router.get('/register', contollers.redirectAuthPages);
router.get('/login', contollers.redirectAuthPages);

export default router;
