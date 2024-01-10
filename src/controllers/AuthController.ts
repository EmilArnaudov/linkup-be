import { AppDataSource } from '@/data-source';
import { User } from '@/entities/User.entity';
import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '@/services/jwt';

const SALT_ROUNDS = 5;
const AuthController = Router();
const userRepository = AppDataSource.getRepository(User);

AuthController.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await userRepository.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    user.isActive = true;
    const token = generateToken({ userId: user.id });
    const { password: _, ...userDetails } = user;
    res.status(200).json({
      tokenType: 'Bearer',
      accessToken: token,
      userDetails,
    });

    userRepository.save(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred, please try again later' });
  }
});

AuthController.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  //ADD VALIDATIONS
  const existingUser = await userRepository.findOne({ where: { username } });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.isActive = true;
    const savedUser = await userRepository.save(user);
    const token = generateToken({ userId: savedUser.id });
    const { password: _, ...userDetails } = savedUser;

    res.status(200).json({
      tokenType: 'Bearer',
      accessToken: token,
      userDetails,
    });
  } catch (error) {
    res.status(400).json({ error: 'User creation failed' });
  }
});

export default AuthController;
