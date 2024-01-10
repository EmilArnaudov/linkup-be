import { Request, Response, Router } from 'express';
import GamesController from './controllers/GamesController';
import AuthController from './controllers/AuthController';
import { authenticate } from './middlewares/authorization';
import SessionController from './controllers/SessionController';

const router = Router();

router.use('/auth', AuthController);
router.use('/games', GamesController);
router.use('/session', authenticate, SessionController);

router.all('/*', (req, res) => {
  res.status(404);
});

export default router;
