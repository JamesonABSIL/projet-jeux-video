import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { findBySlug } from '../../store/selectors/findData';
import { Link } from 'react-router-dom';
import { Ivideo_game } from '../../@types/types';
import { updateFavorite } from '../../store/reducer/users';

export default function Genre() {
  /*On récupére le slug contenu dans l'url*/
  const { slug } = useParams();
  const dispatch = useAppDispatch();

  /*On récupère le genre avec un filtre qui va rechercher dans la liste de tous les genres, le slug qui correspond à celui récupéré en URL*/
  const currentGenre = useAppSelector((state) =>
    findBySlug(state.genres.list, slug)
  );

  /*On s'abonne à la liste des favoris de l'utilisateur connecté*/
  const userFavorite = useAppSelector(
    (state) => state.users.currentUser.favorites
  );

  /*On s'abonne à la liste des jeux-vidéos */
  const videoGames = useAppSelector((state) => state.videoGames.list);

  /*Appelle de la fonction dans le reducer qui permet d'ajouter ou retirer un jeu en list de favori*/
  const handleClickUpdate = (id: number) => {
    dispatch(updateFavorite(id));
  };

  return (
    <>
      {!currentGenre ? (
        <div className="flex justify-center">
          <img src="https://i.gifer.com/5IPd.gif" />
        </div>
      ) : (
        <div>
          {' '}
          <h1 className="text-xl lg:text-9xl">{currentGenre.name}</h1>
          <div className="flex flex-wrap gap-5 justify-center">
            {/* On boucle sur le tableau des jeux-videos, on ajoute uen condition pour afficher les jeux qui font partie de la catégorie */}
            {videoGames.map((game: Ivideo_game) =>
              game.genres.map(
                (genre) =>
                  genre.name === currentGenre.name && (
                    <div
                      className="card w-1/3 bg-base-100  shadow-xl z-0 hover:z-50 lg:w-96 lg:image-full"
                      key={game.slug}
                    >
                      <figure className="lg:h-72 rounded-xl">
                        <button
                          className="btn coeur absolute top-0 left-0 w-1/2 lg:hidden bg-black"
                          onClick={() => handleClickUpdate(game.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            fill={
                              findBySlug(userFavorite, game.slug)
                                ? '#b91c1c'
                                : 'none'
                            }
                            viewBox="0 0 24 24"
                            stroke="#b91c1c "
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                        <Link
                          className="lg:hidden block"
                          to={`/jeux/${game.slug}`}
                        >
                          <img
                            src={`${import.meta.env.VITE_API_COVERS}/${
                              game.cover
                            }`}
                            alt={game.name}
                          />
                        </Link>
                        <img
                          className="lg:block hidden"
                          src={`${import.meta.env.VITE_API_COVERS}/${
                            game.cover
                          }`}
                          alt={game.name}
                        />
                      </figure>
                      <div className="lg:card-body hidden">
                        <h2 className="card-title text-white">{game.name}</h2>
                        <p className="text-transparent hover:text-white text-sm ">
                          {game.description}
                        </p>
                        <div className="card-actions justify-end justify-between">
                          <button
                            className="btn coeur"
                            onClick={() => handleClickUpdate(game.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-10 w-10"
                              fill={
                                findBySlug(userFavorite, game.slug)
                                  ? '#b91c1c'
                                  : 'none'
                              }
                              viewBox="0 0 24 24"
                              stroke="#b91c1c "
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          </button>
                          <Link to={`/jeux/${game.slug}`}>
                            <button className="btn btn-primary">
                              Voir le jeu
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
      )}
    </>
  );
}
