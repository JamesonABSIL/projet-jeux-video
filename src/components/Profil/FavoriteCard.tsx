import React, {useEffect} from 'react';
import axios from 'axios';
import { useAppDispatch } from '../../hooks/redux';
import { Link } from 'react-router-dom';
import { addToFavorite, removeFromFavorites } from '../../store/reducer/users';

interface IMap {
  src : string,
  alt : string,  
  id : number,
  slug : string,  
  favorites: {},
}

export default function FavoriteCard( {src, alt, id, slug, favorites} : IMap ){
  const dispatch = useAppDispatch();

  const updateFavorite = async () => {
   const {data} = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/add_favorite/${id}`,
      null,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    return data
  };
  
  const handleClick = () => {    
    updateFavorite()
    dispatch(removeFromFavorites(favorites))
  };
 
  
  return (
    <div
    className="card w-96 bg-base-100 shadow-xl image-full "
  >
    <figure className="h-72 ">
      <img src={src} alt={alt} />
    </figure>
    <div className="card-body">
      <h3 className="card-title text-white">{alt}</h3>
      <p></p>
        <div className="card-actions justify-end justify-between">
        <button
          className="btn delete btn-circle btn-outline"
          onClick={handleClick}
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
      <Link to={`/jeux/${slug}`}>
          <button className="btn btn-primary">
            Plus d'infos
          </button>
      </Link>
        </div>
    </div>
  </div>
  )
}
