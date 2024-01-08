import { create } from "apisauce";

// const options = {
//   method: 'GET',
//   baseUrl: 'https://www.freetogame.com/api/games',
//   // params: {
//   //   tag: '3d.mmorpg.fantasy.pvp',
//   //   platform: 'pc'
//   // },
//   // headers: {
//   //   'X-RapidAPI-Key': '73d0726b25msh335372cbf266fbep1e06b7jsn17543d693e88',
//   //   'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
//   // }
// };

export const api = create({
  baseURL: 'https://www.freetogame.com/api/games'
})