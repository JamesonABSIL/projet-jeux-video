import React, { useEffect } from 'react'
import {  useAppSelector } from '../../hooks/redux'
import { Link } from 'react-router-dom'

export default function Genres({}) {

  /*On s'abonne aux données contenus dans le state qui contient la liste des genre*/
  const genres = useAppSelector((state)=>state.genres.list)

  return (
    <>
    <h1 className='mb-2 text-5xl lg:text-9xl'>Genres</h1>
    <div className='flex flex-wrap gap-5 justify-evenly	'>
      {/* La fonction map nous renvoie un tableau de même taille que le tableau genres, on utilise les données de ce tableau pour afficher les données souhaitées */}
      {genres.map((genre)=> 
      <div className="p-1 card w-2/5 bg-gray-700 z-0 rounded-3xl flex justify-center items-center lg:w-96" key={genre.slug}>
  <figure className='"lg:h-80"'>
  <Link to={`/genres/${genre.slug}`}>
    <img className="rounded-3xl" src={`${import.meta.env.VITE_API_COVERS}/${genre.image}`} alt={genre.name} />
    </Link>
    </figure>
  <div className="lg:block lg:p-5">
    <h2 className="text-white text-sm text-center lg:text-2xl lg:font-bold uppercase">{genre.name}</h2>
    <p className='text-white text-lg hidden lg:block'>{genre.description}</p>
  </div>
</div>)}  
</div>
        </>
  )
}
