import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/services/jwt';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.headers, 'headers');

    const token = req.headers.authorization?.split(' ')[1] || '';
    const decoded = verifyToken(token);
    console.log(token, decoded, 'token, decoded');

    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
};
