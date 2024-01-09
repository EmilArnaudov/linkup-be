import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY;

export const generateToken = (
  payload: object,
  expiresIn: string | number = '1d'
) => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secretKey);
};
