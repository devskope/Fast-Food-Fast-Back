import express from 'express';
import contollers from './orderController';
import loginRequired from '../../middlewares/auth/loginRequired';

const router = express.Router();

router.post('/', loginRequired, contollers.createOrder);
// router.get('/:id', contollers.sendOrders);
// router.get('/:id', contollers.singleOrder);
// router.put('/:id', contollers.updateOrder);

export default router;
