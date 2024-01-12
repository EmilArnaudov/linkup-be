import {
  createSession,
  getAllSessions,
} from '@/services/session/sessionService';
import { CreateSessionPropsValidator } from '@/validators/CreateSessionPropsValidator';
import { validate } from 'class-validator';
import { Request, Response, Router } from 'express';

const SessionController = Router();

SessionController.get('/all', async (req: Request, res: Response) => {
  const sessions = await getAllSessions();
  return res.status(200).json(sessions);
});

SessionController.post('/', async (req: Request, res: Response) => {
  const data = new CreateSessionPropsValidator();
  Object.assign(data, req.body);

  const errors = await validate(data);
  if (errors.length > 0) {
    return res.status(400).send(errors);
  } else {
    const session = await createSession(req.body);
    return res.status(200).json(session);
  }
});

export default SessionController;
