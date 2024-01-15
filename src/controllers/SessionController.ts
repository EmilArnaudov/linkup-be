import {
  createSession,
  getAllSessions,
  getSessionById,
  joinSession,
  leaveSession,
} from '@/services/session/sessionService';
import { CreateSessionPropsValidator } from '@/validators/CreateSessionPropsValidator';
import { validate } from 'class-validator';
import { Request, Response, Router } from 'express';

const SessionController = Router();

SessionController.get('/all', async (req: Request, res: Response) => {
  const sessions = await getAllSessions();
  return res.status(200).json(sessions);
});

SessionController.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const session = await getSessionById(id);
    return res.status(200).json(session);
  } catch (error) {
    return res.status(401).json({ error });
  }
});

SessionController.post('/join/:id', async (req: Request, res: Response) => {
  console.log('IM HERE');

  if (!req.params.id) {
    return res.status(400).json({ error: 'Session ID is missing.' });
  }

  if (!req.body.userId) {
    return res.status(400).json({ error: 'User ID is missing.' });
  }

  try {
    const sessionId = Number(req.params.id);
    const userId = Number(req.body.userId);

    const session = await joinSession(sessionId, userId);
    return res.status(200).json(session);
  } catch (error) {
    return res.status(500).json({ error: 'Server error, please try again' });
  }
});

SessionController.post('/leave/:id', async (req: Request, res: Response) => {
  console.log('IM HERE');

  if (!req.params.id) {
    return res.status(400).json({ error: 'Session ID is missing.' });
  }

  if (!req.body.userId) {
    return res.status(400).json({ error: 'User ID is missing.' });
  }

  try {
    const sessionId = Number(req.params.id);
    const userId = Number(req.body.userId);

    const session = await leaveSession(sessionId, userId);
    return res.status(200).json(session);
  } catch (error) {
    return res.status(500).json({ error: 'Server error, please try again' });
  }
});

SessionController.post('/', async (req: Request, res: Response) => {
  const data = new CreateSessionPropsValidator();
  Object.assign(data, req.body);

  const errors = await validate(data);
  if (errors.length > 0) {
    return res.status(400).send(errors);
  } else {
    try {
      const session = await createSession(req.body);
      return res.status(200).json(session);
    } catch (error) {
      res.status(400).json(error);
    }
  }
});

export default SessionController;
