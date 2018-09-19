import express from 'express';
import controller from './adminController';
import onlyAdmin from '../../middlewares/auth/onlyAdmin';

const router = express.Router();

router.post('/login', controller.loginAdmin);
router.get('/logout', onlyAdmin, controller.logoutAdmin);

export default router;
