import React from 'react';
import { addToFavorite, removeFromFavorites } from '../../store/reducer/users';
import { findBySlug } from '../../hooks/findData';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

interface IMap {
  src : string,
  alt : string,
  name: string,
  description : string,
  slug : string,
  userFavorite : any,
  link : string,
  id : number,
  game : any ,
}

export default function Card({
  src,
  alt,
  name,
  description,
  slug,
  userFavorite,
  link,
  id,
  game,
}: IMap) {
  const dispatch = useAppDispatch();

  const videoGames = useAppSelector((state)=>state.videoGames.list)


  const updateFavorite = () => {
    axios.post(
      `${import.meta.env.VITE_API_URL}/users/add_favorite/${id}`,
      null,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  };

  const handleClickAdd = () => {
    updateFavorite();
    dispatch(addToFavorite(game));
  };

  const handleClickRemove = () => {
    updateFavorite();
    dispatch(removeFromFavorites(game))
  }



  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full z-0 hover:z-50">
      <figure className="h-72 ">
        <img src={src} alt={alt} />
      </figure>
      <div className="card-body ">
        <h2 className="card-title text-white">{name}</h2>
        <p className="text-transparent hover:text-white text-sm ">
          {description}
        </p>

        <div className="card-actions justify-end justify-between">
          <button className="btn coeur" onClick={!findBySlug(userFavorite, slug) ? handleClickAdd : handleClickRemove}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill={findBySlug(userFavorite, slug) ? '#b91c1c' : 'none'}
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

          <Link to={`/jeux/${link}`}>
            <button className="btn btn-primary">Voir le jeu</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
