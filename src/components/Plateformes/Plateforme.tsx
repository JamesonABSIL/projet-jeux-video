import React from 'react'
import { useParams } from 'react-router-dom'
import {  useAppSelector } from '../../hooks/redux';
import { findBySlug } from '../../hooks/findData';
import { Ivideo_game } from '../../@types/types';
import { Link } from 'react-router-dom';

export default function Plateforme() {
  const { slug } = useParams();
  
  const plateforme = useAppSelector((state) => findBySlug(state.platforms.list, slug))
  const userFavorite = useAppSelector((state) => state.users.currentUser.favorites)

  return (
    <>
    {!plateforme ? <div className="flex justify-center"><img src='https://i.gifer.com/5IPd.gif' /></div> : <div> <h1>{plateforme.name}</h1>
    
    <div className='flex flex-wrap gap-5 justify-center'>
      {plateforme.videoGames.map((game : Ivideo_game)=> 
      <div className="card w-96 bg-base-100 shadow-xl image-full z-0 hover:z-50" key={game.slug}>
  <figure className='h-72 '><img src={`${import.meta.env.VITE_API_COVERS}/${game.cover}`} alt={game.name} /></figure>
  <div className="card-body ">
    <h2 className="card-title text-white">{game.name}</h2>
    <p className='text-transparent hover:text-white text-sm '>{game.description}</p>
    <div className="card-actions justify-end justify-between">
    <button className="btn coeur" onClick={() => userFavorite.push(game)}>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill={findBySlug(userFavorite, game.slug) ?"#b91c1c" : "none"} viewBox="0 0 24 24" stroke="#b91c1c "><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>  
  </button>
    <Link to={`/jeux/${game.slug}`}>
      <button className="btn btn-primary">Voir le jeu</button>
    </Link>
    </div>
  </div>
</div>)}
    </div>
</div>}
   
        </>
  )
}
