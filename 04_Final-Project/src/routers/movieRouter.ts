import {Router} from 'express';
import MovieController from '../controllers/movieController.js';

const router: Router = Router();

router.get('/moveis', MovieController.getAll);
router.get('/moveis/:id', MovieController.getOne);
router.post('/moveis/', MovieController.create);
router.put('/moveis/:id', MovieController.update);
router.delete('/moveis/:id', MovieController.delete);

export default router;

