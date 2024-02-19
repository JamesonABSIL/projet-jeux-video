import React, { useEffect } from 'react'
import {  useAppSelector } from '../../hooks/redux'
import { Link } from 'react-router-dom'

export default function Genres({}) {

  
  const genres = useAppSelector((state)=>state.genres.list)

  return (
    <>
    <h1>Genres</h1>
    <div className='flex flex-wrap gap-5 justify-center'>
      {genres.map((genre)=> 
      <div className="card w-96 bg-base-100 shadow-xl image-full z-0" key={genre.slug}>
  <figure className='h-72'><img  src={`${import.meta.env.VITE_API_COVERS}/${genre.image}`} alt={genre.name} /></figure>
  <div className="card-body">
    <h2 className="card-title text-white text-2xl">{genre.name}</h2>
    <p className='text-white text-lg'>{genre.description}</p>
    <Link to={`/genres/${genre.slug}`}>
    <div className="card-actions justify-end ">
      <button className="btn btn-primary ">Voir les jeux</button>
    </div>
    </Link>
  </div>
</div>)}
    
</div>
        </>
  )
}
