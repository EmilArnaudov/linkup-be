
import { getAllGames } from "@/services/games/gamesServices";
import { Request, Response, Router } from "express";

const GamesController = Router();

GamesController.get('/all', async (req: Request, res: Response) => {
  const response = await getAllGames()
  if (response.ok) {
    return res.status(200).json(response.data)
  } else {
    return res.status(response.status).json({ problem: response.problem })
  }
})

export default GamesController;