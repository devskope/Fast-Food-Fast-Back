import express from 'express';
import controllers from './orderController';
import loginRequired from '../../middlewares/auth/loginRequired';

const router = express.Router();

router.post('/', loginRequired, controllers.createOrder);

export default router;
