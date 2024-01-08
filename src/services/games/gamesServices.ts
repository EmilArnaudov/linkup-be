import { api } from "./api"

export const getAllGames = async () => {
  const result = await api.get('/')
  return result

}