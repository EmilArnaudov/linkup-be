import { Session } from '@/entities/Session.entity';
import { getGameById } from '../games/gamesServices';
import { Game, SessionGame } from '../games/games.types';
import dayjs from 'dayjs';

export function isSessionLive(start: string, end: string): boolean {
  const currentMoment = dayjs();
  const startDate = dayjs(start);
  const endDate = dayjs(end);

  const isBetween =
    currentMoment.isAfter(startDate) && currentMoment.isBefore(endDate);
  return isBetween;
}

export async function loadGameForSession(
  session: Session,
  detailed = false
): Promise<Session> {
  const newSession = session;
  const response = await getGameById(session.gameId);
  if (response.ok) {
    if (!detailed) {
      const game: Game = response.data as Game;
      const sessionGame: SessionGame = {
        id: game.id,
        title: game.title,
        thumbnail: game.thumbnail,
      };
      newSession.game = sessionGame;
    } else {
      const game: Game = response.data as Game;
      newSession.game = game;
    }
  }
  return newSession;
}
