import { Router } from 'express';
import UserController from '../controllers/userController.js';
import { checkRole, authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/users', authenticate, checkRole(['Admin']), UserController.getAll);
router.put('/users/:id', authenticate, checkRole(['Admin']), UserController.update);
router.delete('/users/:id', authenticate, checkRole(['Admin']), UserController.delete);

export default router;
