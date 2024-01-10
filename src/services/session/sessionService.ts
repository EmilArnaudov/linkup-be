import { AppDataSource } from '@/data-source';
import { Session } from '@/entities/Session.entity';
import { User } from '@/entities/User.entity';
import { CreateSessionProps } from './sessionService.types';
import { isSessionLive } from './utils';

const sessionRepository = AppDataSource.getRepository(Session);
const userRepository = AppDataSource.getRepository(User);

export async function createSession({
  title,
  end,
  gameId,
  hostId,
  maxPlayers,
  start,
}: CreateSessionProps): Promise<Session> {
  const session = new Session();
  session.title = title;
  session.currentPlayers = 1;
  session.end = end;
  session.start = start;
  session.host = await userRepository.findOneBy({ id: hostId });
  session.gameId = gameId;
  session.maxPlayers = maxPlayers;
  session.isLive = isSessionLive(start, end);

  return await sessionRepository.save(session);
}

export async function getAllSessions(): Promise<Session[]> {
  const sessions = await sessionRepository.find();
  return sessions;
}
