import express from 'express';
import controllers from './orderController';
import loginRequired from '../../middlewares/auth/loginRequired';

const router = express.Router();

router.get('/:id', loginRequired, controllers.getSingleOrder);
router.get('/', loginRequired, controllers.getOrders);

router.post('/', loginRequired, controllers.createOrder);

router.put('/:id', loginRequired, controllers.updateOrder);


export default router;
