import { Router } from 'express';
import MovieController from '../controllers/movieController.js';
import { authenticate, checkRole } from '../middlewares/authMiddleware.js';

const router: Router = Router();

router.get('/movies', authenticate, MovieController.getAll);
router.get('/movies/search', authenticate, MovieController.search);
router.get('/movies/:id', authenticate, MovieController.getOne);
router.post('/movies', authenticate, checkRole(['Admin']), MovieController.create);
router.put('/movies/:id', authenticate, checkRole(['Admin']), MovieController.update);
router.delete('/movies/:id', authenticate, checkRole(['Admin']), MovieController.delete);

export default router;
