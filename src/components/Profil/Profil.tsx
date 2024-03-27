import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/reducer/users';
import { Link } from 'react-router-dom';
import FavoriteCard from './FavoriteCard';
import { deleteGame, joinAGame } from '../../store/reducer/games';

export default function Profil() {
  const dispatch = useAppDispatch();

  const isLogged = useAppSelector((state) => state.users.logged);
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const games = useAppSelector((state) => state.games.list);

  const deleteUser = (id: number) => {
    dispatch(deleteGame(id));
  };
  const handleClick = (id: number) => {
    dispatch(joinAGame(id));
  };
  // Fonction qui transforme une dateString en visuel FR présentable
  const formatedDate = (time: string) =>
    new Date(time).toLocaleString('fr-FR', {
      timeZone: 'UTC',
      minute: 'numeric',
      hour: 'numeric',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  return (
    <>
      {isLogged && (
        <div>
          <button
            className="btn btn-success m-5"
            onClick={(e) => {
              e.preventDefault();
              dispatch(logout());
            }}
          >
            Deconnexion
          </button>
          {currentUser.roles.includes('ROLE_ADMIN') && (
            <a href="http://jameson-absil.vpnuser.lan/Apoth%c3%a9ose/projet-08-jeux-video-back/public">
              {' '}
              <button className="btn btn-warning m-5">Back-office</button>
            </a>
          )}
          <Link to="/update">
            <button className="btn btn-info">Modifier le Profil </button>
          </Link>
        </div>
      )}
      <h1 className="mt-2 text-3xl lg:text-9xl">
        Profil de {currentUser.pseudo}{' '}
      </h1>
      {/* <p>Votre profil est {currentUser.is_active ? "actif" : "inactif"}</p> */}
      {currentUser.is_active ? (
        <div>
          <div>
            <h2 className="mt-2 mb-3 text-2xl lg:text-7xl">
              Mes jeux favoris :
            </h2>
            <div className="flex flex-wrap gap-5 justify-center">
              {currentUser.favorites.map((favorites) => (
                <FavoriteCard
                  slug={favorites.slug}
                  src={`${import.meta.env.VITE_API_COVERS}/${favorites.cover}`}
                  alt={favorites.name}
                  id={favorites.id}
                  favorites={favorites}
                  key={favorites.slug}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="mt-2 text-2xl lg:text-7xl m-2">
              Mes parties crées :
            </h2>
            <div className="flex flex-wrap gap-5 justify-center">
              {games.map(
                (games) =>
                  games.organizer.pseudo === currentUser.pseudo &&
                  games.status != 'finished' && (
                    <div
                      className="card w-1/3 bg-base-100 shadow-xl z-0 hover:z-50 lg:w-96 lg:image-full"
                      key={games.id}
                    >
                      {' '}
                      <Link to={`/parties/${games.id}`}>
                        <figure className="rounded-xl lg:h-96">
                          <img
                            className="h-48 lg:h-full"
                            src={`${import.meta.env.VITE_API_COVERS}/${
                              games.videoGame.cover
                            }`}
                            alt={games.videoGame.name}
                          />
                        </figure>
                      </Link>
                      <div className="card-body">
                        <h3 className="card-title text-white text-xs hidden lg:block">
                          {games.videoGame.name}
                        </h3>
                        <p className="text-white text-xs">
                          {formatedDate(games.beginAt)}{' '}
                        </p>

                        <div className="card-actions justify-between">
                          <button
                            className="btn delete btn-circle absolute btn-outline size-8 top-0 left-0 lg:relative lg:size-12"
                            onClick={() => deleteUser(games.id as number)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="b91c1c"
                              viewBox="0 0 24 24"
                              stroke="#b91c1c"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                          <Link to={`/parties/${games.id}`}>
                            <button className="btn btn-primary hidden lg:block">
                              Plus d'infos
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>

          <div>
            <h2 className="mt-2 text-2xl lg:text-7xl m-2">Je participe à :</h2>
            <div className="flex flex-wrap gap-5 justify-center">
              {games.map((games) =>
                games.participants.map(
                  (e) =>
                    e.pseudo === currentUser.pseudo &&
                    games.status != 'finished' && (
                      <div
                        className="card w-1/3 bg-base-100 shadow-xl z-0 hover:z-50 lg:w-96 lg:image-full"
                        key={games.id}
                      >
                        <Link to={`/parties/${games.id}`}>
                          <figure className="rounded-xl lg:h-96">
                            <img
                              className="h-48 lg:h-full"
                              src={`${import.meta.env.VITE_API_COVERS}/${
                                games.videoGame.cover
                              }`}
                              alt={games.videoGame.name}
                            />
                          </figure>
                        </Link>
                        <div className="card-body">
                          <h3 className="card-title text-white text-xs hidden lg:block">
                            {games.videoGame.name}
                          </h3>
                          <p className="text-white text-xs">
                            {formatedDate(games.beginAt)}{' '}
                          </p>

                          <div className="card-actions justify-end justify-between">
                            <button
                              className="btn delete btn-circle absolute btn-outline size-8 top-0 left-0 lg:relative lg:size-12"
                              onClick={() => handleClick(games.id as number)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill=""
                                viewBox="0 0 24 24"
                                stroke="#b91c1c"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                            <Link to={`/parties/${games.id}`}>
                              <button className="btn btn-primary hidden lg:block">
                                Plus d'infos
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                )
              )}
            </div>
          </div>
          <div>
            <h2 className="mt-2 text-2xl lg:text-7xl">Parties terminées :</h2>
            <div className="flex flex-wrap gap-5 justify-center">
              {games.map((games) =>
                games.participants.map(
                  (e) =>
                    e.pseudo === currentUser.pseudo &&
                    games.status === 'finished' && (
                      <div
                        className="card w-1/3 bg-base-100 shadow-xl z-0 hover:z-50 lg:w-96 lg:image-full"
                        key={games.id}
                      >
                        <figure className="rounded-xl lg:h-96">
                          <img
                            className="h-48 lg:h-full"
                            src={`${import.meta.env.VITE_API_COVERS}/${
                              games.videoGame.cover
                            }`}
                            alt={games.videoGame.name}
                          />
                        </figure>
                        <div className="card-body">
                          <h3 className="card-title text-white text-xs hidden lg:block">
                            {games.videoGame.name}
                          </h3>
                          <p className="text-white text-xs">
                            {formatedDate(games.beginAt)}{' '}
                          </p>

                          <div className="card-actions justify-between">
                            <Link to={`/parties/${games.id}`}>
                              <button className="btn btn-primary hidden lg:block">
                                Plus d'infos
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                )
              )}
            </div>
          </div>
        </div>
      ) : (
        'Votre profil est inactif'
      )}
    </>
  );
}
