import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Link, useParams } from 'react-router-dom';
import { findById } from '../../hooks/findData';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import Loading from '../App/Loading/Loading';
import { addPlayer } from '../../store/reducer/games';

export default function Partie() {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });

  const { id } = useParams();

const [partie, setPartie] = useState(useAppSelector((state) => findById(state.games.list, id)));

  const formatedDate = (time: string) =>
    new Date(time).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

  const parties = useAppSelector((state) => findById(state.games.list, id));

  const joinAGame = async () => {
    const res = await  axios.post(`${import.meta.env.VITE_API_URL}/users/join_game/${id}`, null, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  };

  
  const handleClick = () => {
    joinAGame();
    
  };

  return (
    <>
      {!partie ? (
        <div className="flex justify-center">
          <img src="https://i.gifer.com/5IPd.gif" />
        </div>
      ) : (
        <div>
          <h1>
            Partie n°{parties.id} de {parties.organizer.pseudo}
          </h1>
          <div className="card lg:card-side bg-base-100 shadow-xl">
            <div>
              <figure className={isDesktopOrLaptop ? 'h-1/2 w-1/2' : 'h-1/2 '}>
                <img
                  className="object-scale-down  h-full"
                  src={`${import.meta.env.VITE_API_COVERS}/${
                    parties.videoGame.cover
                  }`}
                  alt={parties.videoGame.name}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {parties.videoGame.name} sur {parties.platform.name}
                </h2>
                <p>Début de la partie le {formatedDate(parties.beginAt)}</p>
                <p>
                  {parties.participants.length}/{parties.maxParticipants}{' '}
                  Joueurs
                </p>
                {partie.participants.length >= parties.maxParticipants ? (
                  <div className="card-actions justify-end">
                    <p>Le nombre maximum de participants à été atteint</p>
                    <Link to="/parties">
                    <button className="btn btn-primary">
                      Revenir à la page des parties
                    </button>
                    </Link>
                  </div>
                ) : (
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={handleClick}>
                      Rejoindre
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
      )}
    </>
  );
}
