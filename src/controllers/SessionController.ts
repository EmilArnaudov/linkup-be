import { Request, Response, Router } from 'express';

const SessionController = Router();

SessionController.get('/all', async (req: Request, res: Response) => {});

export default SessionController;
