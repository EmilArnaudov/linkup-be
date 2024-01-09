import { Router } from 'express';
import GamesController from './controllers/GamesController';
import AuthController from './controllers/AuthController';

const router = Router();

router.use('/auth', AuthController);
router.use('/games', GamesController);

router.all('/*', (req, res) => {
  res.status(404);
});

export default router;
