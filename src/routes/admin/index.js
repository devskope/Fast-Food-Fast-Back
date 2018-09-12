import express from 'express';
import controller from './adminController';

const router = express.Router();

router.post('/login', controller.loginAdmin);
router.post('/logout', controller.logoutAdmin);

export default router;
