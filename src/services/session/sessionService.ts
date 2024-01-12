import { AppDataSource } from '@/data-source';
import { Session } from '@/entities/Session.entity';
import { User } from '@/entities/User.entity';
import { CreateSessionProps } from './sessionService.types';
import { isSessionLive, loadGameForSession } from './utils';
import { getGameById } from '../games/gamesServices';
import { Game, SessionGame } from '../games/games.types';

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

  const newSession = loadGameForSession(await sessionRepository.save(session));
  return newSession;
}

export async function getAllSessions(): Promise<Session[]> {
  let sessions = await sessionRepository.find({ relations: ['host'] });
  sessions = await Promise.all(sessions.map((s) => loadGameForSession(s)));
  return sessions;
}
