import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/services/jwt';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || '';
    const decoded = verifyToken(token);

    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
};
