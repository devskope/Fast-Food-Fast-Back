import { Router } from 'express';
import controllers from './orderController';
import validateParams from '../../middlewares/orders/validateParams';
import validUser from '../../middlewares/auth/validUser';
import onlyAdmin from '../../middlewares/auth/onlyAdmin';

const router = new Router();

router.get('/:id', validUser, controllers.getSingleOrder);
router.get('/', validUser, controllers.getOrders);

router.post('/', validUser, validateParams, controllers.createOrder);

router.put('/:id', validUser, onlyAdmin, controllers.updateOrder);

export default router;
