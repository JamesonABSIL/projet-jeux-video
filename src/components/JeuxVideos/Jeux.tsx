import React, {useEffect, useState} from 'react'
import { useAppSelector } from '../../hooks/redux'
import axios from 'axios';
import Card from './Card';
import { Ivideo_game } from '../../@types/types';

export default function Jeux() {

  const videoGames = useAppSelector((state)=>state.videoGames.list)
  const userFavorite = useAppSelector((state) => state.users.currentUser.favorites)

  return (
    <>
    <h1 className='mb-2 text-4xl lg:text-9xl'>Jeux</h1>
    <div className='flex flex-wrap gap-5 justify-center'>
      {videoGames.map((game)=> 
      <Card key={game.slug} src={`${import.meta.env.VITE_API_COVERS}/${game.cover}`} alt={game.name} name={game.name} description={game.description} slug={game.slug} userFavorite={userFavorite} link={game.slug} id={game.id} game={game}/>
      )}
</div>
        </>
  )
      }
