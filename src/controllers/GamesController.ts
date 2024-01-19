import { getAllGames } from '@/services/games/gamesServices';
import { Request, Response, Router } from 'express';

const GamesController = Router();

GamesController.get('/all', async (req: Request, res: Response) => {
  try {
    const response = await getAllGames();
    if (response.ok) {
      return res.status(200).json(response.data);
    } else {
      return res.status(response.status).json({ problem: response.problem });
    }
  } catch (error) {
    return res.status(400).json({ error: 'There was a problem try again.' });
  }
});

export default GamesController;
