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
  let sessions = await sessionRepository.find({
    relations: ['host'],
    order: { id: 'DESC' },
  });
  sessions = await Promise.all(sessions.map((s) => loadGameForSession(s)));
  return sessions;
}

export async function getSessionById(id: number): Promise<Session> {
  return await loadGameForSession(
    await sessionRepository.findOneOrFail({
      where: { id },
      relations: ['host', 'participants'],
    }),
    true
  );
}

export async function joinSession(
  sessionId: number,
  userId: number
): Promise<Session> {
  const user = await userRepository.findOneOrFail({ where: { id: userId } });
  const session = await sessionRepository.findOneOrFail({
    where: { id: sessionId },
    relations: ['host', 'participants'],
  });
  session.participants.push(user);
  session.currentPlayers += 1;
  return await loadGameForSession(await sessionRepository.save(session), true);
}

export async function leaveSession(
  sessionId: number,
  userId: number
): Promise<Session> {
  const user = await userRepository.findOneOrFail({ where: { id: userId } });
  const session = await sessionRepository.findOneOrFail({
    where: { id: sessionId },
    relations: ['host', 'participants'],
  });
  session.participants = session.participants.filter((p) => p.id !== userId);
  session.currentPlayers -= 1;
  return await loadGameForSession(await sessionRepository.save(session), true);
}
