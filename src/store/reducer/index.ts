import gamesReducer from "./games";
import genresReducer from "./genres";
import platformsReducer from "./platforms"
import videoGamesReducer from "./videoGames"
import usersReducer from "./users"

// Gestion de tous les reducers pour une transmission au store
const reducer = {
  games: gamesReducer,
  genres: genresReducer,
  platforms : platformsReducer,
  videoGames: videoGamesReducer,
  users: usersReducer,  
};

export default reducer;
