import express from 'express';
import controllers from './orderController';
import loginRequired from '../../middlewares/auth/loginRequired';
import onlyAdmin from '../../middlewares/auth/onlyAdmin';
import validateParams from '../../middlewares/orders/validateParams';

const router = express.Router();

router.get('/:id', loginRequired, controllers.getSingleOrder);
router.get('/', loginRequired, controllers.getOrders);

router.post('/', loginRequired, validateParams, controllers.createOrder);

router.put('/:id', loginRequired, onlyAdmin, controllers.updateOrder);

export default router;
