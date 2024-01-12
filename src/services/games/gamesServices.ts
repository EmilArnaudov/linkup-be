import { api } from './api';

export const getAllGames = async () => {
  const result = await api.get('/games');
  return result;
};

export const getGameById = async (id: number) => {
  const result = await api.get(`/game?id=${id}`);
  return result;
};
