import { Request, Response, Router } from "express";

const MainController = Router();

MainController.get('/', (req: Request, res: Response) => {

  res.status(200).json(JSON.stringify({ key: 'value' }))
})

export default MainController;