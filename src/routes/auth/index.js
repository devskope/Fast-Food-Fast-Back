import express from 'express';
import controllers from './authController';

const router = express.Router();

router.post('/signup', controllers.createUser);
router.post('/login', controllers.userLogin);

export default router;
