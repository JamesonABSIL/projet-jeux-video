import gamesReducer from "./games";
import genresReducer from "./genres";
import platformsReducer from "./platforms"
import videoGamesReducer from "./videoGames"
import usersReducer from "./users"



const reducer = {
  games: gamesReducer,
  genres: genresReducer,
  platforms : platformsReducer,
  videoGames: videoGamesReducer,
  users: usersReducer,  
};

export default reducer;
