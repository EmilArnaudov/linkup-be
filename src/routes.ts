import { Router } from "express";
import MainController from "./controllers/MainController";
import GamesController from "./controllers/GamesController";

const router = Router();

router.use('/', MainController);
router.use('/games', GamesController)

router.all('/*', (req, res) => {
  res.status(404)
})

export default router;