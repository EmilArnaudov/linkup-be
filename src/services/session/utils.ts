import { Session } from '@/entities/Session.entity';
import { getGameById } from '../games/gamesServices';
import { Game, SessionGame } from '../games/games.types';

export function isSessionLive(
  startTimestamp: number,
  endTimestamp: number
): boolean {
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime >= startTimestamp && currentTime <= endTimestamp;
}

export async function loadGameForSession(session: Session): Promise<Session> {
  const newSession = session;
  const response = await getGameById(session.gameId);
  if (response.ok) {
    const game: Game = response.data as Game;
    const sessionGame: SessionGame = {
      id: game.id,
      title: game.title,
      thumbnail: game.thumbnail,
    };
    newSession.game = sessionGame;
  }
  return newSession;
}
