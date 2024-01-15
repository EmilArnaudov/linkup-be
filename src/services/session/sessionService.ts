import { AppDataSource } from '@/data-source';
import { Session } from '@/entities/Session.entity';
import { User } from '@/entities/User.entity';
import { CreateSessionProps } from './sessionService.types';
import { isSessionLive, loadGameForSession } from './utils';
import schedule from 'node-schedule';
import { getGameById } from '../games/gamesServices';
import { Game, SessionGame } from '../games/games.types';
import { MoreThan } from 'typeorm';
import dayjs from 'dayjs';

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
  session.end = new Date(end);
  session.start = new Date(start);
  session.host = await userRepository.findOneBy({ id: hostId });
  session.gameId = gameId;
  session.maxPlayers = maxPlayers;
  session.isLive = isSessionLive(start, end);

  const newSession = await loadGameForSession(
    await sessionRepository.save(session)
  );
  scheduleSessionEvents(newSession);

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

export async function rescheduleUpcomingSessions() {
  const upcomingSessions = await getUpcomingSessions(); // Get sessions from the database
  upcomingSessions.forEach(scheduleSessionEvents); // Re-schedule each session
}

export async function getUpcomingSessions() {
  const now = new Date();
  // const nowFormatted = now.toISOString().slice(0, 19).replace('T', ' ');
  try {
    // Fetch sessions where the start time is greater than the current time
    const upcomingSessions = await sessionRepository.find({
      where: {
        start: MoreThan(now),
      },
    });
    return upcomingSessions;
  } catch (err) {
    console.error('Error fetching upcoming sessions:', err);
    throw err;
  }
}

function scheduleSessionEvents(session: Session) {
  const startTime = new Date(session.start);
  const endTime = new Date(session.end);

  // Schedule session start
  schedule.scheduleJob(startTime, () => {
    updateSessionStatus(session.id, true);
  });

  // Schedule session end
  schedule.scheduleJob(endTime, () => {
    updateSessionStatus(session.id, false);
  });
}

async function updateSessionStatus(id: number, val: boolean) {
  const session = await sessionRepository.findOneOrFail({ where: { id } });
  session.isLive = val;
  await sessionRepository.save(session);
}
