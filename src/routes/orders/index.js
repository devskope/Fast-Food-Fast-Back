import express from 'express';
import controllers from './orderController';
import validateParams from '../../middlewares/orders/validateParams';

const router = express.Router();

router.get('/:id', controllers.getSingleOrder);
router.get('/', controllers.getOrders);

router.post('/', validateParams, controllers.createOrder);

router.put('/:id', controllers.updateOrder);

export default router;
