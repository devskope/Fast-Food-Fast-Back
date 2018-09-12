import express from 'express';
import controller from './adminController';

const router = express.Router();

router.post('/login', controller.loginAdmin);

export default router;
