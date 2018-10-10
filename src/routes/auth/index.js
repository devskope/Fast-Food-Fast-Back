import { Router } from 'express';
import controllers from './authController';
import reqSanity from '../../middlewares/auth/validators';

const router = new Router();

router.post('/signup', reqSanity, controllers.createUser);
router.post('/login', reqSanity, controllers.userLogin);

export default router;
