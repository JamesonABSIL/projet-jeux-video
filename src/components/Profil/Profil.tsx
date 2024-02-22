import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/reducer/users';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FavoriteCard from './FavoriteCard'
import { deleteGame, joinAGame } from '../../store/reducer/games';
import { findByPseudo } from '../../hooks/findData';

export default function Profil() {
  const dispatch = useAppDispatch();

  const isLogged = useAppSelector((state) => state.users.logged);
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const games=useAppSelector((state) => state.games.list)

  const deleteUser = (id : number) => {
    dispatch(deleteGame(id))
  }
  const handleClick= (id : number) => {
    dispatch(joinAGame(id))
  }
  // Fonction qui transforme une dateString en visuel FR présentable
  const formatedDate = (time: string) =>
    new Date(time).toLocaleString('fr-FR', {
      minute: 'numeric',
      hour: 'numeric',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  return (
    <>
      {isLogged && (
        <button
          className="btn btn-success"
          onClick={(e) => {
            e.preventDefault();
            dispatch(logout());
          }}
        >
          Deconnexion
        </button>
      )}
      <h1>Profil de {currentUser.pseudo} </h1>
      {/* <p>Votre profil est {currentUser.is_active ? "actif" : "inactif"}</p> */}
      {currentUser.is_active ? (
        <div>
          <div>
            <h2>Mes jeux favoris :</h2>
            <div className="flex flex-wrap gap-5 justify-center">
              {currentUser.favorites.map((favorites) => (
                <FavoriteCard slug={favorites.slug} src={`${import.meta.env.VITE_API_COVERS}/${favorites.cover}`} alt={favorites.name} id={favorites.id} favorites={favorites} key={favorites.slug} />                
              ))}
            </div>
          </div>

          <div>
            <h2>Mes parties crées :</h2>
            <div className="flex flex-wrap gap-5 justify-center">
              {games.map((games) => (
                (games.organizer.pseudo===currentUser.pseudo && 
                <div
                  className="card w-96 bg-base-100 shadow-xl image-full"
                  key={games.id}
                >
                  <figure className="h-72">
                    <img
                      src={`${import.meta.env.VITE_API_COVERS}/${games.videoGame.cover}`}
                      alt={games.videoGame.name}
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-white">
                      {games.videoGame.name}
                    </h3>
                    <p className="text-white">{formatedDate(games.beginAt)} </p>

                    <div className="card-actions justify-end justify-between">
                      <button
                        className="btn delete btn-circle btn-outline"
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
                        <button className="btn btn-primary">
                          Plus d'infos
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>)
              ))}
            </div>
          </div>

          <div>
            <h2>Je participe à :</h2>
            <div className="flex flex-wrap gap-5 justify-center">
              {games.map((games) => (
                (games.participants.map((e) => e.pseudo===currentUser.pseudo && 
                <div
                  className="card w-96 bg-base-100 shadow-xl image-full"
                  key={games.id}
                >
                  <figure className="h-72">
                    <img
                      src={`${import.meta.env.VITE_API_COVERS}/${games.videoGame.cover}`}
                      alt={games.videoGame.name}
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-white">
                      {games.videoGame.name}
                    </h3>
                    <p className="text-white">{formatedDate(games.beginAt)} </p>
                    
                      <div className="card-actions justify-end justify-between">
                      <button
                        className="btn delete btn-circle btn-outline"
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
                        <button className="btn btn-primary">
                          Plus d'infos
                        </button></Link>
                      </div>
                  </div>
                </div>
              ))))}
            </div>
          </div>
        </div>
      ) : (
        'Votre profil est inactif'
      )}
    </>
  );
}
